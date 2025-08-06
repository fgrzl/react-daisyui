import {
  TextField as AriaTextField,
  Label,
  Input,
  Text,
  FieldError,
  type TextFieldProps as AriaTextFieldProps,
} from 'react-aria-components'
import { cn } from '@/utils/cn'

export interface TextFieldProps extends AriaTextFieldProps {
  /** The content to display as the label */
  label?: string
  /** The content to display as help text */
  description?: string
  /** The content to display as an error message */
  errorMessage?: string
  /** Additional CSS classes to apply to the input */
  className?: string
  /** Additional CSS classes to apply to the wrapper */
  wrapperClassName?: string
  /** The input variant that determines its styling */
  variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
  /** The size of the input */
  size?: 'xs' | 'sm' | 'md' | 'lg'
  /** Whether to use bordered style (default: true) */
  bordered?: boolean
  /** Whether to use ghost style */
  ghost?: boolean
  /** Placeholder text for the input */
  placeholder?: string
}

/**
 * TextField component built on React Aria Components with DaisyUI styling.
 *
 * Provides an accessible text input field with label, description, and error message support.
 * Follows DaisyUI design standards while leveraging React Aria's accessibility features.
 *
 * @param props - The props for the TextField component
 * @param props.label - The content to display as the label
 * @param props.description - The content to display as help text
 * @param props.errorMessage - The content to display as an error message
 * @param props.className - Additional CSS classes to apply to the input
 * @param props.wrapperClassName - Additional CSS classes to apply to the wrapper
 * @param props.variant - The input variant that determines its styling
 * @param props.size - The size of the input
 * @param props.bordered - Whether to use bordered style (default: true)
 * @param props.ghost - Whether to use ghost style
 * @param props.placeholder - Placeholder text for the input
 */
export default function TextField({
  label,
  description,
  errorMessage,
  className,
  wrapperClassName,
  variant,
  size = 'md',
  bordered = true,
  ghost = false,
  placeholder,
  isInvalid,
  ...props
}: TextFieldProps) {
  const baseClasses = 'input'

  const variantClasses = {
    primary: 'input-primary',
    secondary: 'input-secondary',
    accent: 'input-accent',
    info: 'input-info',
    success: 'input-success',
    warning: 'input-warning',
    error: 'input-error',
  } as const

  const sizeClasses = {
    xs: 'input-xs',
    sm: 'input-sm',
    md: '',
    lg: 'input-lg',
  } as const

  const modifierClasses = [bordered && !ghost && 'input-bordered', ghost && 'input-ghost'].filter(
    Boolean
  )

  const inputClasses = cn(
    baseClasses,
    variant && variantClasses[variant],
    sizeClasses[size],
    ...modifierClasses,
    className
  )

  const wrapperClasses = cn('form-control', wrapperClassName)

  return (
    <AriaTextField className={wrapperClasses} isInvalid={isInvalid || !!errorMessage} {...props}>
      {label && (
        <Label className="label">
          <span className="label-text">{label}</span>
        </Label>
      )}
      <Input className={inputClasses} placeholder={placeholder} />
      {description && (
        <Text slot="description" className="label">
          <span className="label-text-alt">{description}</span>
        </Text>
      )}
      {errorMessage && (
        <FieldError className="label">
          <span className="label-text-alt text-error">{errorMessage}</span>
        </FieldError>
      )}
    </AriaTextField>
  )
}
