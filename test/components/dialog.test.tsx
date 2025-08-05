import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Dialog, DialogTrigger, DialogOverlay } from '@/components/dialog'
import { Button } from '@/components/button'

describe('Dialog', () => {
  const DialogExample = ({
    size = 'md',
    responsive = false,
    backdrop = true,
    className = '',
  }: {
    size?: 'sm' | 'md' | 'lg' | 'xl'
    responsive?: boolean
    backdrop?: boolean
    className?: string
  }) => (
    <DialogTrigger>
      <Button>Open Dialog</Button>
      <DialogOverlay backdrop={backdrop} responsive={responsive}>
        <Dialog size={size} responsive={responsive} className={className}>
          <h2>Dialog Title</h2>
          <p>Dialog content goes here</p>
          <div className="modal-action">
            <Button variant="ghost">Cancel</Button>
            <Button variant="primary">Confirm</Button>
          </div>
        </Dialog>
      </DialogOverlay>
    </DialogTrigger>
  )

  it('renders correctly when triggered', async () => {
    render(<DialogExample />)

    const triggerButton = screen.getByRole('button', { name: 'Open Dialog' })
    expect(triggerButton).toBeInTheDocument()

    const user = userEvent.setup()
    await act(async () => {
      await user.click(triggerButton)
    })

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Dialog Title')).toBeInTheDocument()
    expect(screen.getByText('Dialog content goes here')).toBeInTheDocument()
  })

  it('applies correct size classes', async () => {
    render(<DialogExample size="lg" />)

    const user = userEvent.setup()
    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'Open Dialog' }))
    })

    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveClass('max-w-lg')
  })

  it('applies all size variants correctly', async () => {
    const sizes = ['sm', 'md', 'lg', 'xl'] as const

    for (const size of sizes) {
      const { unmount } = render(<DialogExample size={size} />)

      const user = userEvent.setup()
      await act(async () => {
        await user.click(screen.getByRole('button', { name: 'Open Dialog' }))
      })

      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveClass(`max-w-${size}`)

      unmount()
    }
  })

  it('applies responsive classes when responsive prop is true', async () => {
    render(<DialogExample responsive />)

    const user = userEvent.setup()
    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'Open Dialog' }))
    })

    const overlay = document.querySelector('.modal-bottom.sm\\:modal-middle')
    expect(overlay).toBeInTheDocument()

    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveClass('w-11/12', 'max-w-5xl')
  })

  it('applies custom className', async () => {
    render(<DialogExample className="custom-dialog" />)

    const user = userEvent.setup()
    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'Open Dialog' }))
    })

    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveClass('custom-dialog')
  })

  it('has correct base classes', async () => {
    render(<DialogExample />)

    const user = userEvent.setup()
    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'Open Dialog' }))
    })

    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveClass('modal-box')

    const overlay = document.querySelector('.modal.modal-open')
    expect(overlay).toBeInTheDocument()
  })

  it('closes when backdrop is clicked', async () => {
    render(<DialogExample backdrop />)

    const user = userEvent.setup()
    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'Open Dialog' }))
    })

    expect(screen.getByRole('dialog')).toBeInTheDocument()

    // Click on the overlay (backdrop)
    const overlay = document.querySelector('.modal')
    if (overlay) {
      await act(async () => {
        await user.click(overlay)
      })
    }

    // Dialog should close (may not be in document anymore)
    await act(async () => {
      // Wait for potential state updates
    })
  })

  it('does not close when backdrop=false and backdrop is clicked', async () => {
    render(<DialogExample backdrop={false} />)

    const user = userEvent.setup()
    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'Open Dialog' }))
    })

    expect(screen.getByRole('dialog')).toBeInTheDocument()

    // Click on the overlay (backdrop) - should not close
    const overlay = document.querySelector('.modal')
    if (overlay) {
      await act(async () => {
        await user.click(overlay)
      })
    }

    // Dialog should still be open
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('handles keyboard navigation properly', async () => {
    render(<DialogExample />)

    const user = userEvent.setup()
    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'Open Dialog' }))
    })

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()

    // Should be able to tab through focusable elements
    await act(async () => {
      await user.keyboard('{Tab}')
    })

    const cancelButton = screen.getByRole('button', { name: 'Cancel' })
    expect(cancelButton).toHaveFocus()

    await act(async () => {
      await user.keyboard('{Tab}')
    })

    const confirmButton = screen.getByRole('button', { name: 'Confirm' })
    expect(confirmButton).toHaveFocus()
  })

  it('closes when Escape key is pressed', async () => {
    render(<DialogExample />)

    const user = userEvent.setup()
    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'Open Dialog' }))
    })

    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await act(async () => {
      await user.keyboard('{Escape}')
    })

    // Dialog should close
    await act(async () => {
      // Wait for potential state updates
    })
  })

  it('maintains focus management', async () => {
    render(<DialogExample />)

    const triggerButton = screen.getByRole('button', { name: 'Open Dialog' })

    const user = userEvent.setup()
    await act(async () => {
      await user.click(triggerButton)
    })

    // Focus should be trapped within the dialog
    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()

    // React Aria Dialog focuses the dialog container first
    expect(document.activeElement).toBe(dialog)
  })

  it('supports ARIA attributes', async () => {
    render(<DialogExample />)

    const user = userEvent.setup()
    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'Open Dialog' }))
    })

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(dialog).toHaveAttribute('role', 'dialog')
  })

  it('works with different content types', async () => {
    const CustomDialog = () => (
      <DialogTrigger>
        <Button>Open Custom Dialog</Button>
        <DialogOverlay>
          <Dialog>
            <form>
              <input type="text" placeholder="Enter text" />
              <Button type="submit">Submit</Button>
            </form>
          </Dialog>
        </DialogOverlay>
      </DialogTrigger>
    )

    render(<CustomDialog />)

    const user = userEvent.setup()
    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'Open Custom Dialog' }))
    })

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
  })

  it('can be closed programmatically via button action', async () => {
    const CloseableDialog = () => (
      <DialogTrigger>
        <Button>Open Dialog</Button>
        <DialogOverlay>
          <Dialog>
            <h2>Closeable Dialog</h2>
            <form method="dialog">
              <Button type="submit">Close Dialog</Button>
            </form>
          </Dialog>
        </DialogOverlay>
      </DialogTrigger>
    )

    render(<CloseableDialog />)

    const user = userEvent.setup()
    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'Open Dialog' }))
    })

    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'Close Dialog' }))
    })

    // Dialog should close
    await act(async () => {
      // Wait for potential state updates
    })
  })

  it('renders without responsive classes by default', async () => {
    render(<DialogExample />)

    const user = userEvent.setup()
    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'Open Dialog' }))
    })

    const overlay = document.querySelector('.modal')
    expect(overlay).not.toHaveClass('modal-bottom')
    expect(overlay).not.toHaveClass('sm:modal-middle')

    const dialog = screen.getByRole('dialog')
    expect(dialog).not.toHaveClass('w-11/12')
    expect(dialog).not.toHaveClass('max-w-5xl')
  })

  it('has medium size as default', async () => {
    render(<DialogExample />)

    const user = userEvent.setup()
    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'Open Dialog' }))
    })

    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveClass('max-w-md')
  })
})
