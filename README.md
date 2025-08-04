# React DaisyUI Component Library

A React component library built with DaisyUI and Tailwind CSS, providing beautiful and accessible UI components.

## Features

- 🎨 Built with DaisyUI and Tailwind CSS
- 📦 TypeScript support
- 🧪 Comprehensive testing with Vitest and Jest
- 📚 Well-documented components
- 🎯 Tree-shakable
- 🔧 Highly customizable

## Installation

```bash
npm install react-daisyui
```

## Usage

```tsx
import { Button, Card, Modal } from 'react-daisyui'
import 'react-daisyui/dist/style.css'

function App() {
  return (
    <div>
      <Button variant="primary" size="lg">
        Click me
      </Button>

      <Card>
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <p>Card content goes here</p>
          <Card.Actions>
            <Button variant="primary">Action</Button>
          </Card.Actions>
        </Card.Body>
      </Card>
    </div>
  )
}
```

## Components

### Button

```tsx
<Button variant="primary" size="md" outline loading onClick={() => console.log('Clicked!')}>
  Click me
</Button>
```

### Card

```tsx
<Card bordered shadow="lg">
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <p>Some content</p>
    <Card.Actions justify="end">
      <Button>Action</Button>
    </Card.Actions>
  </Card.Body>
</Card>
```

### Modal

```tsx
<Modal open={isOpen} onClose={() => setIsOpen(false)}>
  <Modal.Box>
    <h3>Modal Title</h3>
    <p>Modal content</p>
    <Modal.Action>
      <Button onClick={() => setIsOpen(false)}>Close</Button>
    </Modal.Action>
  </Modal.Box>
</Modal>
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build library
npm run build

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Type checking
npm run typecheck

# Lint code
npm run lint
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

ISC License - see LICENSE file for details.
