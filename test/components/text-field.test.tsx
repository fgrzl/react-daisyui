import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TextField from '@/components/text-field'

describe('TextField', () => {
  it('renders correctly', () => {
    render(<TextField label="Email" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders without label', () => {
    render(<TextField placeholder="Enter text" />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('applies correct variant classes', () => {
    render(<TextField label="Email" variant="primary" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('input-primary')
  })

  it('applies correct size classes', () => {
    render(<TextField label="Email" size="lg" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('input-lg')
  })

  it('applies bordered style by default', () => {
    render(<TextField label="Email" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('input-bordered')
  })

  it('applies ghost style when specified', () => {
    render(<TextField label="Email" ghost />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('input-ghost')
    expect(input).not.toHaveClass('input-bordered')
  })

  it('can disable bordered style', () => {
    render(<TextField label="Email" bordered={false} />)
    const input = screen.getByRole('textbox')
    expect(input).not.toHaveClass('input-bordered')
  })

  it('displays description text', () => {
    render(<TextField label="Email" description="Enter your email address" />)
    expect(screen.getByText('Enter your email address')).toBeInTheDocument()
  })

  it('displays error message', () => {
    render(<TextField label="Email" errorMessage="Invalid email format" />)
    expect(screen.getByText('Invalid email format')).toBeInTheDocument()
  })

  it('applies error styling when error message is present', () => {
    render(<TextField label="Email" errorMessage="Invalid email" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('applies error styling when isInvalid is true', () => {
    render(<TextField label="Email" isInvalid />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('handles user input', async () => {
    const user = userEvent.setup()
    render(<TextField label="Email" />)
    const input = screen.getByRole('textbox')

    await act(async () => {
      await user.type(input, 'test@example.com')
    })

    expect(input).toHaveValue('test@example.com')
  })

  it('handles onChange events', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    render(<TextField label="Email" onChange={handleChange} />)
    const input = screen.getByRole('textbox')

    await act(async () => {
      await user.type(input, 'a')
    })

    expect(handleChange).toHaveBeenCalled()
  })

  it('applies custom className to input', () => {
    render(<TextField label="Email" className="custom-input" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('custom-input')
  })

  it('applies custom wrapperClassName to wrapper', () => {
    render(<TextField label="Email" wrapperClassName="custom-wrapper" />)
    const wrapper = screen.getByRole('textbox').closest('.form-control')
    expect(wrapper).toHaveClass('custom-wrapper')
  })

  it('supports all DaisyUI variant colors', () => {
    const variants = [
      'primary',
      'secondary',
      'accent',
      'info',
      'success',
      'warning',
      'error',
    ] as const

    variants.forEach(variant => {
      const { unmount } = render(<TextField label={`${variant} input`} variant={variant} />)
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass(`input-${variant}`)
      unmount()
    })
  })

  it('supports all sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg'] as const

    sizes.forEach(size => {
      const { unmount } = render(<TextField label={`${size} input`} size={size} />)
      const input = screen.getByRole('textbox')

      if (size === 'md') {
        // Medium is default with no additional class
        expect(input).toHaveClass('input')
      } else {
        expect(input).toHaveClass(`input-${size}`)
      }
      unmount()
    })
  })

  it('handles disabled state', () => {
    render(<TextField label="Email" isDisabled />)
    const input = screen.getByRole('textbox')
    expect(input).toBeDisabled()
  })

  it('handles readonly state', () => {
    render(<TextField label="Email" isReadOnly />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('readonly')
  })

  it('handles required state', () => {
    render(<TextField label="Email" isRequired />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('required')
  })

  it('supports placeholder text', () => {
    render(<TextField label="Email" placeholder="Enter your email" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('placeholder', 'Enter your email')
  })

  it('supports different input types', () => {
    render(<TextField label="Password" type="password" />)
    const input = screen.getByLabelText('Password')
    expect(input).toHaveAttribute('type', 'password')
  })

  it('handles focus events', async () => {
    const handleFocus = vi.fn()
    const user = userEvent.setup()
    render(<TextField label="Email" onFocus={handleFocus} />)
    const input = screen.getByRole('textbox')

    await act(async () => {
      await user.click(input)
    })

    expect(handleFocus).toHaveBeenCalled()
  })

  it('handles blur events', async () => {
    const handleBlur = vi.fn()
    const user = userEvent.setup()
    render(<TextField label="Email" onBlur={handleBlur} />)
    const input = screen.getByRole('textbox')

    await act(async () => {
      await user.click(input)
      await user.tab()
    })

    expect(handleBlur).toHaveBeenCalled()
  })

  it('links label to input via htmlFor', () => {
    render(<TextField label="Email" />)
    const label = screen.getByText('Email')
    const input = screen.getByRole('textbox')

    expect(label.closest('label')).toHaveAttribute('for', input.id)
  })

  it('associates description with input via aria-describedby', () => {
    render(<TextField label="Email" description="Enter your email address" />)
    const input = screen.getByRole('textbox')
    const description = screen.getByText('Enter your email address')

    expect(input).toHaveAttribute('aria-describedby')
    expect(input.getAttribute('aria-describedby')).toContain(description.id)
  })

  it('associates error message with input via aria-describedby', () => {
    render(<TextField label="Email" errorMessage="Invalid email format" />)
    const input = screen.getByRole('textbox')
    const errorMessage = screen.getByText('Invalid email format')

    expect(input).toHaveAttribute('aria-describedby')
    expect(input.getAttribute('aria-describedby')).toContain(errorMessage.id)
  })

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup()
    render(<TextField label="Email" />)
    const input = screen.getByRole('textbox')

    await act(async () => {
      await user.tab()
    })

    expect(input).toHaveFocus()
  })

  it('combines multiple CSS classes correctly', () => {
    render(<TextField label="Email" variant="primary" size="lg" ghost className="custom-class" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('input', 'input-primary', 'input-lg', 'input-ghost', 'custom-class')
    expect(input).not.toHaveClass('input-bordered')
  })

  it('renders both description and error message', () => {
    render(
      <TextField
        label="Email"
        description="Enter your email address"
        errorMessage="Invalid email format"
      />
    )
    expect(screen.getByText('Enter your email address')).toBeInTheDocument()
    expect(screen.getByText('Invalid email format')).toBeInTheDocument()
  })
})
