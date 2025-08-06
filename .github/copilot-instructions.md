# Copilot Instructions for React DaisyUI

## Project Overview

React DaisyUI is a comprehensive component library built with React and React Aria Components, styled using DaisyUI. The project provides a set of reusable, accessible, and customizable UI components that follow DaisyUI design standards while leveraging React Aria's accessibility features and React's component model.

## Build and Test Instructions

### Build the Project

```bash
npm run build
```

This compiles TypeScript files and generates the production-ready build.

### Run Tests

```bash
npm test
```

This executes all tests using Vitest to ensure components behave as expected.

## Component Implementation Standards

### Gold Standard: Button Component

Use the `Button` component in `src/components/button/button.tsx` as the reference implementation. It demonstrates:

#### 1. **TypeScript Interface Definition**

```tsx
export interface ButtonProps extends AriaButtonProps {
  children?: React.ReactNode
  className?: string
  variant?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'ghost'
    | 'link'
    | 'neutral'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  outline?: boolean
  wide?: boolean
  block?: boolean
  circle?: boolean
  square?: boolean
  glass?: boolean
  loading?: boolean
  active?: boolean
  disabled?: boolean
}
```

#### 2. **Comprehensive JSDoc Documentation**

```tsx
/**
 * Props for the Button component.
 *
 * @property {React.ReactNode} [children] - The content to display inside the button.
 * @property {string} [className] - Additional CSS classes to apply to the button.
 * @property {'primary' | 'secondary' | 'accent' | 'ghost' | 'link'} [variant] - The button variant that determines its styling.
 * @property {'xs' | 'sm' | 'md' | 'lg'} [size] - The size of the button.
 * @property {boolean} [outline] - Whether to use outline style.
 * @property {boolean} [loading] - Whether the button is in loading state.
 */
```

#### 3. **React State Management**

```tsx
const [isPressed, setIsPressed] = useState(false)
```

#### 4. **Dynamic Class Construction**

```tsx
const buttonClasses = cn(
  'btn',
  {
    [`btn-${variant}`]: variant && variant !== 'ghost',
    'btn-outline': outline,
    [`btn-${size}`]: size && size !== 'md',
    'btn-wide': wide,
    'btn-block': block,
    'btn-circle': circle,
    'btn-square': square,
    'btn-glass': glass,
    'btn-active': active,
    loading: loading,
  },
  className
)
```

#### 5. **Accessibility Implementation**

```tsx
<Button {...props} className={buttonClasses} isDisabled={disabled || loading} onPress={onPress}>
  {loading && <span className="loading loading-spinner loading-sm mr-2" aria-hidden="true" />}
  {children}
</Button>
```

#### 6. **DaisyUI Class Usage**

- Use official DaisyUI CSS classes (`btn`, `btn-primary`, `btn-secondary`, etc.)
- Support DaisyUI modifiers (`btn-outline`, `btn-wide`, `btn-loading`, etc.)
- Follow DaisyUI naming conventions

### Component Implementation Guidelines

#### 1. **File Structure**

**Single Component:**

```
src/components/component-name.tsx
test/components/component-name.test.tsx
docs/components/component-name.md
```

**Multi-Component (when a component exports multiple related components):**

```
src/components/component-name/
├── component-name.tsx
├── sub-component.tsx
├── index.ts
test/components/component-name.test.tsx (includes all tests for the component family)
docs/components/component-name.md (includes full docs for all components)
```

**Example: Carousel with CarouselItem**

```
src/components/carousel/
├── carousel.tsx
├── carousel-item.tsx
├── index.ts
test/components/carousel.test.tsx
docs/components/carousel.md
```

The `index.ts` file should export all components and types:

```tsx
export { default as Carousel } from './carousel'
export { default as CarouselItem } from './carousel-item'
export type { CarouselProps } from './carousel'
export type { CarouselItemProps } from './carousel-item'
```

#### 2. **Required Exports**

```tsx
export interface ComponentNameProps {
  // Props definition with JSDoc
}

export default function ComponentName(props: ComponentNameProps): JSX.Element {
  // Implementation
}
```

#### 3. **Props Design**

- **children**: Always use `React.ReactNode` for child content
- **className**: Support additional CSS classes as `string`
- **Variants**: Use union types for DaisyUI variants (`"primary" | "secondary" | "accent"`)
- **Optional Props**: Mark non-essential props as optional with `?`
- **React Aria Integration**: Extend appropriate React Aria prop interfaces (`AriaButtonProps`, `AriaDialogProps`, etc.)

#### 4. **State Management**

```tsx
import { useState, useEffect } from 'react'

const [state, setState] = useState(initialValue)
```

#### 5. **Event Handling**

```tsx
// Prefer explicit event types
onClick?: (event: MouseEvent) => void;
onFocus?: (event: FocusEvent) => void;

// Handle events properly
const handleClick = (event: MouseEvent) => {
  event.preventDefault();
  props.onClick?.(event);
};
```

#### 6. **Accessibility Requirements**

- Use semantic HTML elements
- Include ARIA attributes (`role`, `aria-label`, `aria-expanded`, etc.)
- Support keyboard navigation
- Ensure proper focus management
- Use `aria-live` for dynamic content announcements

#### 7. **DaisyUI Integration**

- Use official DaisyUI component classes
- Support all DaisyUI variants and modifiers
- Follow DaisyUI naming conventions
- Reference [DaisyUI documentation](https://daisyui.com/components/) for accurate implementation

#### 8. **Error Handling**

```tsx
// Graceful degradation
if (!isVisible()) return null

// Default values
const variant = props.variant ?? 'primary'
```

## Test-Driven Development (TDD)

### 1. **Write Tests First**

```tsx
describe('ComponentName', () => {
  it('renders with required props', () => {
    const { getByRole } = render(<ComponentName title="Test" />)
    expect(getByRole('button')).toBeInTheDocument()
  })

  it('supports DaisyUI variants', () => {
    const { container } = render(<ComponentName variant="primary" />)
    expect(container.firstChild).toHaveClass('btn-primary')
  })

  it('handles user interactions', () => {
    const handleClick = vi.fn()
    const { getByRole } = render(<ComponentName onClick={handleClick} />)
    fireEvent.click(getByRole('button'))
    expect(handleClick).toHaveBeenCalled()
  })

  it('meets accessibility requirements', () => {
    const { getByRole } = render(<ComponentName aria-label="Test" />)
    const element = getByRole('button')
    expect(element).toHaveAttribute('aria-label', 'Test')
  })
})
```

### 2. **Test Categories**

- **Rendering**: Component renders correctly with props
- **Interactions**: User interactions work as expected
- **Accessibility**: ARIA attributes and keyboard navigation
- **DaisyUI Compliance**: Correct CSS classes and variants
- **Edge Cases**: Error states and boundary conditions

## Component Documentation

### Required Documentation Structure

```markdown
# ComponentName Component

## Overview

Brief description of the component and its purpose.

## Usage

\`\`\`tsx
<ComponentName variant="primary" onClick={handleClick}>
Content
</ComponentName>
\`\`\`

## Props

| Prop    | Type                     | Default   | Description    |
| ------- | ------------------------ | --------- | -------------- |
| variant | "primary" \| "secondary" | "primary" | Button variant |

## Accessibility

- Supports keyboard navigation
- Includes ARIA attributes
- Compatible with screen readers

## Examples

[Additional usage examples]
```

## Code Quality Standards

### 1. **TypeScript**

- Use strict TypeScript configuration
- Define explicit types for all props
- Use union types for variants
- Avoid `any` type
- Use prettier to enforce code formatting

### 2. **React Best Practices**

- Use `useState` for component state
- Use `useEffect` for side effects
- Leverage `className` for dynamic classes
- Use conditional rendering with `&&` and ternary operators

### 3. **Performance**

- Minimize re-renders with proper dependency arrays
- Use `useMemo` for expensive calculations
- Use `useCallback` for stable function references

### 4. **Imports**

```tsx
import { useState, useEffect } from 'react'
import { Button } from 'react-aria-components'
// Import only what you need
```

## Useful Resources

- [React Documentation](https://react.dev)
- [React Aria Components](https://react-spectrum.adobe.com/react-aria/components.html)
- [DaisyUI Components](https://daisyui.com/components/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

## Notes

- Use Vite for build system and Vitest for testing
- Follow semantic versioning for releases
- Ensure all components are tree-shakeable
- Maintain backward compatibility when possible
