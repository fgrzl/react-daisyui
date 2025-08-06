import {
  TextField as AriaTextField,
  Label,
  TextArea as AriaTextArea,
  Text,
  FieldError,
  type TextFieldProps as AriaTextFieldProps,
} from 'react-aria-components'
import { cn } from '@/utils/cn'

export interface TextAreaProps extends AriaTextFieldProps {
  /** The content to display as the label */
  label?: string
  /** The content to display as help text */
  description?: string
  /** The content to display as an error message */
  errorMessage?: string
  /** Additional CSS classes to apply to the textarea */
  className?: string
  /** Additional CSS classes to apply to the wrapper */
  wrapperClassName?: string
  /** The textarea variant that determines its styling */
  variant?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'
  /** The size of the textarea */
  size?: 'xs' | 'sm' | 'md' | 'lg'
  /** Whether to use bordered style (default: true) */
  bordered?: boolean
  /** Whether to use ghost style */
  ghost?: boolean
  /** Placeholder text for the textarea */
  placeholder?: string
  /** Number of visible text lines for the textarea */
  rows?: number
  /** Number of visible character widths for the textarea */
  cols?: number
}

/**
 * TextArea component built on React Aria Components with DaisyUI styling.
 *
 * Provides an accessible multi-line text input field with label, description, and error message support.
 * Follows DaisyUI design standards while leveraging React Aria's accessibility features.
 *
 * @param props - The props for the TextArea component
 * @param props.label - The content to display as the label
 * @param props.description - The content to display as help text
 * @param props.errorMessage - The content to display as an error message
 * @param props.className - Additional CSS classes to apply to the textarea
 * @param props.wrapperClassName - Additional CSS classes to apply to the wrapper
 * @param props.variant - The textarea variant that determines its styling
 * @param props.size - The size of the textarea
 * @param props.bordered - Whether to use bordered style (default: true)
 * @param props.ghost - Whether to use ghost style
 * @param props.placeholder - Placeholder text for the textarea
 * @param props.rows - Number of visible text lines for the textarea
 * @param props.cols - Number of visible character widths for the textarea
 */
export default function TextArea({
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
  rows,
  cols,
  isInvalid,
  ...props
}: TextAreaProps) {
  const baseClasses = 'textarea'

  const variantClasses = {
    primary: 'textarea-primary',
    secondary: 'textarea-secondary',
    accent: 'textarea-accent',
    info: 'textarea-info',
    success: 'textarea-success',
    warning: 'textarea-warning',
    error: 'textarea-error',
  } as const

  const sizeClasses = {
    xs: 'textarea-xs',
    sm: 'textarea-sm',
    md: '',
    lg: 'textarea-lg',
  } as const

  const modifierClasses = [bordered && !ghost && 'textarea-bordered', ghost && 'textarea-ghost'].filter(
    Boolean
  )

  const textareaClasses = cn(
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
      <AriaTextArea className={textareaClasses} placeholder={placeholder} rows={rows} cols={cols} />
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