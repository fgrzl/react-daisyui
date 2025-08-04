import {
  Modal as AriaModal,
  ModalOverlay as AriaModalOverlay,
  type ModalOverlayProps as AriaModalOverlayProps,
} from 'react-aria-components'
import { cn } from '@/utils/cn'
import ModalAction from './modal-action'
import ModalBox from './modal-box'

export interface ModalProps extends AriaModalOverlayProps {
  responsive?: boolean
  backdrop?: boolean
}

export default function Modal({
  children,
  className,
  responsive = false,
  backdrop = true,
  ...props
}: ModalProps) {
  const baseClasses = 'modal modal-open'

  const modifierClasses = [responsive && 'modal-bottom sm:modal-middle'].filter(Boolean)

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
