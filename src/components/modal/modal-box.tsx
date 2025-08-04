import { Dialog as AriaDialog, type DialogProps as AriaDialogProps } from 'react-aria-components'
import { cn } from '@/utils/cn'

export interface ModalBoxProps extends AriaDialogProps {
  className?: string
}

export default function ModalBox({ children, className, ...props }: ModalBoxProps) {
  return (
    <AriaDialog className={cn('modal-box', className)} {...props}>
      {children}
    </AriaDialog>
  )
}
