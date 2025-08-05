import React, { useState } from 'react'
import { Button as AriaButton, type ButtonProps as AriaButtonProps } from 'react-aria-components'
import { cn } from '@/utils/cn'
import type { PressEvent } from 'react-aria-components'

/**
 * Props for the Button component.
 *
 * @property {React.ReactNode} [children] - The content to display inside the button.
 * @property {string} [className] - Additional CSS classes to apply to the button.
 * @property {'primary' | 'secondary' | 'accent' | 'ghost' | 'link' | 'neutral' | 'info' | 'success' | 'warning' | 'error'} [variant] - The button variant that determines its styling.
 * @property {'xs' | 'sm' | 'md' | 'lg'} [size] - The size of the button.
 * @property {boolean} [outline] - Whether to use outline style.
 * @property {boolean} [wide] - Whether to make the button wider.
 * @property {boolean} [block] - Whether to make the button full width.
 * @property {boolean} [circle] - Whether to make the button circular.
 * @property {boolean} [square] - Whether to make the button square.
 * @property {boolean} [glass] - Whether to apply glass effect.
 * @property {boolean} [loading] - Whether the button is in loading state.
 * @property {boolean} [active] - Whether the button is in active state.
 */
export interface ButtonProps extends AriaButtonProps {
  children?: React.ReactNode
  className?: string
  variant?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'ghost'
    | 'link'
    | 'neutral'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  outline?: boolean
  wide?: boolean
  block?: boolean
  circle?: boolean
  square?: boolean
  glass?: boolean
  loading?: boolean
  active?: boolean
}

export default function Button({
  children,
  className,
  variant,
  size,
  outline = false,
  wide = false,
  block = false,
  circle = false,
  square = false,
  glass = false,
  loading = false,
  active = false,
  isDisabled,
  onPress,
  ...props
}: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false)

  const buttonClasses = cn(
    'btn',
    {
      [`btn-${variant}`]: variant && variant !== 'ghost' && variant !== 'link',
      'btn-ghost': variant === 'ghost',
      'btn-link': variant === 'link',
      'btn-outline': outline,
      [`btn-${size}`]: size && size !== 'md',
      'btn-wide': wide,
      'btn-block': block,
      'btn-circle': circle,
      'btn-square': square,
      'btn-glass': glass,
      'btn-active': active || isPressed,
      loading: loading,
    },
    className
  )

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handlePress = (e: PressEvent) => {
    setIsPressed(true)
    onPress?.(e)
    // Reset pressed state after a short delay
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = window.setTimeout(() => setIsPressed(false), 150)
  }

  return (
    <AriaButton className={buttonClasses} isDisabled={isDisabled || loading} onPress={handlePress} {...props}>
      {loading && <span className="loading loading-spinner loading-sm mr-2" aria-hidden="true" />}
      {children}
    </AriaButton>
  )
}
