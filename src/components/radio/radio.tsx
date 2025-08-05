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
 * @property {boolean} [disabled] - Whether the radio button is disabled.
 */
export interface RadioProps extends AriaRadioProps {
  children?: React.ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'info' | 'error'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  disabled?: boolean
}

/**
 * A radio button component that provides accessible radio input functionality
 * with DaisyUI styling. Should be used within a RadioGroup component.
 *
 * @param props - The props for the Radio component
 * @returns A styled radio button component
 */
export default function Radio({
  children,
  className,
  variant,
  size = 'md',
  disabled = false,
  ...props
}: RadioProps) {
  const radioClasses = cn(
    'radio',
    {
      [`radio-${variant}`]: variant,
      [`radio-${size}`]: size && size !== 'md',
    },
    className
  )

  return (
    <AriaRadio 
      className={radioClasses}
      isDisabled={disabled} 
      {...props}
    >
      {children}
    </AriaRadio>
  )
}