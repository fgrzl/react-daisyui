import {
  Modal as AriaModal,
  ModalOverlay as AriaModalOverlay,
  type ModalOverlayProps as AriaModalOverlayProps,
} from 'react-aria-components'
import { cn } from '@/utils/cn'
import ModalAction from './modal-action'
import ModalBox from './modal-box'

/**
 * Props for the Modal component.
 *
 * @property {React.ReactNode} [children] - The content to display inside the modal.
 * @property {string} [className] - Additional CSS classes to apply to the modal.
 * @property {boolean} [responsive=false] - Whether the modal should be responsive (bottom on mobile, middle on larger screens).
 * @property {boolean} [backdrop=true] - Whether clicking the backdrop should close the modal.
 * @property {'top' | 'middle' | 'bottom'} [position] - The vertical position of the modal. Only applies when responsive is false.
 */
export interface ModalProps extends AriaModalOverlayProps {
  responsive?: boolean
  backdrop?: boolean
  position?: 'top' | 'middle' | 'bottom'
}

/**
 * Modal component provides accessible overlays for dialogs, alerts, and popups.
 * 
 * @example
 * ```tsx
 * <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
 *   <Modal.Box>
 *     <h3>Modal Title</h3>
 *     <p>Modal content goes here</p>
 *     <Modal.Action>
 *       <Button onClick={() => setIsOpen(false)}>Close</Button>
 *     </Modal.Action>
 *   </Modal.Box>
 * </Modal>
 * ```
 * 
 * @example Responsive modal
 * ```tsx
 * <Modal isOpen={isOpen} onOpenChange={setIsOpen} responsive>
 *   <Modal.Box>Content</Modal.Box>
 * </Modal>
 * ```
 * 
 * @example Modal with custom position
 * ```tsx
 * <Modal isOpen={isOpen} onOpenChange={setIsOpen} position="top">
 *   <Modal.Box>Content</Modal.Box>
 * </Modal>
 * ```
 */
export default function Modal({
  children,
  className,
  responsive = false,
  backdrop = true,
  position = 'middle',
  ...props
}: ModalProps) {
  const baseClasses = 'modal modal-open'

  const positionClasses = {
    top: 'modal-top',
    middle: 'modal-middle',
    bottom: 'modal-bottom',
  } as const

  const modifierClasses = [
    responsive ? 'modal-bottom sm:modal-middle' : positionClasses[position]
  ].filter(Boolean)

  const classes = cn(baseClasses, ...modifierClasses, className)

  return (
    <AriaModalOverlay className={classes} isDismissable={backdrop} {...props}>
      <AriaModal>{children}</AriaModal>
    </AriaModalOverlay>
  )
}

// Attach sub-components to main Modal
Modal.Box = ModalBox
Modal.Action = ModalAction
