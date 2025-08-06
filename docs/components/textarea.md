# TextArea Component

## Overview

The TextArea component provides an accessible multi-line text input field built on React Aria Components with DaisyUI styling. It follows DaisyUI design standards while leveraging React Aria's accessibility features.

## Features

- ✅ Fully accessible with ARIA attributes and keyboard navigation
- ✅ Support for all DaisyUI textarea variants and modifiers
- ✅ TypeScript support with comprehensive type definitions
- ✅ Controlled and uncontrolled component patterns
- ✅ Label, description, and error message support
- ✅ Complete size and variant customization

## Usage

```tsx
import { TextArea } from 'react-daisyui'

// Basic usage
<TextArea label="Comment" placeholder="Enter your comment..." />

// With variant and size
<TextArea 
  label="Feedback" 
  variant="primary" 
  size="lg"
  placeholder="Share your feedback"
  rows={5}
/>

// With description and error handling
<TextArea 
  label="Message"
  description="Please provide detailed information"
  errorMessage="This field is required"
  isInvalid={hasError}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | The content to display as the label |
| `description` | `string` | - | The content to display as help text |
| `errorMessage` | `string` | - | The content to display as an error message |
| `className` | `string` | - | Additional CSS classes to apply to the textarea |
| `wrapperClassName` | `string` | - | Additional CSS classes to apply to the wrapper |
| `variant` | `'primary' \| 'secondary' \| 'accent' \| 'info' \| 'success' \| 'warning' \| 'error'` | - | The textarea variant that determines its styling |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | The size of the textarea |
| `bordered` | `boolean` | `true` | Whether to use bordered style |
| `ghost` | `boolean` | `false` | Whether to use ghost style |
| `placeholder` | `string` | - | Placeholder text for the textarea |
| `rows` | `number` | - | Number of visible text lines for the textarea |
| `cols` | `number` | - | Number of visible character widths for the textarea |
| `isInvalid` | `boolean` | `false` | Whether the input value is invalid |
| `isDisabled` | `boolean` | `false` | Whether the textarea is disabled |
| `isReadOnly` | `boolean` | `false` | Whether the textarea is read-only |
| `isRequired` | `boolean` | `false` | Whether the textarea is required |

## Variants

The TextArea component supports all DaisyUI color variants:

- `primary` - Primary theme color
- `secondary` - Secondary theme color  
- `accent` - Accent theme color
- `info` - Info/blue color
- `success` - Success/green color
- `warning` - Warning/yellow color
- `error` - Error/red color

## Sizes

- `xs` - Extra small textarea
- `sm` - Small textarea
- `md` - Medium textarea (default)
- `lg` - Large textarea

## Modifiers

- `bordered` - Adds border styling (default: true)
- `ghost` - Removes border and adds background color

## Accessibility

The TextArea component includes comprehensive accessibility features:

- **ARIA Attributes**: Proper `aria-invalid`, `aria-describedby`, and role attributes
- **Keyboard Navigation**: Full keyboard support for focus and interaction
- **Screen Reader Support**: Labels, descriptions, and error messages are properly associated
- **Focus Management**: Proper focus indicators and management

## Examples

### Basic TextArea
```tsx
<TextArea 
  label="Comment" 
  placeholder="Enter your comment..." 
  rows={4}
/>
```

### Styled Variants
```tsx
// Primary variant
<TextArea 
  label="Primary TextArea" 
  variant="primary"
  placeholder="Primary styled textarea"
/>

// Success variant  
<TextArea 
  label="Success TextArea"
  variant="success" 
  placeholder="Success variant textarea"
/>

// Error variant
<TextArea 
  label="Error TextArea"
  variant="error"
  placeholder="Error variant textarea"
/>
```

### Different Sizes
```tsx
// Small size
<TextArea 
  label="Small TextArea" 
  size="sm"
  rows={3}
/>

// Large size
<TextArea 
  label="Large TextArea"
  size="lg" 
  rows={5}
/>
```

### Ghost Style
```tsx
<TextArea 
  label="Ghost TextArea"
  ghost
  placeholder="Ghost styled textarea"
/>
```

### With Description and Error
```tsx
<TextArea 
  label="Feedback"
  description="Please provide detailed feedback"
  errorMessage={error ? "This field is required" : undefined}
  isInvalid={!!error}
  placeholder="Enter your feedback"
/>
```

### Controlled Component
```tsx
const [value, setValue] = useState('')

<TextArea 
  label="Controlled TextArea"
  value={value}
  onChange={setValue}
  placeholder="Type something..."
/>
```

## Integration with React Aria

The TextArea component is built on React Aria Components, providing:

- Full accessibility compliance
- Robust keyboard navigation
- Screen reader compatibility
- Focus management
- Form integration
- Validation support

## DaisyUI Classes Used

The component uses the following DaisyUI classes:

- Base: `textarea`
- Variants: `textarea-primary`, `textarea-secondary`, `textarea-accent`, etc.
- Sizes: `textarea-xs`, `textarea-sm`, `textarea-lg`
- Modifiers: `textarea-bordered`, `textarea-ghost`
- Layout: `form-control`, `label`, `label-text`, `label-text-alt`