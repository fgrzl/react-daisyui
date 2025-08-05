import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Radio, RadioGroup } from '@/components/radio'

describe('Radio', () => {
  it('renders correctly', () => {
    render(
      <RadioGroup>
        <Radio value="option1">Option 1</Radio>
        <Radio value="option2">Option 2</Radio>
      </RadioGroup>
    )
    expect(screen.getByText('Option 1')).toBeInTheDocument()
    expect(screen.getByText('Option 2')).toBeInTheDocument()
  })

  it('applies correct variant classes', () => {
    render(
      <RadioGroup>
        <Radio value="test" variant="primary">
          Primary Radio
        </Radio>
      </RadioGroup>
    )
    const radio = screen.getByRole('radio')
    expect(radio).toHaveClass('radio-primary')
  })

  it('applies correct size classes', () => {
    render(
      <RadioGroup>
        <Radio value="test" size="lg">
          Large Radio
        </Radio>
      </RadioGroup>
    )
    const radio = screen.getByRole('radio')
    expect(radio).toHaveClass('radio-lg')
  })

  it('handles selection correctly', async () => {
    const user = userEvent.setup()
    render(
      <RadioGroup>
        <Radio value="option1">Option 1</Radio>
        <Radio value="option2">Option 2</Radio>
      </RadioGroup>
    )

    const radio1 = screen.getByRole('radio', { name: 'Option 1' })
    const radio2 = screen.getByRole('radio', { name: 'Option 2' })

    expect(radio1).not.toBeChecked()
    expect(radio2).not.toBeChecked()

    await act(async () => {
      await user.click(radio1)
    })

    expect(radio1).toBeChecked()
    expect(radio2).not.toBeChecked()

    await act(async () => {
      await user.click(radio2)
    })

    expect(radio1).not.toBeChecked()
    expect(radio2).toBeChecked()
  })

  it('handles disabled state', () => {
    render(
      <RadioGroup>
        <Radio value="test" disabled>
          Disabled Radio
        </Radio>
      </RadioGroup>
    )
    const radio = screen.getByRole('radio', { name: 'Disabled Radio' })
    expect(radio).toBeDisabled()
  })

  it('applies custom className', () => {
    render(
      <RadioGroup>
        <Radio value="test" className="custom-class">
          Custom Radio
        </Radio>
      </RadioGroup>
    )
    const radio = screen.getByRole('radio')
    expect(radio).toHaveClass('custom-class')
  })

  it('supports all DaisyUI variant colors', () => {
    const variants = ['primary', 'secondary', 'accent', 'success', 'warning', 'info', 'error'] as const

    variants.forEach(variant => {
      const { unmount } = render(
        <RadioGroup>
          <Radio value="test" variant={variant}>
            {variant} Radio
          </Radio>
        </RadioGroup>
      )
      const radio = screen.getByRole('radio')
      expect(radio).toHaveClass(`radio-${variant}`)
      unmount()
    })
  })

  it('supports all sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg'] as const

    sizes.forEach(size => {
      const { unmount } = render(
        <RadioGroup>
          <Radio value="test" size={size}>
            {size} Radio
          </Radio>
        </RadioGroup>
      )
      const radio = screen.getByRole('radio')

      if (size === 'md') {
        // Medium is default with no additional class
        expect(radio).toHaveClass('radio')
      } else {
        expect(radio).toHaveClass(`radio-${size}`)
      }
      unmount()
    })
  })

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup()
    render(
      <RadioGroup>
        <Radio value="option1">Option 1</Radio>
        <Radio value="option2">Option 2</Radio>
        <Radio value="option3">Option 3</Radio>
      </RadioGroup>
    )

    const radio1 = screen.getByRole('radio', { name: 'Option 1' })
    const radio2 = screen.getByRole('radio', { name: 'Option 2' })
    const radio3 = screen.getByRole('radio', { name: 'Option 3' })

    // Focus the first radio
    radio1.focus()
    expect(radio1).toHaveFocus()

    // Use arrow keys to navigate
    await act(async () => {
      await user.keyboard('{ArrowDown}')
    })
    expect(radio2).toHaveFocus()

    await act(async () => {
      await user.keyboard('{ArrowDown}')
    })
    expect(radio3).toHaveFocus()

    await act(async () => {
      await user.keyboard('{ArrowUp}')
    })
    expect(radio2).toHaveFocus()
  })

  it('prevents interaction when disabled', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()

    render(
      <RadioGroup onChange={handleChange}>
        <Radio value="test" disabled>
          Disabled Radio
        </Radio>
      </RadioGroup>
    )

    await act(async () => {
      await user.click(screen.getByRole('radio', { name: 'Disabled Radio' }))
    })

    expect(handleChange).not.toHaveBeenCalled()
  })
})

describe('RadioGroup', () => {
  it('renders with label', () => {
    render(
      <RadioGroup label="Choose an option">
        <Radio value="option1">Option 1</Radio>
        <Radio value="option2">Option 2</Radio>
      </RadioGroup>
    )
    expect(screen.getByText('Choose an option')).toBeInTheDocument()
  })

  it('renders with description', () => {
    render(
      <RadioGroup description="Select one of the following options">
        <Radio value="option1">Option 1</Radio>
        <Radio value="option2">Option 2</Radio>
      </RadioGroup>
    )
    expect(screen.getByText('Select one of the following options')).toBeInTheDocument()
  })

  it('renders with error message', () => {
    render(
      <RadioGroup errorMessage="Please select an option">
        <Radio value="option1">Option 1</Radio>
        <Radio value="option2">Option 2</Radio>
      </RadioGroup>
    )
    expect(screen.getByText('Please select an option')).toBeInTheDocument()
  })

  it('shows required indicator', () => {
    render(
      <RadioGroup label="Required Field" isRequired>
        <Radio value="option1">Option 1</Radio>
      </RadioGroup>
    )
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('supports horizontal orientation', () => {
    render(
      <RadioGroup orientation="horizontal">
        <Radio value="option1">Option 1</Radio>
        <Radio value="option2">Option 2</Radio>
      </RadioGroup>
    )
    const radioGroup = screen.getByRole('radiogroup')
    expect(radioGroup).toHaveClass('flex-row')
  })

  it('disables all radios when group is disabled', () => {
    render(
      <RadioGroup isDisabled>
        <Radio value="option1">Option 1</Radio>
        <Radio value="option2">Option 2</Radio>
      </RadioGroup>
    )
    const radios = screen.getAllByRole('radio')
    radios.forEach(radio => {
      expect(radio).toBeDisabled()
    })
  })

  it('handles value changes', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()

    render(
      <RadioGroup onChange={handleChange}>
        <Radio value="option1">Option 1</Radio>
        <Radio value="option2">Option 2</Radio>
      </RadioGroup>
    )

    await act(async () => {
      await user.click(screen.getByRole('radio', { name: 'Option 1' }))
    })

    expect(handleChange).toHaveBeenCalledWith('option1')

    await act(async () => {
      await user.click(screen.getByRole('radio', { name: 'Option 2' }))
    })

    expect(handleChange).toHaveBeenCalledWith('option2')
  })

  it('applies custom className', () => {
    render(
      <RadioGroup className="custom-group-class">
        <Radio value="option1">Option 1</Radio>
      </RadioGroup>
    )
    const radioGroup = screen.getByRole('radiogroup')
    expect(radioGroup).toHaveClass('custom-group-class')
  })

  it('maintains single selection behavior', async () => {
    const user = userEvent.setup()
    render(
      <RadioGroup>
        <Radio value="option1">Option 1</Radio>
        <Radio value="option2">Option 2</Radio>
        <Radio value="option3">Option 3</Radio>
      </RadioGroup>
    )

    const radio1 = screen.getByRole('radio', { name: 'Option 1' })
    const radio2 = screen.getByRole('radio', { name: 'Option 2' })
    const radio3 = screen.getByRole('radio', { name: 'Option 3' })

    // Select first radio
    await act(async () => {
      await user.click(radio1)
    })
    expect(radio1).toBeChecked()
    expect(radio2).not.toBeChecked()
    expect(radio3).not.toBeChecked()

    // Select second radio (should deselect first)
    await act(async () => {
      await user.click(radio2)
    })
    expect(radio1).not.toBeChecked()
    expect(radio2).toBeChecked()
    expect(radio3).not.toBeChecked()

    // Select third radio (should deselect second)
    await act(async () => {
      await user.click(radio3)
    })
    expect(radio1).not.toBeChecked()
    expect(radio2).not.toBeChecked()
    expect(radio3).toBeChecked()
  })
})