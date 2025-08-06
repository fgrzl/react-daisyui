import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal, ModalBox, ModalAction } from '@/components/modal'

describe('Modal', () => {
  it('renders correctly when open', () => {
    render(
      <Modal isOpen>
        <ModalBox aria-label="Test Modal">
          <h1>Test Modal</h1>
          <p>Modal content</p>
        </ModalBox>
      </Modal>
    )

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Test Modal')).toBeInTheDocument()
    expect(screen.getByText('Modal content')).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    render(
      <Modal isOpen={false}>
        <ModalBox aria-label="Test Modal">
          <h1>Test Modal</h1>
        </ModalBox>
      </Modal>
    )

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('applies correct base classes', () => {
    render(
      <Modal isOpen>
        <ModalBox aria-label="Test Modal">Content</ModalBox>
      </Modal>
    )

    const modal = screen.getByRole('dialog').closest('.modal')
    expect(modal).toHaveClass('modal', 'modal-open')
  })

  it('applies responsive classes when responsive prop is true', () => {
    render(
      <Modal isOpen responsive>
        <ModalBox aria-label="Test Modal">Content</ModalBox>
      </Modal>
    )

    const modal = screen.getByRole('dialog').closest('.modal')
    expect(modal).toHaveClass('modal-bottom', 'sm:modal-middle')
  })

  it('applies position classes when position prop is set', () => {
    const { rerender } = render(
      <Modal isOpen position="top">
        <ModalBox aria-label="Test Modal">Content</ModalBox>
      </Modal>
    )

    let modal = screen.getByRole('dialog').closest('.modal')
    expect(modal).toHaveClass('modal-top')

    rerender(
      <Modal isOpen position="bottom">
        <ModalBox aria-label="Test Modal">Content</ModalBox>
      </Modal>
    )
    modal = screen.getByRole('dialog').closest('.modal')
    expect(modal).toHaveClass('modal-bottom')

    rerender(
      <Modal isOpen position="middle">
        <ModalBox aria-label="Test Modal">Content</ModalBox>
      </Modal>
    )
    modal = screen.getByRole('dialog').closest('.modal')
    expect(modal).toHaveClass('modal-middle')
  })

  it('defaults to middle position when no position is specified', () => {
    render(
      <Modal isOpen>
        <ModalBox aria-label="Test Modal">Content</ModalBox>
      </Modal>
    )

    const modal = screen.getByRole('dialog').closest('.modal')
    expect(modal).toHaveClass('modal-middle')
  })

  it('responsive prop overrides position prop', () => {
    render(
      <Modal isOpen responsive position="top">
        <ModalBox aria-label="Test Modal">Content</ModalBox>
      </Modal>
    )

    const modal = screen.getByRole('dialog').closest('.modal')
    // When responsive is true, it should use responsive classes instead of position
    expect(modal).toHaveClass('modal-bottom', 'sm:modal-middle')
    expect(modal).not.toHaveClass('modal-top')
  })

  it('supports custom className', () => {
    render(
      <Modal isOpen className="custom-modal">
        <ModalBox aria-label="Test Modal">Content</ModalBox>
      </Modal>
    )

    const modal = screen.getByRole('dialog').closest('.modal')
    expect(modal).toHaveClass('custom-modal')
  })

  it('passes backdrop prop to isDismissable correctly', () => {
    const { rerender } = render(
      <Modal isOpen backdrop={true}>
        <ModalBox aria-label="Test Modal">Content</ModalBox>
      </Modal>
    )

    // Check that modal renders when backdrop is true
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    rerender(
      <Modal isOpen backdrop={false}>
        <ModalBox aria-label="Test Modal">Content</ModalBox>
      </Modal>
    )

    // Should still render when backdrop is false
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('respects the backdrop prop setting', () => {
    const handleClose = vi.fn()

    // Test that the backdrop prop is properly passed to React Aria
    render(
      <Modal isOpen backdrop={false} onOpenChange={handleClose}>
        <ModalBox aria-label="Test Modal">Content</ModalBox>
      </Modal>
    )

    // Modal should still be present
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    // The specific behavior of backdrop clicking is handled by React Aria internally
  })

  it('closes when Escape key is pressed', async () => {
    const handleClose = vi.fn()
    render(
      <Modal isOpen onOpenChange={handleClose}>
        <ModalBox aria-label="Test Modal">Content</ModalBox>
      </Modal>
    )

    const user = userEvent.setup()
    await act(async () => {
      await user.keyboard('{Escape}')
    })

    expect(handleClose).toHaveBeenCalledWith(false)
  })

  it('traps focus within modal', async () => {
    render(
      <Modal isOpen>
        <ModalBox aria-label="Test Modal">
          <button>First Button</button>
          <button>Second Button</button>
        </ModalBox>
      </Modal>
    )

    const firstButton = screen.getByText('First Button')
    const secondButton = screen.getByText('Second Button')

    // Focus should be trapped within the modal
    const user = userEvent.setup()
    firstButton.focus()
    expect(document.activeElement).toBe(firstButton)

    await act(async () => {
      await user.tab()
    })
    expect(document.activeElement).toBe(secondButton)
  })
})

describe('ModalBox', () => {
  it('renders correctly with dialog role', () => {
    render(
      <Modal isOpen>
        <ModalBox aria-label="Modal Box">
          <h1>Modal Box Content</h1>
        </ModalBox>
      </Modal>
    )

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(dialog).toHaveClass('modal-box')
    expect(screen.getByText('Modal Box Content')).toBeInTheDocument()
  })

  it('supports custom className', () => {
    render(
      <Modal isOpen>
        <ModalBox className="custom-box" aria-label="Custom Modal">
          Content
        </ModalBox>
      </Modal>
    )

    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveClass('modal-box', 'custom-box')
  })

  it('passes through aria props', () => {
    render(
      <Modal isOpen>
        <ModalBox aria-label="Custom Modal" aria-describedby="modal-desc">
          <p id="modal-desc">Modal description</p>
        </ModalBox>
      </Modal>
    )

    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-label', 'Custom Modal')
    expect(dialog).toHaveAttribute('aria-describedby', 'modal-desc')
  })
})

describe('ModalAction', () => {
  it('renders with correct base class', () => {
    render(
      <ModalAction>
        <button>Action Button</button>
      </ModalAction>
    )

    const actionContainer = screen.getByText('Action Button').parentElement
    expect(actionContainer).toHaveClass('modal-action')
  })

  it('applies correct justify alignment classes', () => {
    const { rerender } = render(
      <ModalAction justify="start">
        <button>Start</button>
      </ModalAction>
    )

    let container = screen.getByText('Start').parentElement
    expect(container).toHaveClass('justify-start')

    rerender(
      <ModalAction justify="center">
        <button>Center</button>
      </ModalAction>
    )
    container = screen.getByText('Center').parentElement
    expect(container).toHaveClass('justify-center')

    rerender(
      <ModalAction justify="end">
        <button>End</button>
      </ModalAction>
    )
    container = screen.getByText('End').parentElement
    expect(container).toHaveClass('justify-end')
  })

  it('defaults to end justification', () => {
    render(
      <ModalAction>
        <button>Default</button>
      </ModalAction>
    )

    const container = screen.getByText('Default').parentElement
    expect(container).toHaveClass('justify-end')
  })

  it('supports custom className', () => {
    render(
      <ModalAction className="custom-action">
        <button>Custom</button>
      </ModalAction>
    )

    const container = screen.getByText('Custom').parentElement
    expect(container).toHaveClass('modal-action', 'custom-action')
  })

  it('passes through HTML attributes', () => {
    render(
      <ModalAction data-testid="modal-actions" id="actions">
        <button>Test</button>
      </ModalAction>
    )

    const container = screen.getByTestId('modal-actions')
    expect(container).toHaveAttribute('id', 'actions')
  })
})

describe('Modal Integration', () => {
  it('works together with all sub-components', () => {
    const handleClose = vi.fn()

    render(
      <Modal isOpen onOpenChange={handleClose}>
        <ModalBox aria-label="Confirmation Dialog">
          <h3>Confirmation</h3>
          <p>Are you sure you want to proceed?</p>
          <ModalAction>
            <button onClick={() => handleClose(false)}>Cancel</button>
            <button>Confirm</button>
          </ModalAction>
        </ModalBox>
      </Modal>
    )

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Confirmation')).toBeInTheDocument()
    expect(screen.getByText('Are you sure you want to proceed?')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
    expect(screen.getByText('Confirm')).toBeInTheDocument()
  })

  it('handles complex interaction flows', async () => {
    const handleClose = vi.fn()
    const handleConfirm = vi.fn()

    render(
      <Modal isOpen onOpenChange={handleClose}>
        <ModalBox aria-label="Delete Item">
          <h3>Delete Item</h3>
          <p>This action cannot be undone.</p>
          <ModalAction>
            <button onClick={() => handleClose(false)}>Cancel</button>
            <button onClick={handleConfirm}>Delete</button>
          </ModalAction>
        </ModalBox>
      </Modal>
    )

    const user = userEvent.setup()

    // Test cancel button
    await act(async () => {
      await user.click(screen.getByText('Cancel'))
    })
    expect(handleClose).toHaveBeenCalledWith(false)

    // Test confirm button
    await act(async () => {
      await user.click(screen.getByText('Delete'))
    })
    expect(handleConfirm).toHaveBeenCalled()
  })

  it('maintains accessibility across all components', () => {
    render(
      <Modal isOpen>
        <ModalBox aria-labelledby="modal-title">
          <h3 id="modal-title">Accessible Modal</h3>
          <p>This modal follows accessibility best practices.</p>
          <ModalAction>
            <button>Close</button>
          </ModalAction>
        </ModalBox>
      </Modal>
    )

    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title')

    // Check that modal title is connected
    const title = screen.getByText('Accessible Modal')
    expect(title).toHaveAttribute('id', 'modal-title')
  })
})
