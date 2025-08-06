import React from 'react'
import { RadioGroup as AriaRadioGroup, type RadioGroupProps as AriaRadioGroupProps } from 'react-aria-components'
import { cn } from '@/utils/cn'

/**
 * Props for the RadioGroup component.
 *
 * @property {React.ReactNode} children - The radio buttons to display within the group.
 * @property {string} [className] - Additional CSS classes to apply to the radio group.
 * @property {string} [label] - The label for the radio group.
 * @property {string} [description] - A description for the radio group.
 * @property {string} [errorMessage] - An error message to display if validation fails.
 * @property {'vertical' | 'horizontal'} [orientation] - The layout orientation of the radio buttons.
 * @property {boolean} [isRequired] - Whether the radio group is required.
 * @property {boolean} [isDisabled] - Whether the entire radio group is disabled.
 */
export interface RadioGroupProps extends AriaRadioGroupProps {
  children: React.ReactNode
  className?: string
  label?: string
  description?: string
  errorMessage?: string
  orientation?: 'vertical' | 'horizontal'
  isRequired?: boolean
}

/**
 * A radio group component that manages a set of radio buttons,
 * ensuring only one can be selected at a time with proper accessibility.
 *
 * @param props - The props for the RadioGroup component
 * @returns A styled radio group component
 */
export default function RadioGroup({
  children,
  className,
  label,
  description,
  errorMessage,
  orientation = 'vertical',
  isRequired = false,
  isDisabled,
  ...props
}: RadioGroupProps) {
  const groupClasses = cn(
    'form-control',
    orientation === 'horizontal' ? 'flex flex-row gap-4' : 'space-y-2',
    className
  )

  return (
    <AriaRadioGroup
      className={groupClasses}
      isRequired={isRequired}
      isDisabled={isDisabled}
      {...props}
    >
      {label && (
        <div className="label">
          <span className="label-text font-medium">
            {label}
            {isRequired && <span className="text-error ml-1">*</span>}
          </span>
        </div>
      )}
      {description && (
        <div className="label">
          <span className="label-text-alt text-base-content/70">{description}</span>
        </div>
      )}
      <div>{children}</div>
      {errorMessage && (
        <div className="label">
          <span className="label-text-alt text-error">{errorMessage}</span>
        </div>
      )}
    </AriaRadioGroup>
  )
}