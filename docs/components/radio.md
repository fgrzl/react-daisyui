# Radio Component

## Overview

The Radio component provides accessible radio button functionality with DaisyUI styling. Radio buttons allow users to select one option from a group of choices. The Radio component should be used within a RadioGroup component to ensure proper accessibility and behavior.

## Usage

```tsx
import { Radio, RadioGroup } from 'react-daisyui'

function MyForm() {
  const [selectedOption, setSelectedOption] = useState('option1')

  return (
    <RadioGroup value={selectedOption} onChange={setSelectedOption} label="Choose an option">
      <Radio value="option1">Option 1</Radio>
      <Radio value="option2">Option 2</Radio>
      <Radio value="option3">Option 3</Radio>
    </RadioGroup>
  )
}
```

## Props

### Radio Props

| Prop      | Type                                                                         | Default | Description                           |
| --------- | ---------------------------------------------------------------------------- | ------- | ------------------------------------- |
| children  | `React.ReactNode`                                                            | -       | The label content for the radio      |
| className | `string`                                                                     | -       | Additional CSS classes                |
| variant   | `'primary' \| 'secondary' \| 'accent' \| 'success' \| 'warning' \| 'info' \| 'error'` | -       | The radio button variant              |
| size      | `'xs' \| 'sm' \| 'md' \| 'lg'`                                               | `'md'`  | The size of the radio button          |
| disabled  | `boolean`                                                                    | `false` | Whether the radio button is disabled  |
| value     | `string`                                                                     | -       | The value of the radio button         |

### RadioGroup Props

| Prop         | Type                                    | Default      | Description                                         |
| ------------ | --------------------------------------- | ------------ | --------------------------------------------------- |
| children     | `React.ReactNode`                       | -            | The radio buttons to display within the group      |
| className    | `string`                                | -            | Additional CSS classes                              |
| label        | `string`                                | -            | The label for the radio group                      |
| description  | `string`                                | -            | A description for the radio group                  |
| errorMessage | `string`                                | -            | An error message to display if validation fails    |
| orientation  | `'vertical' \| 'horizontal'`            | `'vertical'` | The layout orientation of the radio buttons        |
| isRequired   | `boolean`                               | `false`      | Whether the radio group is required                |
| isDisabled   | `boolean`                               | `false`      | Whether the entire radio group is disabled         |
| value        | `string`                                | -            | The currently selected value                        |
| onChange     | `(value: string) => void`               | -            | Callback fired when the selection changes          |

## Accessibility

The Radio components provide full accessibility support:

- **Keyboard Navigation**: Use arrow keys to navigate between radio buttons within a group
- **Screen Reader Support**: Proper labeling and grouping for screen readers
- **Focus Management**: Visual focus indicators and proper tab order
- **ARIA Attributes**: Includes proper `role`, `aria-checked`, and `aria-labelledby` attributes

## Examples

### Basic Usage

```tsx
<RadioGroup label="Select your favorite color">
  <Radio value="red">Red</Radio>
  <Radio value="blue">Blue</Radio>
  <Radio value="green">Green</Radio>
</RadioGroup>
```

### With Variants

```tsx
<RadioGroup label="Priority Level">
  <Radio value="low" variant="success">Low Priority</Radio>
  <Radio value="medium" variant="warning">Medium Priority</Radio>
  <Radio value="high" variant="error">High Priority</Radio>
</RadioGroup>
```

### Different Sizes

```tsx
<RadioGroup label="Select Size">
  <Radio value="xs" size="xs">Extra Small</Radio>
  <Radio value="sm" size="sm">Small</Radio>
  <Radio value="md" size="md">Medium</Radio>
  <Radio value="lg" size="lg">Large</Radio>
</RadioGroup>
```

### Horizontal Layout

```tsx
<RadioGroup orientation="horizontal" label="Choose layout">
  <Radio value="grid">Grid View</Radio>
  <Radio value="list">List View</Radio>
  <Radio value="card">Card View</Radio>
</RadioGroup>
```

### With Description and Error

```tsx
<RadioGroup 
  label="Payment Method" 
  description="Select your preferred payment method"
  errorMessage="Please select a payment method"
  isRequired
>
  <Radio value="card">Credit Card</Radio>
  <Radio value="paypal">PayPal</Radio>
  <Radio value="bank">Bank Transfer</Radio>
</RadioGroup>
```

### Disabled State

```tsx
<RadioGroup label="Disabled Group" isDisabled>
  <Radio value="option1">Option 1</Radio>
  <Radio value="option2">Option 2</Radio>
</RadioGroup>
```

### Controlled Component

```tsx
function ControlledRadio() {
  const [value, setValue] = useState('option1')
  
  return (
    <RadioGroup 
      value={value} 
      onChange={setValue}
      label="Controlled Radio Group"
    >
      <Radio value="option1">Option 1</Radio>
      <Radio value="option2">Option 2</Radio>
      <Radio value="option3">Option 3</Radio>
    </RadioGroup>
  )
}
```

## DaisyUI Classes

The Radio component uses the following DaisyUI classes:

- `radio` - Base radio button styling
- `radio-primary`, `radio-secondary`, etc. - Variant colors
- `radio-xs`, `radio-sm`, `radio-lg` - Size variations
- `form-control` - Container styling
- `label`, `label-text` - Label styling

## Implementation Notes

- The Radio component uses React Aria Components for accessibility
- DaisyUI classes are applied to the visual radio element while React Aria handles the actual input
- Radio buttons must be used within a RadioGroup for proper functionality
- The component follows the established patterns from other components in this library