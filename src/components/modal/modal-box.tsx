import { Dialog as AriaDialog, type DialogProps as AriaDialogProps } from 'react-aria-components'
import { cn } from '@/utils/cn'

/**
 * Props for the ModalBox component.
 *
 * @property {React.ReactNode} [children] - The content to display inside the modal box.
 * @property {string} [className] - Additional CSS classes to apply to the modal box.
 */
export interface ModalBoxProps extends AriaDialogProps {
  className?: string
}

/**
 * ModalBox component provides the container for modal content with proper styling and padding.
 *
 * @example
 * ```tsx
 * <ModalBox>
 *   <h3>Modal Title</h3>
 *   <p>Modal content</p>
 * </ModalBox>
 * ```
 */
export default function ModalBox({ children, className, ...props }: ModalBoxProps) {
  return (
    <AriaDialog className={cn('modal-box', className)} {...props}>
      {children}
    </AriaDialog>
  )
}
