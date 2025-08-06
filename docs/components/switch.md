# Switch Component

The Switch component is an accessible toggle control built with React Aria and styled with DaisyUI classes. It provides comprehensive support for all DaisyUI toggle variants and maintains full accessibility compliance.

## Import

```tsx
import { Switch } from 'react-daisyui'
```

## Usage

### Basic Switch

```tsx
<Switch>Enable notifications</Switch>
```

### Switch Variants

```tsx
<Switch variant="primary">Primary Switch</Switch>
<Switch variant="secondary">Secondary Switch</Switch>
<Switch variant="accent">Accent Switch</Switch>
<Switch variant="neutral">Neutral Switch</Switch>
<Switch variant="info">Info Switch</Switch>
<Switch variant="success">Success Switch</Switch>
<Switch variant="warning">Warning Switch</Switch>
<Switch variant="error">Error Switch</Switch>
```

### Switch Sizes

```tsx
<Switch size="xs">Extra Small</Switch>
<Switch size="sm">Small</Switch>
<Switch size="md">Medium (default)</Switch>
<Switch size="lg">Large</Switch>
```

### Controlled Switch

```tsx
const [isEnabled, setIsEnabled] = useState(false)

<Switch
  isSelected={isEnabled}
  onChange={setIsEnabled}
>
  Controlled switch
</Switch>
```

### Uncontrolled Switch

```tsx
<Switch defaultSelected={true}>
  Uncontrolled switch with default value
</Switch>
```

### Disabled Switch

```tsx
<Switch isDisabled>Disabled switch</Switch>
<Switch isDisabled isSelected={true}>Disabled and selected</Switch>
```

### Switch with Custom Styling

```tsx
<Switch className="my-custom-class" variant="accent" size="lg">
  Custom styled switch
</Switch>
```

### Switch without Label

```tsx
<Switch aria-label="Toggle dark mode" />
```

## Props

| Prop        | Type                                                                                | Default | Description                                    |
| ----------- | ----------------------------------------------------------------------------------- | ------- | ---------------------------------------------- |
| children    | `React.ReactNode`                                                                   | -       | The label content to display next to the switch |
| className   | `string`                                                                            | -       | Additional CSS classes to apply to the switch |
| variant     | `'primary' \| 'secondary' \| 'accent' \| 'neutral' \| 'info' \| 'success' \| 'warning' \| 'error'` | -       | The switch variant that determines its styling |
| size        | `'xs' \| 'sm' \| 'md' \| 'lg'`                                                      | `'md'`  | The size of the switch                         |
| isSelected  | `boolean`                                                                           | -       | Whether the switch is on (controlled)         |
| defaultSelected | `boolean`                                                                       | -       | Whether the switch is on by default (uncontrolled) |
| isDisabled  | `boolean`                                                                           | -       | Whether the switch is disabled                 |
| onChange    | `(isSelected: boolean) => void`                                                     | -       | Callback fired when the switch state changes  |
| ...props    | `SwitchProps` (from React Aria)                                                     | -       | All other React Aria Switch props             |

## Accessibility

The Switch component follows WCAG guidelines and includes:

- **Keyboard Navigation**: Full support for space bar and Enter key activation
- **Screen Reader Support**: Proper ARIA labels and live region announcements
- **Focus Management**: Visible focus indicators and logical tab order
- **State Communication**: Clear indication of current switch state to assistive technologies

### ARIA Attributes

- `role="switch"` - Identifies the element as a switch control
- `aria-checked` - Indicates the current state (true/false)
- `aria-disabled` - Indicates if the switch is disabled
- `aria-label` - Provides an accessible name when no visible label is present
- `aria-describedby` - References additional descriptive text

## Examples

### Form Integration

```tsx
function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)
  
  return (
    <form>
      <div className="space-y-4">
        <Switch
          isSelected={emailNotifications}
          onChange={setEmailNotifications}
          variant="primary"
        >
          Email notifications
        </Switch>
        
        <Switch
          isSelected={pushNotifications}
          onChange={setPushNotifications}
          variant="secondary"
        >
          Push notifications
        </Switch>
      </div>
    </form>
  )
}
```

### Dark Mode Toggle

```tsx
function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false)
  
  return (
    <Switch
      isSelected={isDark}
      onChange={setIsDark}
      variant="accent"
      size="lg"
      aria-label="Toggle dark mode"
    />
  )
}
```

### Settings Panel

```tsx
function SettingsPanel() {
  return (
    <div className="space-y-6">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Privacy Settings</span>
        </label>
        
        <Switch variant="info" size="sm">
          Make profile public
        </Switch>
        
        <Switch variant="warning" size="sm">
          Allow data collection
        </Switch>
        
        <Switch variant="error" size="sm" isDisabled>
          Delete account (unavailable)
        </Switch>
      </div>
    </div>
  )
}
```

## DaisyUI Classes

The Switch component uses the following DaisyUI classes:

- **Base**: `toggle`
- **Variants**: `toggle-primary`, `toggle-secondary`, `toggle-accent`, `toggle-neutral`, `toggle-info`, `toggle-success`, `toggle-warning`, `toggle-error`
- **Sizes**: `toggle-xs`, `toggle-sm`, `toggle-lg` (medium is default with no additional class)

## Best Practices

1. **Always provide a label**: Use either children text or `aria-label` for accessibility
2. **Use controlled state for forms**: Manage switch state with React state when part of form data
3. **Choose appropriate variants**: Use semantic variants (success/error) for status indicators
4. **Consider size context**: Match switch size to the surrounding UI components
5. **Handle disabled state**: Provide clear feedback when switches are disabled
6. **Group related switches**: Use consistent spacing and alignment for multiple switches