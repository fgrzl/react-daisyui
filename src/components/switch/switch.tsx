import React from 'react'
import {
  Switch as AriaSwitch,
  type SwitchProps as AriaSwitchProps,
} from 'react-aria-components'
import { cn } from '@/utils/cn'

/**
 * Props for the Switch component.
 *
 * @property {React.ReactNode} [children] - The label content to display next to the switch.
 * @property {string} [className] - Additional CSS classes to apply to the switch.
 * @property {'primary' | 'secondary' | 'accent' | 'neutral' | 'info' | 'success' | 'warning' | 'error'} [variant] - The switch variant that determines its styling.
 * @property {'xs' | 'sm' | 'md' | 'lg'} [size] - The size of the switch.
 * @property {boolean} [isSelected] - Whether the switch is on/off.
 * @property {boolean} [isDisabled] - Whether the switch is disabled.
 * @property {(isSelected: boolean) => void} [onChange] - Callback fired when the switch state changes.
 */
export interface SwitchProps extends AriaSwitchProps {
  /** The label content to display next to the switch */
  children?: React.ReactNode
  /** Additional CSS classes to apply to the switch */
  className?: string
  /** The switch variant that determines its styling */
  variant?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'neutral'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
  /** The size of the switch */
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

/**
 * Switch component built with React Aria and styled with DaisyUI.
 *
 * Provides an accessible toggle switch input with support for all DaisyUI variants,
 * sizes, and states. The component includes proper keyboard navigation,
 * screen reader support, and follows WCAG accessibility guidelines.
 *
 * @example
 * ```tsx
 * <Switch variant="primary" size="md" onChange={(isSelected) => console.log(isSelected)}>
 *   Enable notifications
 * </Switch>
 * ```
 */
export default function Switch({
  children,
  className,
  variant,
  size = 'md',
  ...props
}: SwitchProps) {
  const baseClasses = 'toggle'

  const variantClasses = {
    primary: 'toggle-primary',
    secondary: 'toggle-secondary',
    accent: 'toggle-accent',
    neutral: 'toggle-neutral',
    info: 'toggle-info',
    success: 'toggle-success',
    warning: 'toggle-warning',
    error: 'toggle-error',
  } as const

  const sizeClasses = {
    xs: 'toggle-xs',
    sm: 'toggle-sm',
    md: '',
    lg: 'toggle-lg',
  } as const

  const switchClasses = cn(
    baseClasses,
    variant && variantClasses[variant],
    sizeClasses[size],
    className
  )

  return (
    <AriaSwitch className={switchClasses} {...props}>
      {children}
    </AriaSwitch>
  )
}