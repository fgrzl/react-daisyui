# Checkbox Component

The Checkbox component is an accessible form control built with React Aria and styled with DaisyUI classes. It provides comprehensive support for all DaisyUI checkbox variants and maintains full accessibility compliance.

## Import

```tsx
import { Checkbox } from 'react-daisyui'
```

## Usage

### Basic Checkbox

```tsx
<Checkbox>Accept terms and conditions</Checkbox>
```

### Checkbox Variants

```tsx
<Checkbox variant="primary">Primary Checkbox</Checkbox>
<Checkbox variant="secondary">Secondary Checkbox</Checkbox>
<Checkbox variant="accent">Accent Checkbox</Checkbox>
<Checkbox variant="neutral">Neutral Checkbox</Checkbox>
<Checkbox variant="info">Info Checkbox</Checkbox>
<Checkbox variant="success">Success Checkbox</Checkbox>
<Checkbox variant="warning">Warning Checkbox</Checkbox>
<Checkbox variant="error">Error Checkbox</Checkbox>
```

### Checkbox Sizes

```tsx
<Checkbox size="xs">Extra Small</Checkbox>
<Checkbox size="sm">Small</Checkbox>
<Checkbox size="md">Medium (default)</Checkbox>
<Checkbox size="lg">Large</Checkbox>
```

### Controlled Checkbox

```tsx
const [isChecked, setIsChecked] = useState(false)

<Checkbox
  isSelected={isChecked}
  onChange={setIsChecked}
>
  Controlled checkbox
</Checkbox>
```

### Disabled Checkbox

```tsx
<Checkbox isDisabled>Disabled checkbox</Checkbox>
<Checkbox isDisabled isSelected>Disabled checked</Checkbox>
```

### Indeterminate State

```tsx
<Checkbox isIndeterminate>Indeterminate checkbox</Checkbox>
```

### Checkbox without Label

```tsx
<Checkbox aria-label="Agree to terms" />
```

### Form Integration

```tsx
<form>
  <Checkbox name="newsletter" value="subscribe">
    Subscribe to newsletter
  </Checkbox>
  <Checkbox name="terms" value="accepted" required>
    I agree to the terms of service *
  </Checkbox>
</form>
```

## Props

| Prop              | Type                                                                                               | Default | Description                                    |
| ----------------- | -------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------------- |
| `variant`         | `'primary' \| 'secondary' \| 'accent' \| 'neutral' \| 'info' \| 'success' \| 'warning' \| 'error'` | -       | Checkbox color variant                         |
| `size`            | `'xs' \| 'sm' \| 'md' \| 'lg'`                                                                     | `'md'`  | Checkbox size                                  |
| `isSelected`      | `boolean`                                                                                          | -       | Whether the checkbox is checked (controlled)   |
| `isDisabled`      | `boolean`                                                                                          | `false` | Whether the checkbox is disabled               |
| `isIndeterminate` | `boolean`                                                                                          | `false` | Whether the checkbox is in indeterminate state |
| `onChange`        | `(isSelected: boolean) => void`                                                                    | -       | Callback fired when checkbox state changes     |
| `children`        | `ReactNode`                                                                                        | -       | Checkbox label content                         |
| `className`       | `string`                                                                                           | -       | Additional CSS classes                         |
| `name`            | `string`                                                                                           | -       | Form field name                                |
| `value`           | `string`                                                                                           | -       | Form field value                               |
| `required`        | `boolean`                                                                                          | `false` | Whether the checkbox is required               |

_Inherits all props from React Aria's [CheckboxProps](https://react-spectrum.adobe.com/react-aria/Checkbox.html#props)_

## Examples

### Form with Multiple Checkboxes

```tsx
import React, { useState } from 'react'
import { Checkbox } from 'react-daisyui'

function PreferencesForm() {
  const [preferences, setPreferences] = useState({
    newsletter: false,
    notifications: true,
    marketing: false,
  })

  const handleChange = (key: keyof typeof preferences) => (isSelected: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: isSelected }))
  }

  return (
    <form className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Email Preferences</h3>

        <Checkbox
          variant="primary"
          isSelected={preferences.newsletter}
          onChange={handleChange('newsletter')}
        >
          Newsletter subscription
        </Checkbox>

        <Checkbox
          variant="info"
          isSelected={preferences.notifications}
          onChange={handleChange('notifications')}
        >
          Important notifications
        </Checkbox>

        <Checkbox
          variant="warning"
          isSelected={preferences.marketing}
          onChange={handleChange('marketing')}
        >
          Marketing emails
        </Checkbox>
      </div>
    </form>
  )
}
```

### Checkbox Group with Select All

```tsx
import React, { useState, useMemo } from 'react'
import { Checkbox } from 'react-daisyui'

function CheckboxGroup() {
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', checked: false },
    { id: 2, name: 'Item 2', checked: false },
    { id: 3, name: 'Item 3', checked: false },
  ])

  const allSelected = useMemo(() => items.every(item => item.checked), [items])

  const someSelected = useMemo(() => items.some(item => item.checked), [items])

  const handleSelectAll = (isSelected: boolean) => {
    setItems(prev => prev.map(item => ({ ...item, checked: isSelected })))
  }

  const handleItemChange = (id: number) => (isSelected: boolean) => {
    setItems(prev => prev.map(item => (item.id === id ? { ...item, checked: isSelected } : item)))
  }

  return (
    <div className="space-y-2">
      <Checkbox
        variant="primary"
        isSelected={allSelected}
        isIndeterminate={someSelected && !allSelected}
        onChange={handleSelectAll}
      >
        Select All
      </Checkbox>

      <div className="ml-6 space-y-1">
        {items.map(item => (
          <Checkbox
            key={item.id}
            variant="secondary"
            size="sm"
            isSelected={item.checked}
            onChange={handleItemChange(item.id)}
          >
            {item.name}
          </Checkbox>
        ))}
      </div>
    </div>
  )
}
```

### Different Sizes and Variants

```tsx
<div className="space-y-4">
  <div className="space-x-4">
    <Checkbox size="xs" variant="primary">
      Extra Small
    </Checkbox>
    <Checkbox size="sm" variant="secondary">
      Small
    </Checkbox>
    <Checkbox size="md" variant="accent">
      Medium
    </Checkbox>
    <Checkbox size="lg" variant="success">
      Large
    </Checkbox>
  </div>

  <div className="space-x-4">
    <Checkbox variant="info">Info</Checkbox>
    <Checkbox variant="warning">Warning</Checkbox>
    <Checkbox variant="error">Error</Checkbox>
    <Checkbox variant="neutral">Neutral</Checkbox>
  </div>
</div>
```

## Accessibility

The Checkbox component provides comprehensive accessibility features:

### Keyboard Navigation

- **Space**: Toggle checkbox state
- **Enter**: Toggle checkbox state (when focused)
- **Tab**: Navigate to next focusable element
- **Shift + Tab**: Navigate to previous focusable element

### Screen Reader Support

- Proper ARIA attributes for state communication
- Support for `aria-label`, `aria-labelledby`, and `aria-describedby`
- Automatic announcement of state changes
- Indeterminate state properly communicated

### Focus Management

- Clear focus indicators
- Proper focus order in tab sequence
- Focus remains on checkbox after state changes

### Example with Accessibility Attributes

```tsx
<div>
  <Checkbox aria-describedby="newsletter-description" variant="primary">
    Newsletter subscription
  </Checkbox>
  <p id="newsletter-description" className="text-sm text-gray-500">
    Receive weekly updates about new features and products.
  </p>
</div>
```

## Styling

The Checkbox component uses DaisyUI's checkbox classes and can be customized using Tailwind CSS utilities:

```tsx
<Checkbox className="hover:scale-105 transition-transform" variant="primary">
  Custom styled checkbox
</Checkbox>
```

### CSS Classes Applied

- Base: `checkbox`
- Variants: `checkbox-primary`, `checkbox-secondary`, etc.
- Sizes: `checkbox-xs`, `checkbox-sm`, `checkbox-lg` (md has no suffix)

## Browser Support

The Checkbox component supports all modern browsers and provides graceful degradation for older browsers through React Aria's comprehensive browser compatibility layer.

## Related Components

- **Button**: For action triggers
- **RadioGroup**: For single selection from multiple options
- **Form Controls**: For building complete forms
