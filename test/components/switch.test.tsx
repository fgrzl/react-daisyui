import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { Switch } from '@/components/switch'

describe('Switch', () => {
  it('renders correctly', () => {
    render(<Switch>Enable notifications</Switch>)
    expect(screen.getByRole('switch', { name: 'Enable notifications' })).toBeInTheDocument()
    // Check that the label wrapper exists with the text
    expect(screen.getByLabelText('Enable notifications')).toBeInTheDocument()
  })

  it('renders with default props', () => {
    const { container } = render(<Switch>Default Switch</Switch>)
    const labelElement = container.querySelector('label')
    expect(labelElement).toHaveClass('toggle')
    expect(labelElement).not.toHaveClass('toggle-xs', 'toggle-sm', 'toggle-lg')
  })

  it('applies correct variant classes', () => {
    const { container } = render(<Switch variant="primary">Primary Switch</Switch>)
    const labelElement = container.querySelector('label')
    expect(labelElement).toHaveClass('toggle-primary')
  })

  it('applies correct size classes', () => {
    const { container } = render(<Switch size="lg">Large Switch</Switch>)
    const labelElement = container.querySelector('label')
    expect(labelElement).toHaveClass('toggle-lg')
  })

  it('applies all variant classes correctly', () => {
    const variants = ['primary', 'secondary', 'accent', 'neutral', 'info', 'success', 'warning', 'error'] as const
    
    variants.forEach((variant) => {
      const { container, unmount } = render(<Switch variant={variant}>{variant} switch</Switch>)
      const labelElement = container.querySelector('label')
      expect(labelElement).toHaveClass(`toggle-${variant}`)
      unmount()
    })
  })

  it('applies all size classes correctly', () => {
    const sizes = [
      { size: 'xs' as const, class: 'toggle-xs' },
      { size: 'sm' as const, class: 'toggle-sm' },
      { size: 'md' as const, class: '' }, // md is default, no class
      { size: 'lg' as const, class: 'toggle-lg' },
    ]
    
    sizes.forEach(({ size, class: expectedClass }) => {
      const { container, unmount } = render(<Switch size={size}>{size} switch</Switch>)
      const labelElement = container.querySelector('label')
      if (expectedClass) {
        expect(labelElement).toHaveClass(expectedClass)
      } else {
        expect(labelElement).not.toHaveClass('toggle-xs', 'toggle-sm', 'toggle-lg')
      }
      unmount()
    })
  })

  it('applies custom className', () => {
    const { container } = render(<Switch className="custom-class">Custom Switch</Switch>)
    const labelElement = container.querySelector('label')
    expect(labelElement).toHaveClass('custom-class', 'toggle')
  })

  it('handles state changes', async () => {
    const handleChange = vi.fn()
    render(<Switch onChange={handleChange}>Toggle me</Switch>)

    const user = userEvent.setup()
    const switchElement = screen.getByRole('switch', { name: 'Toggle me' })
    
    await act(async () => {
      await user.click(switchElement)
    })

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it('supports controlled state', () => {
    const { rerender } = render(<Switch isSelected={false}>Controlled Switch</Switch>)
    let switchElement = screen.getByRole('switch', { name: 'Controlled Switch' })
    expect(switchElement).not.toBeChecked()

    rerender(<Switch isSelected={true}>Controlled Switch</Switch>)
    switchElement = screen.getByRole('switch', { name: 'Controlled Switch' })
    expect(switchElement).toBeChecked()
  })

  it('supports uncontrolled state changes', async () => {
    render(<Switch defaultSelected={false}>Uncontrolled Switch</Switch>)
    const user = userEvent.setup()
    const switchElement = screen.getByRole('switch', { name: 'Uncontrolled Switch' })
    
    expect(switchElement).not.toBeChecked()

    await act(async () => {
      await user.click(switchElement)
    })

    expect(switchElement).toBeChecked()
  })

  it('handles disabled state', () => {
    render(<Switch isDisabled>Disabled Switch</Switch>)
    const switchElement = screen.getByRole('switch', { name: 'Disabled Switch' })
    expect(switchElement).toBeDisabled()
  })

  it('does not trigger onChange when disabled', async () => {
    const handleChange = vi.fn()
    render(<Switch isDisabled onChange={handleChange}>Disabled Switch</Switch>)
    
    const user = userEvent.setup()
    const switchElement = screen.getByRole('switch', { name: 'Disabled Switch' })
    
    await act(async () => {
      await user.click(switchElement)
    })

    expect(handleChange).not.toHaveBeenCalled()
  })

  it('handles keyboard interaction', async () => {
    const handleChange = vi.fn()
    render(<Switch onChange={handleChange}>Keyboard Switch</Switch>)

    const user = userEvent.setup()
    const switchElement = screen.getByRole('switch', { name: 'Keyboard Switch' })
    
    switchElement.focus()
    expect(switchElement).toHaveFocus()

    await act(async () => {
      await user.keyboard(' ')
    })

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it('handles Enter key interaction', async () => {
    const handleChange = vi.fn()
    render(<Switch onChange={handleChange}>Enter Switch</Switch>)

    const user = userEvent.setup()
    const switchElement = screen.getByRole('switch', { name: 'Enter Switch' })
    
    switchElement.focus()

    await act(async () => {
      await user.keyboard('{Enter}')
    })

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(true)
  })

  it('has proper focus management', async () => {
    render(<Switch>Focus Switch</Switch>)
    const user = userEvent.setup()
    const switchElement = screen.getByRole('switch', { name: 'Focus Switch' })
    
    await act(async () => {
      await user.tab()
    })
    
    expect(switchElement).toHaveFocus()
  })

  it('supports aria-label', () => {
    render(<Switch aria-label="Custom switch label" />)
    const switchElement = screen.getByRole('switch', { name: 'Custom switch label' })
    expect(switchElement).toHaveAttribute('aria-label', 'Custom switch label')
  })

  it('supports aria-describedby', () => {
    render(
      <div>
        <Switch aria-describedby="switch-description">Described Switch</Switch>
        <div id="switch-description">This switch controls notifications</div>
      </div>
    )
    const switchElement = screen.getByRole('switch', { name: 'Described Switch' })
    expect(switchElement).toHaveAttribute('aria-describedby', 'switch-description')
  })

  it('renders without children', () => {
    render(<Switch aria-label="No children switch" />)
    const switchElement = screen.getByRole('switch', { name: 'No children switch' })
    expect(switchElement).toBeInTheDocument()
  })

  it('has correct base classes', () => {
    const { container } = render(<Switch>Base Switch</Switch>)
    const labelElement = container.querySelector('label')
    expect(labelElement).toHaveClass('toggle')
  })

  it('combines variant and size classes', () => {
    const { container } = render(<Switch variant="success" size="lg">Large Success Switch</Switch>)
    const labelElement = container.querySelector('label')
    expect(labelElement).toHaveClass('toggle', 'toggle-success', 'toggle-lg')
  })

  it('has medium size as default', () => {
    const { container } = render(<Switch>Default Size Switch</Switch>)
    const labelElement = container.querySelector('label')
    expect(labelElement).toHaveClass('toggle')
    expect(labelElement).not.toHaveClass('toggle-xs', 'toggle-sm', 'toggle-lg')
  })
})