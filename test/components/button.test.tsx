import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('applies correct variant classes', () => {
    render(<Button variant="secondary">Secondary Button</Button>)
    const button = screen.getByRole('button', { name: 'Secondary Button' })
    expect(button).toHaveClass('btn-secondary')
  })

  it('applies correct size classes', () => {
    render(<Button size="lg">Large Button</Button>)
    const button = screen.getByRole('button', { name: 'Large Button' })
    expect(button).toHaveClass('btn-lg')
  })

  it('shows loading state', () => {
    render(<Button loading>Loading Button</Button>)
    const button = screen.getByRole('button', { name: 'Loading Button' })
    expect(button).toHaveClass('loading')
    expect(button).toBeDisabled()
  })

  it('applies outline variant correctly', () => {
    render(
      <Button variant="primary" outline>
        Outline Button
      </Button>
    )
    const button = screen.getByRole('button', { name: 'Outline Button' })
    expect(button).toHaveClass('btn-outline', 'btn-primary')
  })

  it('handles click events', async () => {
    const handlePress = vi.fn()
    render(<Button onPress={handlePress}>Clickable</Button>)

    const user = userEvent.setup()
    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'Clickable' }))
    })

    expect(handlePress).toHaveBeenCalledTimes(1)
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom Button</Button>)
    const button = screen.getByRole('button', { name: 'Custom Button' })
    expect(button).toHaveClass('custom-class')
  })

  it('renders with different variants', () => {
    const { rerender } = render(<Button variant="ghost">Ghost Button</Button>)
    expect(screen.getByRole('button', { name: 'Ghost Button' })).toHaveClass('btn-ghost')

    rerender(<Button variant="link">Link Button</Button>)
    expect(screen.getByRole('button', { name: 'Link Button' })).toHaveClass('btn-link')

    rerender(<Button variant="accent">Accent Button</Button>)
    expect(screen.getByRole('button', { name: 'Accent Button' })).toHaveClass('btn-accent')
  })

  it('applies modifier classes correctly', () => {
    render(
      <Button wide block circle>
        Modified Button
      </Button>
    )
    const button = screen.getByRole('button', { name: 'Modified Button' })
    expect(button).toHaveClass('btn-wide', 'btn-block', 'btn-circle')
  })

  it('handles disabled state', () => {
    render(<Button isDisabled>Disabled Button</Button>)
    const button = screen.getByRole('button', { name: 'Disabled Button' })
    expect(button).toBeDisabled()
  })

  it('renders loading spinner when loading', () => {
    render(<Button loading>Loading Button</Button>)
    const spinner = screen.getByRole('button').querySelector('.loading-spinner')
    expect(spinner).toBeInTheDocument()
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
      const { unmount } = render(<Button variant={variant}>{variant} Button</Button>)
      const button = screen.getByRole('button', { name: `${variant} Button` })
      expect(button).toHaveClass(`btn-${variant}`)
      unmount()
    })
  })

  it('supports outline variants', () => {
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
      const { unmount } = render(
        <Button variant={variant} outline>
          Outline {variant}
        </Button>
      )
      const button = screen.getByRole('button', { name: `Outline ${variant}` })
      expect(button).toHaveClass('btn-outline', `btn-${variant}`)
      unmount()
    })
  })

  it('supports all sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg'] as const

    sizes.forEach(size => {
      const { unmount } = render(<Button size={size}>{size} Button</Button>)
      const button = screen.getByRole('button', { name: `${size} Button` })

      if (size === 'md') {
        // Medium is default with no additional class
        expect(button).toHaveClass('btn')
      } else {
        expect(button).toHaveClass(`btn-${size}`)
      }
      unmount()
    })
  })

  it('handles keyboard interaction', async () => {
    const handlePress = vi.fn()
    render(<Button onPress={handlePress}>Keyboard Button</Button>)

    const button = screen.getByRole('button', { name: 'Keyboard Button' })
    button.focus()

    const user = userEvent.setup()
    await act(async () => {
      await user.keyboard('{Enter}')
    })
    expect(handlePress).toHaveBeenCalledTimes(1)

    await act(async () => {
      await user.keyboard(' ')
    })
    expect(handlePress).toHaveBeenCalledTimes(2)
  })

  it('prevents interaction when disabled', async () => {
    const handlePress = vi.fn()
    render(
      <Button isDisabled onPress={handlePress}>
        Disabled Button
      </Button>
    )

    const user = userEvent.setup()
    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'Disabled Button' }))
    })

    expect(handlePress).not.toHaveBeenCalled()
  })

  it('prevents interaction when loading', async () => {
    const handlePress = vi.fn()
    render(
      <Button loading onPress={handlePress}>
        Loading Button
      </Button>
    )

    const user = userEvent.setup()
    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'Loading Button' }))
    })

    expect(handlePress).not.toHaveBeenCalled()
  })
})
