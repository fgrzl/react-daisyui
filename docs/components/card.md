# Card Component

The Card component is a flexible container that can be used to display content in a structured format.

## Import

```tsx
import { Card } from 'react-daisyui'
```

## Usage

### Basic Card

```tsx
<Card>
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <p>Card content goes here</p>
  </Card.Body>
</Card>
```

### Card with Actions

```tsx
<Card>
  <Card.Body>
    <Card.Title>Product Card</Card.Title>
    <p>Product description and details</p>
    <Card.Actions justify="end">
      <Button variant="ghost">Learn More</Button>
      <Button variant="primary">Buy Now</Button>
    </Card.Actions>
  </Card.Body>
</Card>
```

### Card Variants

```tsx
<Card bordered>
  <Card.Body>
    <Card.Title>Bordered Card</Card.Title>
    <p>This card has a border</p>
  </Card.Body>
</Card>

<Card shadow="lg">
  <Card.Body>
    <Card.Title>Shadow Card</Card.Title>
    <p>This card has a large shadow</p>
  </Card.Body>
</Card>

<Card compact>
  <Card.Body>
    <Card.Title>Compact Card</Card.Title>
    <p>This card has compact spacing</p>
  </Card.Body>
</Card>
```

### Card with Image

```tsx
<Card imageFull>
  <figure>
    <img src="image.jpg" alt="Card image" />
  </figure>
  <Card.Body>
    <Card.Title>Image Card</Card.Title>
    <p>Card with full-width image</p>
    <Card.Actions justify="end">
      <Button variant="primary">Action</Button>
    </Card.Actions>
  </Card.Body>
</Card>
```

## Sub-components

### Card.Body

Container for the main card content.

```tsx
<Card.Body>
  <Card.Title>Title</Card.Title>
  <p>Content</p>
</Card.Body>
```

### Card.Title

Heading element for the card title.

```tsx
<Card.Title as="h1">Main Title</Card.Title>
<Card.Title as="h3">Subtitle</Card.Title>
```

### Card.Actions

Container for action buttons or controls.

```tsx
<Card.Actions justify="start">
  <Button>Action 1</Button>
  <Button>Action 2</Button>
</Card.Actions>

<Card.Actions justify="center">
  <Button>Centered Action</Button>
</Card.Actions>

<Card.Actions justify="end">
  <Button>Right Action</Button>
</Card.Actions>
```

## Props

### Card Props

| Prop        | Type                                    | Default | Description                       |
| ----------- | --------------------------------------- | ------- | --------------------------------- |
| `compact`   | `boolean`                               | `false` | Reduces padding in card body      |
| `shadow`    | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | -       | Shadow size                       |
| `bordered`  | `boolean`                               | `false` | Adds border to card               |
| `imageFull` | `boolean`                               | `false` | Makes image cover full card width |
| `className` | `string`                                | -       | Additional CSS classes            |
| `children`  | `ReactNode`                             | -       | Card content                      |

### Card.Title Props

| Prop        | Type                                           | Default | Description            |
| ----------- | ---------------------------------------------- | ------- | ---------------------- |
| `as`        | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'h2'`  | HTML heading element   |
| `className` | `string`                                       | -       | Additional CSS classes |
| `children`  | `ReactNode`                                    | -       | Title content          |

### Card.Actions Props

| Prop        | Type                           | Default | Description            |
| ----------- | ------------------------------ | ------- | ---------------------- |
| `justify`   | `'start' \| 'center' \| 'end'` | `'end'` | Actions alignment      |
| `className` | `string`                       | -       | Additional CSS classes |
| `children`  | `ReactNode`                    | -       | Action elements        |

## Examples

### Product Card

```tsx
<Card bordered shadow="lg" className="max-w-sm">
  <figure>
    <img src="https://example.com/product.jpg" alt="Product" className="w-full h-48 object-cover" />
  </figure>
  <Card.Body>
    <Card.Title>Premium Widget</Card.Title>
    <p>High-quality widget with advanced features and excellent performance.</p>
    <div className="text-xl font-bold text-primary">$99.99</div>
    <Card.Actions justify="end">
      <Button variant="ghost">Add to Wishlist</Button>
      <Button variant="primary">Add to Cart</Button>
    </Card.Actions>
  </Card.Body>
</Card>
```

### Article Card

```tsx
<Card compact className="max-w-md">
  <Card.Body>
    <Card.Title as="h3">How to Use React DaisyUI</Card.Title>
    <p className="text-base-content/70">
      Learn the fundamentals of building beautiful interfaces with React DaisyUI components.
    </p>
    <div className="text-sm text-base-content/50 mt-2">Published on March 15, 2024</div>
    <Card.Actions justify="start">
      <Button variant="link" className="p-0">
        Read More →
      </Button>
    </Card.Actions>
  </Card.Body>
</Card>
```
