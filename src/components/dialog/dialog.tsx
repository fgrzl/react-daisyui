import {
  Dialog as AriaDialog,
  DialogTrigger as AriaDialogTrigger,
  Modal as AriaModal,
  ModalOverlay as AriaModalOverlay,
  type DialogProps as AriaDialogProps,
  type DialogTriggerProps as AriaDialogTriggerProps,
  type ModalOverlayProps as AriaModalOverlayProps,
} from 'react-aria-components'
import { cn } from '@/utils/cn'

/**
 * Props for the DialogTrigger component.
 *
 * @property {ReactNode} children - The trigger element and dialog content.
 */
export interface DialogTriggerProps extends AriaDialogTriggerProps {
  // Children is already included in AriaDialogTriggerProps
}

/**
 * Props for the Dialog component.
 *
 * @property {ReactNode} [children] - The content to display inside the dialog.
 * @property {string} [className] - Additional CSS classes to apply to the dialog.
 * @property {'sm' | 'md' | 'lg' | 'xl'} [size] - The size of the dialog.
 * @property {boolean} [responsive] - Whether the dialog should be responsive on mobile.
 */
export interface DialogProps extends AriaDialogProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  responsive?: boolean
}

/**
 * Props for the DialogOverlay component.
 *
 * @property {ReactNode} children - The dialog content.
 * @property {string} [className] - Additional CSS classes to apply to the overlay.
 * @property {boolean} [backdrop] - Whether clicking the backdrop should close the dialog.
 * @property {boolean} [responsive] - Whether the dialog should be responsive on mobile.
 */
export interface DialogOverlayProps extends AriaModalOverlayProps {
  className?: string
  backdrop?: boolean
  responsive?: boolean
}

/**
 * DialogTrigger component that manages the dialog state and trigger.
 * Provides the context for opening and closing the dialog.
 *
 * @example
 * ```tsx
 * <DialogTrigger>
 *   <Button>Open Dialog</Button>
 *   <DialogOverlay>
 *     <Dialog>
 *       <h2>Dialog Title</h2>
 *       <p>Dialog content goes here</p>
 *     </Dialog>
 *   </DialogOverlay>
 * </DialogTrigger>
 * ```
 */
export function DialogTrigger({ children, ...props }: DialogTriggerProps) {
  return <AriaDialogTrigger {...props}>{children}</AriaDialogTrigger>
}

/**
 * DialogOverlay component that provides the modal overlay and backdrop.
 * This component should wrap the Dialog component.
 *
 * @example
 * ```tsx
 * <DialogOverlay backdrop responsive>
 *   <Dialog size="lg">
 *     Dialog content
 *   </Dialog>
 * </DialogOverlay>
 * ```
 */
export function DialogOverlay({
  children,
  className,
  backdrop = true,
  responsive = false,
  ...props
}: DialogOverlayProps) {
  const baseClasses = 'modal modal-open'

  const modifierClasses = [responsive && 'modal-bottom sm:modal-middle'].filter(Boolean)

  const classes = cn(baseClasses, ...modifierClasses, className)

  return (
    <AriaModalOverlay
      className={classes}
      isDismissable={backdrop}
      data-testid="dialog-overlay"
      {...props}
    >
      <AriaModal>{children}</AriaModal>
    </AriaModalOverlay>
  )
}

/**
 * Dialog component that provides an accessible modal dialog.
 * Should be used within a DialogTrigger and DialogOverlay.
 *
 * @example
 * ```tsx
 * <Dialog size="md" className="custom-dialog">
 *   <h2>Confirm Action</h2>
 *   <p>Are you sure you want to continue?</p>
 *   <div className="modal-action">
 *     <Button variant="ghost">Cancel</Button>
 *     <Button variant="primary">Confirm</Button>
 *   </div>
 * </Dialog>
 * ```
 */
export default function Dialog({
  children,
  className,
  size = 'md',
  responsive = false,
  ...props
}: DialogProps) {
  const baseClasses = 'modal-box'

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  } as const

  const modifierClasses = [responsive && 'w-11/12 max-w-5xl'].filter(Boolean)

  const classes = cn(baseClasses, sizeClasses[size], ...modifierClasses, className)

  return (
    <AriaDialog className={classes} {...props}>
      {children}
    </AriaDialog>
  )
}

// Attach sub-components to main Dialog for compound component pattern
Dialog.Trigger = DialogTrigger
Dialog.Overlay = DialogOverlay
