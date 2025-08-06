# Dialog Component

## Overview

The Dialog component provides accessible modal dialogs, alerts, and confirmations using React Aria and DaisyUI styling. It includes three main components that work together: `DialogTrigger`, `DialogOverlay`, and `Dialog`.

## Features

- ✅ Fully accessible with ARIA attributes and keyboard navigation
- ✅ Support for all DaisyUI dialog variants and states
- ✅ TypeScript support with proper type definitions
- ✅ Comprehensive test coverage
- ✅ Focus management and trap
- ✅ Backdrop click to close (configurable)
- ✅ Escape key to close
- ✅ Responsive design support

## Usage

### Basic Dialog

```tsx
import { Dialog, DialogTrigger, DialogOverlay, Button } from 'react-daisyui'

function BasicDialog() {
  return (
    <DialogTrigger>
      <Button>Open Dialog</Button>
      <DialogOverlay>
        <Dialog>
          <h2>Dialog Title</h2>
          <p>This is a basic dialog with DaisyUI styling.</p>
          <div className="modal-action">
            <Button variant="ghost">Cancel</Button>
            <Button variant="primary">Confirm</Button>
          </div>
        </Dialog>
      </DialogOverlay>
    </DialogTrigger>
  )
}
```

### Dialog with Different Sizes

```tsx
function SizedDialogs() {
  return (
    <>
      <DialogTrigger>
        <Button>Small Dialog</Button>
        <DialogOverlay>
          <Dialog size="sm">
            <h3>Small Dialog</h3>
            <p>This is a small dialog.</p>
          </Dialog>
        </DialogOverlay>
      </DialogTrigger>

      <DialogTrigger>
        <Button>Large Dialog</Button>
        <DialogOverlay>
          <Dialog size="lg">
            <h3>Large Dialog</h3>
            <p>This is a large dialog with more content space.</p>
          </Dialog>
        </DialogOverlay>
      </DialogTrigger>
    </>
  )
}
```

### Responsive Dialog

```tsx
function ResponsiveDialog() {
  return (
    <DialogTrigger>
      <Button>Responsive Dialog</Button>
      <DialogOverlay responsive>
        <Dialog responsive>
          <h2>Responsive Dialog</h2>
          <p>This dialog adapts to mobile screens.</p>
          <div className="modal-action">
            <Button>Close</Button>
          </div>
        </Dialog>
      </DialogOverlay>
    </DialogTrigger>
  )
}
```

### Dialog without Backdrop Close

```tsx
function PersistentDialog() {
  return (
    <DialogTrigger>
      <Button>Persistent Dialog</Button>
      <DialogOverlay backdrop={false}>
        <Dialog>
          <h2>Persistent Dialog</h2>
          <p>This dialog can only be closed via buttons or Escape key.</p>
          <div className="modal-action">
            <form method="dialog">
              <Button type="submit">Close Dialog</Button>
            </form>
          </div>
        </Dialog>
      </DialogOverlay>
    </DialogTrigger>
  )
}
```

## Props

### DialogTrigger Props

| Prop     | Type      | Default | Description                            |
| -------- | --------- | ------- | -------------------------------------- |
| children | ReactNode | -       | The trigger element and dialog content |

### DialogOverlay Props

| Prop       | Type      | Default | Description                             |
| ---------- | --------- | ------- | --------------------------------------- |
| children   | ReactNode | -       | The dialog content                      |
| className  | string    | -       | Additional CSS classes                  |
| backdrop   | boolean   | true    | Whether clicking backdrop closes dialog |
| responsive | boolean   | false   | Whether dialog is responsive on mobile  |

### Dialog Props

| Prop       | Type                         | Default | Description                            |
| ---------- | ---------------------------- | ------- | -------------------------------------- |
| children   | ReactNode                    | -       | The content inside the dialog          |
| className  | string                       | -       | Additional CSS classes                 |
| size       | 'sm' \| 'md' \| 'lg' \| 'xl' | 'md'    | The size of the dialog                 |
| responsive | boolean                      | false   | Whether dialog is responsive on mobile |

## Accessibility

- Uses proper ARIA roles (`dialog`)
- Manages focus properly with focus trap
- Supports keyboard navigation (Tab, Escape)
- Compatible with screen readers
- Follows WCAG accessibility guidelines

## DaisyUI Classes Used

- `modal` - Base modal overlay class
- `modal-open` - Opens the modal
- `modal-box` - Dialog container styling
- `modal-action` - Action buttons container
- `modal-bottom` - Mobile bottom positioning (responsive)
- `sm:modal-middle` - Desktop center positioning (responsive)

## Examples

The Dialog component is perfect for:

- Confirmation dialogs
- Form modals
- Alert messages
- Settings panels
- Content previews
