import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

/**
 * Props for the ModalAction component.
 *
 * @property {React.ReactNode} [children] - The action elements (typically buttons) to display.
 * @property {string} [className] - Additional CSS classes to apply to the modal action container.
 * @property {'start' | 'center' | 'end'} [justify='end'] - The alignment of action elements.
 */
export interface ModalActionProps extends HTMLAttributes<HTMLDivElement> {
  justify?: 'start' | 'center' | 'end'
}

/**
 * ModalAction component provides a container for action buttons, typically placed at the bottom of the modal.
 *
 * @example
 * ```tsx
 * <ModalAction justify="end">
 *   <Button variant="ghost">Cancel</Button>
 *   <Button variant="primary">Confirm</Button>
 * </ModalAction>
 * ```
 */
export default function ModalAction({
  children,
  className,
  justify = 'end',
  ...props
}: ModalActionProps) {
  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
  } as const

  return (
    <div className={cn('modal-action', justifyClasses[justify], className)} {...props}>
      {children}
    </div>
  )
}
