import React from 'react'
import { Radio as AriaRadio, type RadioProps as AriaRadioProps } from 'react-aria-components'
import { cn } from '@/utils/cn'

/**
 * Props for the Radio component.
 *
 * @property {React.ReactNode} [children] - The label content to display next to the radio button.
 * @property {string} [className] - Additional CSS classes to apply to the radio button.
 * @property {'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'info' | 'error'} [variant] - The radio variant that determines its styling.
 * @property {'xs' | 'sm' | 'md' | 'lg'} [size] - The size of the radio button.
 * @property {boolean} [isDisabled] - Whether the radio button is disabled.
 */
export interface RadioProps extends AriaRadioProps {
  children?: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'info' | 'error'
  size?: 'xs' | 'sm' | 'md' | 'lg'
}
/**
 * Radio component built with React Aria and styled with DaisyUI.
 * 
 * Provides an accessible radio button input with support for all DaisyUI variants,
 * sizes, and states. Must be used within a RadioGroup component for proper
 * accessibility and single-selection behavior.
 * 
 * @example
 * ```tsx
 * <RadioGroup aria-label="Priority level">
 *   <Radio value="low" variant="success" size="md">Low Priority</Radio>
 *   <Radio value="high" variant="error" size="md">High Priority</Radio>
 * </RadioGroup>
 * ```
 */
export default function Radio({
  children,
  className,
  variant,
  size = 'md',
  isDisabled = false,
  ...props
}: RadioProps) {
  const baseClasses = 'radio'

  const variantClasses = {
    primary: 'radio-primary',
    secondary: 'radio-secondary',
    accent: 'radio-accent',
    success: 'radio-success',
    warning: 'radio-warning',
    info: 'radio-info',
    error: 'radio-error',
  } as const

  const sizeClasses = {
    xs: 'radio-xs',
    sm: 'radio-sm',
    md: '',
    lg: 'radio-lg',
  } as const

  const radioClasses = cn(
    baseClasses,
    variant && variantClasses[variant],
    sizeClasses[size],
    className
  )

  return (
    <AriaRadio 
      className={radioClasses}
      isDisabled={isDisabled} 
      {...props}
    >
      {children}
    </AriaRadio>
  )
}