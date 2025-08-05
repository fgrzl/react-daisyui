import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox } from '@/components/checkbox'

describe('Checkbox', () => {
  it('renders correctly', () => {
    render(<Checkbox>Accept terms</Checkbox>)
    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).toBeInTheDocument()
  })

  it('applies correct variant classes', () => {
    const { container } = render(<Checkbox variant="primary">Primary Checkbox</Checkbox>)
    const label = container.querySelector('label')
    expect(label).toHaveClass('checkbox-primary')
  })

  it('applies correct size classes', () => {
    const { container } = render(<Checkbox size="lg">Large Checkbox</Checkbox>)
    const label = container.querySelector('label')
    expect(label).toHaveClass('checkbox-lg')
  })

  it('renders without a label', () => {
    render(<Checkbox aria-label="Unlabeled checkbox" />)
    expect(screen.getByRole('checkbox', { name: 'Unlabeled checkbox' })).toBeInTheDocument()
  })

  it('handles controlled state', () => {
    const { rerender } = render(<Checkbox isSelected={false}>Controlled</Checkbox>)
    const checkbox = screen.getByRole('checkbox', { name: 'Controlled' })
    expect(checkbox).not.toBeChecked()

    rerender(<Checkbox isSelected={true}>Controlled</Checkbox>)
    expect(checkbox).toBeChecked()
  })

  it('handles change events', async () => {
    const handleChange = vi.fn()
    render(<Checkbox onChange={handleChange}>Clickable</Checkbox>)

    const user = userEvent.setup()
    const checkbox = screen.getByRole('checkbox', { name: 'Clickable' })
    
    await act(async () => {
      await user.click(checkbox)
    })

    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it('applies custom className', () => {
    const { container } = render(<Checkbox className="custom-class">Custom Checkbox</Checkbox>)
    const label = container.querySelector('label')
    expect(label).toHaveClass('custom-class')
  })

  it('supports disabled state', () => {
    render(<Checkbox isDisabled>Disabled Checkbox</Checkbox>)
    const checkbox = screen.getByRole('checkbox', { name: 'Disabled Checkbox' })
    expect(checkbox).toBeDisabled()
  })

  it('supports indeterminate state', () => {
    render(<Checkbox isIndeterminate>Indeterminate Checkbox</Checkbox>)
    const checkbox = screen.getByRole('checkbox', { name: 'Indeterminate Checkbox' })
    expect(checkbox).toHaveProperty('indeterminate', true)
  })

  it('supports all DaisyUI variant colors', () => {
    const variants = [
      'primary',
      'secondary',
      'accent',
      'neutral',
      'info',
      'success',
      'warning',
      'error',
    ] as const

    variants.forEach(variant => {
      const { container, unmount } = render(<Checkbox variant={variant}>{variant} Checkbox</Checkbox>)
      const label = container.querySelector('label')
      expect(label).toHaveClass(`checkbox-${variant}`)
      unmount()
    })
  })

  it('supports all sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg'] as const

    sizes.forEach(size => {
      const { container, unmount } = render(<Checkbox size={size}>{size} Checkbox</Checkbox>)
      const label = container.querySelector('label')

      if (size === 'md') {
        // Medium is default with no additional class
        expect(label).toHaveClass('checkbox')
        expect(label).not.toHaveClass('checkbox-md')
      } else {
        expect(label).toHaveClass(`checkbox-${size}`)
      }
      unmount()
    })
  })

  it('handles keyboard interaction', async () => {
    const handleChange = vi.fn()
    render(<Checkbox onChange={handleChange}>Keyboard Checkbox</Checkbox>)

    const checkbox = screen.getByRole('checkbox', { name: 'Keyboard Checkbox' })
    checkbox.focus()

    const user = userEvent.setup()
    await act(async () => {
      await user.keyboard(' ')
    })

    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it('prevents interaction when disabled', async () => {
    const handleChange = vi.fn()
    render(
      <Checkbox isDisabled onChange={handleChange}>
        Disabled Checkbox
      </Checkbox>
    )

    const user = userEvent.setup()
    const checkbox = screen.getByRole('checkbox', { name: 'Disabled Checkbox' })
    
    await act(async () => {
      await user.click(checkbox)
    })

    expect(handleChange).not.toHaveBeenCalled()
  })

  it('maintains accessibility attributes', () => {
    render(
      <Checkbox 
        aria-describedby="help-text"
        aria-labelledby="label-id"
      >
        Accessible Checkbox
      </Checkbox>
    )
    
    const checkbox = screen.getByRole('checkbox', { name: 'Accessible Checkbox' })
    expect(checkbox).toHaveAttribute('aria-describedby', 'help-text')
    expect(checkbox).toHaveAttribute('aria-labelledby', 'label-id')
  })

  it('supports uncontrolled state changes', async () => {
    render(<Checkbox>Uncontrolled</Checkbox>)
    
    const user = userEvent.setup()
    const checkbox = screen.getByRole('checkbox', { name: 'Uncontrolled' })
    
    expect(checkbox).not.toBeChecked()
    
    await act(async () => {
      await user.click(checkbox)
    })
    
    expect(checkbox).toBeChecked()
    
    await act(async () => {
      await user.click(checkbox)
    })
    
    expect(checkbox).not.toBeChecked()
  })

  it('has proper focus management', async () => {
    render(<Checkbox>Focusable</Checkbox>)
    
    const checkbox = screen.getByRole('checkbox', { name: 'Focusable' })
    checkbox.focus()
    
    expect(checkbox).toHaveFocus()
  })

  it('works with form elements', () => {
    render(
      <form>
        <Checkbox name="agreement" value="accepted">
          I agree to the terms
        </Checkbox>
      </form>
    )
    
    const checkbox = screen.getByRole('checkbox', { name: 'I agree to the terms' })
    expect(checkbox).toHaveAttribute('name', 'agreement')
    expect(checkbox).toHaveAttribute('value', 'accepted')
  })
})