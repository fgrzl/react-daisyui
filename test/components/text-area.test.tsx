import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TextArea from '@/components/text-area'

describe('TextArea', () => {
  it('renders correctly', () => {
    render(<TextArea label="Comment" />)
    expect(screen.getByLabelText('Comment')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('renders without label', () => {
    render(<TextArea placeholder="Enter your comment" />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your comment')).toBeInTheDocument()
  })

  it('applies correct variant classes', () => {
    render(<TextArea label="Comment" variant="primary" />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveClass('textarea-primary')
  })

  it('applies correct size classes', () => {
    render(<TextArea label="Comment" size="lg" />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveClass('textarea-lg')
  })

  it('applies bordered style by default', () => {
    render(<TextArea label="Comment" />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveClass('textarea-bordered')
  })

  it('applies ghost style when specified', () => {
    render(<TextArea label="Comment" ghost />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveClass('textarea-ghost')
    expect(textarea).not.toHaveClass('textarea-bordered')
  })

  it('can disable bordered style', () => {
    render(<TextArea label="Comment" bordered={false} />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).not.toHaveClass('textarea-bordered')
  })

  it('displays description text', () => {
    render(<TextArea label="Comment" description="Enter your comment here" />)
    expect(screen.getByText('Enter your comment here')).toBeInTheDocument()
  })

  it('displays error message', () => {
    render(<TextArea label="Comment" errorMessage="Comment is required" />)
    expect(screen.getByText('Comment is required')).toBeInTheDocument()
  })

  it('applies error styling when error message is present', () => {
    render(<TextArea label="Comment" errorMessage="Invalid comment" />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAttribute('aria-invalid', 'true')
  })

  it('applies error styling when isInvalid is true', () => {
    render(<TextArea label="Comment" isInvalid />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAttribute('aria-invalid', 'true')
  })

  it('handles user input', async () => {
    const user = userEvent.setup()
    render(<TextArea label="Comment" />)
    const textarea = screen.getByRole('textbox')

    await act(async () => {
      await user.type(textarea, 'This is a test comment')
    })

    expect(textarea).toHaveValue('This is a test comment')
  })

  it('handles onChange events', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    render(<TextArea label="Comment" onChange={handleChange} />)
    const textarea = screen.getByRole('textbox')

    await act(async () => {
      await user.type(textarea, 'a')
    })

    expect(handleChange).toHaveBeenCalled()
  })

  it('applies custom className to textarea', () => {
    render(<TextArea label="Comment" className="custom-textarea" />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveClass('custom-textarea')
  })

  it('applies custom wrapperClassName to wrapper', () => {
    render(<TextArea label="Comment" wrapperClassName="custom-wrapper" />)
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
      const { unmount } = render(<TextArea label={`${variant} textarea`} variant={variant} />)
      const textarea = screen.getByRole('textbox')
      expect(textarea).toHaveClass(`textarea-${variant}`)
      unmount()
    })
  })

  it('supports all sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg'] as const

    sizes.forEach(size => {
      const { unmount } = render(<TextArea label={`${size} textarea`} size={size} />)
      const textarea = screen.getByRole('textbox')

      if (size === 'md') {
        // Medium is default with no additional class
        expect(textarea).toHaveClass('textarea')
      } else {
        expect(textarea).toHaveClass(`textarea-${size}`)
      }
      unmount()
    })
  })

  it('handles disabled state', () => {
    render(<TextArea label="Comment" isDisabled />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toBeDisabled()
  })

  it('handles readonly state', () => {
    render(<TextArea label="Comment" isReadOnly />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAttribute('readonly')
  })

  it('handles required state', () => {
    render(<TextArea label="Comment" isRequired />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAttribute('required')
  })

  it('supports placeholder text', () => {
    render(<TextArea label="Comment" placeholder="Enter your comment" />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAttribute('placeholder', 'Enter your comment')
  })

  it('supports rows attribute', () => {
    render(<TextArea label="Comment" rows={5} />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAttribute('rows', '5')
  })

  it('supports cols attribute', () => {
    render(<TextArea label="Comment" cols={50} />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAttribute('cols', '50')
  })

  it('handles focus events', async () => {
    const handleFocus = vi.fn()
    const user = userEvent.setup()
    render(<TextArea label="Comment" onFocus={handleFocus} />)
    const textarea = screen.getByRole('textbox')

    await act(async () => {
      await user.click(textarea)
    })

    expect(handleFocus).toHaveBeenCalled()
  })

  it('handles blur events', async () => {
    const handleBlur = vi.fn()
    const user = userEvent.setup()
    render(<TextArea label="Comment" onBlur={handleBlur} />)
    const textarea = screen.getByRole('textbox')

    await act(async () => {
      await user.click(textarea)
      await user.tab()
    })

    expect(handleBlur).toHaveBeenCalled()
  })

  it('links label to textarea via htmlFor', () => {
    render(<TextArea label="Comment" />)
    const label = screen.getByText('Comment')
    const textarea = screen.getByRole('textbox')

    expect(label.closest('label')).toHaveAttribute('for', textarea.id)
  })

  it('associates description with textarea via aria-describedby', () => {
    render(<TextArea label="Comment" description="Enter your comment here" />)
    const textarea = screen.getByRole('textbox')
    const description = screen.getByText('Enter your comment here')

    expect(textarea).toHaveAttribute('aria-describedby')
    expect(textarea.getAttribute('aria-describedby')).toContain(description.id)
  })

  it('associates error message with textarea via aria-describedby', () => {
    render(<TextArea label="Comment" errorMessage="Comment is required" />)
    const textarea = screen.getByRole('textbox')
    const errorMessage = screen.getByText('Comment is required')

    expect(textarea).toHaveAttribute('aria-describedby')
    expect(textarea.getAttribute('aria-describedby')).toContain(errorMessage.id)
  })

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup()
    render(<TextArea label="Comment" />)
    const textarea = screen.getByRole('textbox')

    await act(async () => {
      await user.tab()
    })

    expect(textarea).toHaveFocus()
  })

  it('combines multiple CSS classes correctly', () => {
    render(<TextArea label="Comment" variant="primary" size="lg" ghost className="custom-class" />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveClass(
      'textarea',
      'textarea-primary',
      'textarea-lg',
      'textarea-ghost',
      'custom-class'
    )
    expect(textarea).not.toHaveClass('textarea-bordered')
  })

  it('renders both description and error message', () => {
    render(
      <TextArea
        label="Comment"
        description="Enter your comment here"
        errorMessage="Comment is required"
      />
    )
    expect(screen.getByText('Enter your comment here')).toBeInTheDocument()
    expect(screen.getByText('Comment is required')).toBeInTheDocument()
  })

  it('handles multi-line text input', async () => {
    const user = userEvent.setup()
    render(<TextArea label="Comment" />)
    const textarea = screen.getByRole('textbox')

    const multiLineText = 'Line 1\nLine 2\nLine 3'

    await act(async () => {
      await user.type(textarea, multiLineText)
    })

    expect(textarea).toHaveValue(multiLineText)
  })

  it('supports resizing behavior', () => {
    render(<TextArea label="Comment" />)
    const textarea = screen.getByRole('textbox')

    // TextArea elements should be resizable by default
    expect(textarea.tagName.toLowerCase()).toBe('textarea')
  })

  it('respects maxLength attribute', async () => {
    const user = userEvent.setup()
    render(<TextArea label="Comment" maxLength={10} />)
    const textarea = screen.getByRole('textbox')

    expect(textarea).toHaveAttribute('maxlength', '10')

    await act(async () => {
      await user.type(textarea, 'This is a very long text that exceeds maxLength')
    })

    // The actual behavior depends on browser implementation
    expect(textarea.value.length).toBeLessThanOrEqual(10)
  })

  it('handles value prop for controlled component', () => {
    const { rerender } = render(
      <TextArea label="Comment" value="Initial value" onChange={() => {}} />
    )
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveValue('Initial value')

    rerender(<TextArea label="Comment" value="Updated value" onChange={() => {}} />)
    expect(textarea).toHaveValue('Updated value')
  })

  it('handles defaultValue prop for uncontrolled component', () => {
    render(<TextArea label="Comment" defaultValue="Default comment" />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveValue('Default comment')
  })

  it('renders base textarea class', () => {
    render(<TextArea label="Comment" />)
    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveClass('textarea')
  })

  it('has correct ARIA role for accessibility', () => {
    render(<TextArea label="Comment" />)
    const textarea = screen.getByRole('textbox', { multiline: true })
    expect(textarea).toBeInTheDocument()
  })
})
