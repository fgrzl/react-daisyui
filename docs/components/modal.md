# Modal Component

The Modal component provides a flexible way to display overlays, dialogs, and popup content.

## Import

```tsx
import { Modal } from 'react-daisyui'
```

## Usage

### Basic Modal

```tsx
import React, { useState } from 'react'
import { Modal, Button } from 'react-daisyui'

function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Box>
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">This is a simple modal example.</p>
          <Modal.Action>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </Modal.Action>
        </Modal.Box>
      </Modal>
    </>
  )
}
```

### Confirmation Modal

```tsx
<Modal isOpen={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
  <Modal.Box>
    <h3 className="font-bold text-lg">Confirm Action</h3>
    <p className="py-4">Are you sure you want to delete this item?</p>
    <Modal.Action>
      <Button variant="ghost" onClick={() => setIsConfirmOpen(false)}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleConfirm}>
        Confirm
      </Button>
    </Modal.Action>
  </Modal.Box>
</Modal>
```

### Form Modal

```tsx
<Modal isOpen={isFormOpen} onOpenChange={setIsFormOpen}>
  <Modal.Box>
    <h3 className="font-bold text-lg">Add New Item</h3>
    <form className="py-4 space-y-4">
      <div>
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input type="text" className="input input-bordered w-full" placeholder="Enter name" />
      </div>
      <div>
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <textarea className="textarea textarea-bordered w-full" placeholder="Enter description" />
      </div>
    </form>
    <Modal.Action>
      <Button variant="ghost" onClick={() => setIsFormOpen(false)}>
        Cancel
      </Button>
      <Button variant="primary" onClick={handleSubmit}>
        Save
      </Button>
    </Modal.Action>
  </Modal.Box>
</Modal>
```

### Responsive Modal

```tsx
<Modal isOpen={isResponsiveOpen} onOpenChange={setIsResponsiveOpen} responsive>
  <Modal.Box>
    <h3 className="font-bold text-lg">Responsive Modal</h3>
    <p className="py-4">
      This modal is responsive - it appears at the bottom on mobile and centered on larger screens.
    </p>
    <Modal.Action>
      <Button onClick={() => setIsResponsiveOpen(false)}>Close</Button>
    </Modal.Action>
  </Modal.Box>
</Modal>
```

### Modal without Backdrop Close

```tsx
<Modal isOpen={isNoBackdropOpen} onOpenChange={setIsNoBackdropOpen} backdrop={false}>
  <Modal.Box>
    <h3 className="font-bold text-lg">No Backdrop Close</h3>
    <p className="py-4">This modal won't close when clicking outside of it.</p>
    <Modal.Action>
      <Button onClick={() => setIsNoBackdropOpen(false)}>Close</Button>
    </Modal.Action>
  </Modal.Box>
</Modal>
```

### Modal with Custom Position

```tsx
<Modal isOpen={isTopOpen} onOpenChange={setIsTopOpen} position="top">
  <Modal.Box>
    <h3 className="font-bold text-lg">Top Modal</h3>
    <p className="py-4">This modal appears at the top of the screen.</p>
    <Modal.Action>
      <Button onClick={() => setIsTopOpen(false)}>Close</Button>
    </Modal.Action>
  </Modal.Box>
</Modal>

<Modal isOpen={isBottomOpen} onOpenChange={setIsBottomOpen} position="bottom">
  <Modal.Box>
    <h3 className="font-bold text-lg">Bottom Modal</h3>
    <p className="py-4">This modal appears at the bottom of the screen.</p>
    <Modal.Action>
      <Button onClick={() => setIsBottomOpen(false)}>Close</Button>
    </Modal.Action>
  </Modal.Box>
</Modal>
```

## Sub-components

### Modal.Box

Container for the modal content with proper styling and padding.

```tsx
<Modal.Box>
  <h3>Modal Title</h3>
  <p>Modal content</p>
</Modal.Box>
```

### Modal.Action

Container for action buttons, typically placed at the bottom of the modal.

```tsx
<Modal.Action justify="end">
  <Button variant="ghost">Cancel</Button>
  <Button variant="primary">Confirm</Button>
</Modal.Action>

<Modal.Action justify="center">
  <Button>Center Action</Button>
</Modal.Action>

<Modal.Action justify="start">
  <Button>Left Action</Button>
</Modal.Action>
```

## Props

### Modal Props

| Prop         | Type                              | Default    | Description                                                      |
| ------------ | --------------------------------- | ---------- | ---------------------------------------------------------------- |
| `isOpen`     | `boolean`                         | `false`    | Controls modal visibility                                        |
| `onOpenChange` | `(isOpen: boolean) => void`     | -          | Callback when modal should open/close                           |
| `backdrop`   | `boolean`                         | `true`     | Whether clicking backdrop closes modal                           |
| `responsive` | `boolean`                         | `false`    | Makes modal responsive (bottom on mobile, middle on larger screens) |
| `position`   | `'top' \| 'middle' \| 'bottom'`   | `'middle'` | Vertical position of modal (ignored when responsive is true)    |
| `className`  | `string`                          | -          | Additional CSS classes                                           |
| `children`   | `ReactNode`                       | -          | Modal content                                                    |

### Modal.Action Props

| Prop        | Type                           | Default | Description            |
| ----------- | ------------------------------ | ------- | ---------------------- |
| `justify`   | `'start' \| 'center' \| 'end'` | `'end'` | Actions alignment      |
| `className` | `string`                       | -       | Additional CSS classes |
| `children`  | `ReactNode`                    | -       | Action elements        |

## Examples

### Complete Modal with Form

```tsx
import React, { useState } from 'react'
import { Modal, Button } from 'react-daisyui'

function UserModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
  })

  const handleSubmit = () => {
    console.log('Submitting:', formData)
    // Handle form submission
    setIsOpen(false)
    setFormData({ name: '', email: '', role: 'user' })
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <>
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        Add User
      </Button>

      <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
        <Modal.Box className="max-w-md">
          <h3 className="font-bold text-lg mb-4">Add New User</h3>

          <div className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input input-bordered w-full"
                placeholder="Enter email address"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Role</span>
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="select select-bordered w-full"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
              </select>
            </div>
          </div>

          <Modal.Action className="mt-6">
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={!formData.name || !formData.email}
            >
              Add User
            </Button>
          </Modal.Action>
        </Modal.Box>
      </Modal>
    </>
  )
}
```

### Accessibility

The Modal component automatically handles:

- Focus management (traps focus within modal)
- Escape key to close
- ARIA attributes for screen readers
- Proper backdrop behavior
- Focus restoration when closed

### Keyboard Navigation

- **Escape**: Closes the modal (if onClose is provided)
- **Tab**: Cycles through focusable elements within the modal
- **Enter/Space**: Activates buttons and interactive elements
