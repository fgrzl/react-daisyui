import React from 'react'
import {
  Select as AriaSelect,
  SelectValue,
  Button,
  Popover,
  ListBox,
  ListBoxItem,
  type SelectProps as AriaSelectProps,
} from 'react-aria-components'
import { cn } from '@/utils/cn'

/**
 * Props for the Select component.
 *
 * @property {React.ReactNode} [children] - The content to display inside the select (ListBoxItem elements).
 * @property {string} [className] - Additional CSS classes to apply to the select.
 * @property {'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error'} [variant] - The select variant that determines its styling.
 * @property {'xs' | 'sm' | 'md' | 'lg'} [size] - The size of the select.
 * @property {boolean} [bordered] - Whether to use bordered style (default DaisyUI select style).
 * @property {boolean} [ghost] - Whether to use ghost style.
 * @property {string} [placeholder] - Placeholder text when no option is selected.
 */
export interface SelectProps extends Omit<AriaSelectProps<object>, 'children'> {
  children?: React.ReactNode
  className?: string
  variant?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'neutral'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  bordered?: boolean
  ghost?: boolean
  placeholder?: string
}

/**
 * Props for the SelectItem component.
 *
 * @property {React.ReactNode} [children] - The content to display inside the select item.
 * @property {string} [className] - Additional CSS classes to apply to the select item.
 * @property {string | number} id - The unique identifier for the select item value.
 */
export interface SelectItemProps {
  children?: React.ReactNode
  className?: string
  id: string | number
}

export default function Select({
  children,
  className,
  variant,
  size,
  bordered = true,
  ghost = false,
  placeholder = 'Select an option',
  isDisabled,
  ...props
}: SelectProps) {
  const selectClasses = cn(
    'select',
    {
      'select-bordered': bordered && !ghost,
      'select-ghost': ghost,
      [`select-${variant}`]: variant,
      [`select-${size}`]: size && size !== 'md',
    },
    className
  )

  return (
    <AriaSelect className={selectClasses} isDisabled={isDisabled} {...props}>
      <Button className="flex items-center justify-between w-full">
        <SelectValue>
          {({ isPlaceholder, selectedText }) => {
            return isPlaceholder ? placeholder : selectedText
          }}
        </SelectValue>
        <span className="ml-2" aria-hidden="true">
          ▼
        </span>
      </Button>
      <Popover className="min-w-[var(--trigger-width)]">
        <ListBox className="outline-none">{children}</ListBox>
      </Popover>
    </AriaSelect>
  )
}

export function SelectItem({ children, className, id, ...props }: SelectItemProps) {
  const itemClasses = cn('cursor-pointer p-2 hover:bg-base-200 rounded', className)

  return (
    <ListBoxItem id={id} className={itemClasses} {...props}>
      {children}
    </ListBoxItem>
  )
}