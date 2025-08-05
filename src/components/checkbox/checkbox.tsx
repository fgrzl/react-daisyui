import React from 'react'
import { Checkbox as AriaCheckbox, type CheckboxProps as AriaCheckboxProps } from 'react-aria-components'
import { cn } from '@/utils/cn'

/**
 * Props for the Checkbox component.
 *
 * @property {React.ReactNode} [children] - The label content to display next to the checkbox.
 * @property {string} [className] - Additional CSS classes to apply to the checkbox.
 * @property {'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error'} [variant] - The checkbox variant that determines its styling.
 * @property {'xs' | 'sm' | 'md' | 'lg'} [size] - The size of the checkbox.
 * @property {boolean} [isSelected] - Whether the checkbox is checked.
 * @property {boolean} [isDisabled] - Whether the checkbox is disabled.
 * @property {boolean} [isIndeterminate] - Whether the checkbox is in an indeterminate state.
 * @property {(isSelected: boolean) => void} [onChange] - Callback fired when the checkbox state changes.
 */
export interface CheckboxProps extends AriaCheckboxProps {
  /** The label content to display next to the checkbox */
  children?: React.ReactNode
  /** Additional CSS classes to apply to the checkbox */
  className?: string
  /** The checkbox variant that determines its styling */
  variant?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'neutral'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
  /** The size of the checkbox */
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

/**
 * Checkbox component built with React Aria and styled with DaisyUI.
 * 
 * Provides an accessible checkbox input with support for all DaisyUI variants,
 * sizes, and states. The component includes proper keyboard navigation,
 * screen reader support, and follows WCAG accessibility guidelines.
 * 
 * @example
 * ```tsx
 * <Checkbox variant="primary" size="md" onChange={(isSelected) => console.log(isSelected)}>
 *   Accept terms and conditions
 * </Checkbox>
 * ```
 */
export default function Checkbox({
  children,
  className,
  variant,
  size = 'md',
  ...props
}: CheckboxProps) {
  const baseClasses = 'checkbox'

  const variantClasses = {
    primary: 'checkbox-primary',
    secondary: 'checkbox-secondary',
    accent: 'checkbox-accent',
    neutral: 'checkbox-neutral',
    info: 'checkbox-info',
    success: 'checkbox-success',
    warning: 'checkbox-warning',
    error: 'checkbox-error',
  } as const

  const sizeClasses = {
    xs: 'checkbox-xs',
    sm: 'checkbox-sm',
    md: '',
    lg: 'checkbox-lg',
  } as const

  const checkboxClasses = cn(
    baseClasses,
    variant && variantClasses[variant],
    sizeClasses[size],
    className
  )

  return (
    <AriaCheckbox className={checkboxClasses} {...props}>
      {children}
    </AriaCheckbox>
  )
}