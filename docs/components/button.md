# Button Component

The Button component is a versatile and customizable button element built with DaisyUI classes.

## Import

```tsx
import { Button } from 'react-daisyui'
```

## Usage

### Basic Button

```tsx
<Button>Click me</Button>
```

### Button Variants

```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="accent">Accent</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

### Button Sizes

```tsx
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium (default)</Button>
<Button size="lg">Large</Button>
```

### Outline Buttons

```tsx
<Button variant="primary" outline>Primary Outline</Button>
<Button variant="secondary" outline>Secondary Outline</Button>
```

### Loading State

```tsx
<Button loading>Loading...</Button>
<Button loading variant="primary">Processing</Button>
```

### Button Modifiers

```tsx
<Button wide>Wide Button</Button>
<Button block>Block Button</Button>
<Button circle>○</Button>
<Button square>□</Button>
<Button glass>Glass Effect</Button>
<Button active>Active State</Button>
```

### Disabled Button

```tsx
<Button isDisabled>Disabled Button</Button>
```

### Custom Event Handlers

```tsx
<Button onPress={() => console.log('Button pressed!')}>Click me</Button>
```

## Props

| Prop         | Type                                                                                                                    | Default     | Description                               |
| ------------ | ----------------------------------------------------------------------------------------------------------------------- | ----------- | ----------------------------------------- |
| `variant`    | `'primary' \| 'secondary' \| 'accent' \| 'ghost' \| 'link' \| 'neutral' \| 'info' \| 'success' \| 'warning' \| 'error'` | `undefined` | Button color variant                      |
| `size`       | `'xs' \| 'sm' \| 'md' \| 'lg'`                                                                                          | `undefined` | Button size                               |
| `outline`    | `boolean`                                                                                                               | `false`     | Whether to use outline style              |
| `loading`    | `boolean`                                                                                                               | `false`     | Shows loading spinner and disables button |
| `wide`       | `boolean`                                                                                                               | `false`     | Makes button wider                        |
| `block`      | `boolean`                                                                                                               | `false`     | Makes button full width                   |
| `circle`     | `boolean`                                                                                                               | `false`     | Makes button circular                     |
| `square`     | `boolean`                                                                                                               | `false`     | Makes button square                       |
| `glass`      | `boolean`                                                                                                               | `false`     | Applies glass effect                      |
| `active`     | `boolean`                                                                                                               | `false`     | Sets button to active state               |
| `isDisabled` | `boolean`                                                                                                               | `false`     | Disables the button                       |
| `className`  | `string`                                                                                                                | -           | Additional CSS classes                    |
| `children`   | `ReactNode`                                                                                                             | -           | Button content                            |

## Examples

### Complete Example

```tsx
import React, { useState } from 'react'
import { Button } from 'react-daisyui'

function App() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setLoading(false)
  }

  return (
    <div className="space-x-2">
      <Button variant="primary" onPress={handleSubmit} loading={loading}>
        {loading ? 'Processing...' : 'Submit'}
      </Button>

      <Button variant="secondary" outline>
        Cancel
      </Button>

      <Button variant="ghost" size="sm">
        Help
      </Button>
    </div>
  )
}
```

### Accessibility

The Button component automatically handles:

- Focus management
- Keyboard navigation (Enter and Space keys)
- ARIA attributes for loading state
- Proper disabled state handling

### Styling

The Button component uses DaisyUI's button classes and can be customized using Tailwind CSS utilities:

```tsx
<Button className="hover:scale-105 transition-transform">Hover Effect</Button>
```
