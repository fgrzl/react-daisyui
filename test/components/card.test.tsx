import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Card, CardBody, CardTitle, CardActions } from '@/components/card'

describe('Card', () => {
  it('renders correctly', () => {
    render(
      <Card data-testid="card">
        <CardTitle>Test Title</CardTitle>
        <CardBody>Test content</CardBody>
      </Card>
    )
    expect(screen.getByTestId('card')).toBeInTheDocument()
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies base card class', () => {
    render(<Card data-testid="card">Content</Card>)
    expect(screen.getByTestId('card')).toHaveClass('card')
  })

  it('applies compact variant', () => {
    render(
      <Card compact data-testid="card">
        Content
      </Card>
    )
    expect(screen.getByTestId('card')).toHaveClass('card-compact')
  })

  it('applies shadow variants', () => {
    const shadows = ['sm', 'md', 'lg', 'xl', '2xl'] as const

    shadows.forEach(shadow => {
      const { unmount } = render(
        <Card shadow={shadow} data-testid={`card-${shadow}`}>
          Content
        </Card>
      )
      expect(screen.getByTestId(`card-${shadow}`)).toHaveClass(`shadow-${shadow}`)
      unmount()
    })
  })

  it('applies bordered style', () => {
    render(
      <Card bordered data-testid="card">
        Content
      </Card>
    )
    expect(screen.getByTestId('card')).toHaveClass('card-bordered')
  })

  it('applies image-full style', () => {
    render(
      <Card imageFull data-testid="card">
        Content
      </Card>
    )
    expect(screen.getByTestId('card')).toHaveClass('image-full')
  })

  it('applies custom className', () => {
    render(
      <Card className="custom-class" data-testid="card">
        Content
      </Card>
    )
    expect(screen.getByTestId('card')).toHaveClass('custom-class')
  })

  it('applies multiple modifiers together', () => {
    render(
      <Card compact bordered shadow="lg" imageFull data-testid="card">
        Content
      </Card>
    )
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('card-compact', 'card-bordered', 'shadow-lg', 'image-full')
  })

  it('passes through additional HTML attributes', () => {
    render(
      <Card data-testid="card" id="test-id" role="article">
        Content
      </Card>
    )
    const card = screen.getByTestId('card')
    expect(card).toHaveAttribute('id', 'test-id')
    expect(card).toHaveAttribute('role', 'article')
  })

  it('renders as a div element', () => {
    render(<Card data-testid="card">Content</Card>)
    expect(screen.getByTestId('card').tagName).toBe('DIV')
  })
})

describe('CardBody', () => {
  it('renders correctly', () => {
    render(<CardBody data-testid="card-body">Body content</CardBody>)
    expect(screen.getByTestId('card-body')).toBeInTheDocument()
    expect(screen.getByText('Body content')).toBeInTheDocument()
  })

  it('applies card-body class', () => {
    render(<CardBody data-testid="card-body">Content</CardBody>)
    expect(screen.getByTestId('card-body')).toHaveClass('card-body')
  })

  it('applies custom className', () => {
    render(
      <CardBody className="custom-body" data-testid="card-body">
        Content
      </CardBody>
    )
    expect(screen.getByTestId('card-body')).toHaveClass('custom-body')
  })

  it('passes through additional HTML attributes', () => {
    render(
      <CardBody data-testid="card-body" id="body-id">
        Content
      </CardBody>
    )
    expect(screen.getByTestId('card-body')).toHaveAttribute('id', 'body-id')
  })

  it('renders as a div element', () => {
    render(<CardBody data-testid="card-body">Content</CardBody>)
    expect(screen.getByTestId('card-body').tagName).toBe('DIV')
  })
})

describe('CardTitle', () => {
  it('renders correctly with default heading level', () => {
    render(<CardTitle data-testid="card-title">Title content</CardTitle>)
    expect(screen.getByTestId('card-title')).toBeInTheDocument()
    expect(screen.getByText('Title content')).toBeInTheDocument()
    expect(screen.getByTestId('card-title').tagName).toBe('H2')
  })

  it('applies card-title class', () => {
    render(<CardTitle data-testid="card-title">Title</CardTitle>)
    expect(screen.getByTestId('card-title')).toHaveClass('card-title')
  })

  it('supports different heading levels', () => {
    const headingLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const

    headingLevels.forEach(level => {
      const { unmount } = render(
        <CardTitle as={level} data-testid={`title-${level}`}>
          {level} Title
        </CardTitle>
      )
      expect(screen.getByTestId(`title-${level}`).tagName).toBe(level.toUpperCase())
      unmount()
    })
  })

  it('applies custom className', () => {
    render(
      <CardTitle className="custom-title" data-testid="card-title">
        Title
      </CardTitle>
    )
    expect(screen.getByTestId('card-title')).toHaveClass('custom-title')
  })

  it('passes through additional HTML attributes', () => {
    render(
      <CardTitle data-testid="card-title" id="title-id">
        Title
      </CardTitle>
    )
    expect(screen.getByTestId('card-title')).toHaveAttribute('id', 'title-id')
  })

  it('renders with proper semantic structure', () => {
    render(<CardTitle>Accessible Title</CardTitle>)
    const title = screen.getByRole('heading', { name: 'Accessible Title' })
    expect(title).toBeInTheDocument()
    expect(title).toHaveClass('card-title')
  })
})

describe('CardActions', () => {
  it('renders correctly', () => {
    render(
      <CardActions data-testid="card-actions">
        <button>Action 1</button>
        <button>Action 2</button>
      </CardActions>
    )
    expect(screen.getByTestId('card-actions')).toBeInTheDocument()
    expect(screen.getByText('Action 1')).toBeInTheDocument()
    expect(screen.getByText('Action 2')).toBeInTheDocument()
  })

  it('applies card-actions class', () => {
    render(<CardActions data-testid="card-actions">Actions</CardActions>)
    expect(screen.getByTestId('card-actions')).toHaveClass('card-actions')
  })

  it('applies default justify-end class', () => {
    render(<CardActions data-testid="card-actions">Actions</CardActions>)
    expect(screen.getByTestId('card-actions')).toHaveClass('justify-end')
  })

  it('supports different justify options', () => {
    const justifyOptions = ['start', 'center', 'end'] as const

    justifyOptions.forEach(justify => {
      const { unmount } = render(
        <CardActions justify={justify} data-testid={`actions-${justify}`}>
          Actions
        </CardActions>
      )
      const expectedClass = `justify-${justify}`
      expect(screen.getByTestId(`actions-${justify}`)).toHaveClass(expectedClass)
      unmount()
    })
  })

  it('applies custom className', () => {
    render(
      <CardActions className="custom-actions" data-testid="card-actions">
        Actions
      </CardActions>
    )
    expect(screen.getByTestId('card-actions')).toHaveClass('custom-actions')
  })

  it('passes through additional HTML attributes', () => {
    render(
      <CardActions data-testid="card-actions" id="actions-id">
        Actions
      </CardActions>
    )
    expect(screen.getByTestId('card-actions')).toHaveAttribute('id', 'actions-id')
  })

  it('renders as a div element', () => {
    render(<CardActions data-testid="card-actions">Actions</CardActions>)
    expect(screen.getByTestId('card-actions').tagName).toBe('DIV')
  })
})

describe('Card compound component', () => {
  it('renders complete card structure correctly', () => {
    render(
      <Card data-testid="full-card">
        <CardTitle>Card Title</CardTitle>
        <CardBody>
          <p>This is the card body content.</p>
        </CardBody>
        <CardActions>
          <button>Cancel</button>
          <button>Save</button>
        </CardActions>
      </Card>
    )

    const card = screen.getByTestId('full-card')
    expect(card).toHaveClass('card')

    const title = screen.getByRole('heading', { name: 'Card Title' })
    expect(title).toHaveClass('card-title')

    const body = screen.getByText('This is the card body content.')
    expect(body).toBeInTheDocument()

    const actions = screen.getByText('Cancel').parentElement
    expect(actions).toHaveClass('card-actions')

    expect(screen.getByText('Cancel')).toBeInTheDocument()
    expect(screen.getByText('Save')).toBeInTheDocument()
  })

  it('supports nested content structure', () => {
    render(
      <Card>
        <img src="test.jpg" alt="Card image" />
        <CardBody>
          <CardTitle as="h3">Nested Title</CardTitle>
          <p>Description text</p>
          <CardActions justify="center">
            <button>Action</button>
          </CardActions>
        </CardBody>
      </Card>
    )

    expect(screen.getByAltText('Card image')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Nested Title' })).toBeInTheDocument()
    expect(screen.getByText('Description text')).toBeInTheDocument()
    expect(screen.getByText('Action')).toBeInTheDocument()
  })

  it('maintains accessibility with proper semantic structure', () => {
    render(
      <Card role="article" aria-labelledby="card-title">
        <CardTitle id="card-title">Accessible Card</CardTitle>
        <CardBody>
          <p>This card has proper accessibility attributes.</p>
        </CardBody>
        <CardActions>
          <button aria-label="Close card">×</button>
          <button>View Details</button>
        </CardActions>
      </Card>
    )

    const card = screen.getByRole('article')
    expect(card).toHaveAttribute('aria-labelledby', 'card-title')

    const title = screen.getByRole('heading', { name: 'Accessible Card' })
    expect(title).toHaveAttribute('id', 'card-title')

    const closeButton = screen.getByRole('button', { name: 'Close card' })
    expect(closeButton).toBeInTheDocument()
  })
})

describe('Card interactive functionality', () => {
  it('is not interactive by default', () => {
    render(<Card data-testid="card">Content</Card>)
    const card = screen.getByTestId('card')
    expect(card).not.toHaveClass('cursor-pointer')
    expect(card).not.toHaveAttribute('role', 'button')
    expect(card).not.toHaveAttribute('tabIndex')
  })

  it('becomes interactive when interactive prop is true', () => {
    render(
      <Card interactive data-testid="card">
        Content
      </Card>
    )
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('cursor-pointer')
    expect(card).toHaveAttribute('role', 'button')
    expect(card).toHaveAttribute('tabIndex', '0')
  })

  it('handles click events when interactive', async () => {
    const handlePress = vi.fn()
    render(
      <Card interactive onPress={handlePress} data-testid="card">
        Interactive Card
      </Card>
    )

    const user = userEvent.setup()
    const card = screen.getByTestId('card')

    await user.click(card)
    expect(handlePress).toHaveBeenCalledTimes(1)
  })

  it('handles keyboard navigation when interactive', async () => {
    const handlePress = vi.fn()
    render(
      <Card interactive onPress={handlePress} data-testid="card">
        Interactive Card
      </Card>
    )

    const user = userEvent.setup()
    const card = screen.getByTestId('card')

    card.focus()
    expect(card).toHaveFocus()

    await user.keyboard('{Enter}')
    expect(handlePress).toHaveBeenCalledTimes(1)

    await user.keyboard(' ')
    expect(handlePress).toHaveBeenCalledTimes(2)
  })

  it('applies hover effects when interactive', () => {
    render(
      <Card interactive data-testid="card">
        Interactive Card
      </Card>
    )
    const card = screen.getByTestId('card')
    expect(card).toHaveClass('hover:shadow-lg', 'transition-shadow')
  })

  it('supports disabled state for interactive cards', () => {
    const handlePress = vi.fn()
    render(
      <Card interactive isDisabled onPress={handlePress} data-testid="card">
        Disabled Interactive Card
      </Card>
    )

    const card = screen.getByTestId('card')
    expect(card).toHaveClass('opacity-50', 'cursor-not-allowed')
    expect(card).toHaveAttribute('tabIndex', '-1')
  })

  it('prevents interaction when disabled', async () => {
    const handlePress = vi.fn()
    render(
      <Card interactive isDisabled onPress={handlePress} data-testid="card">
        Disabled Interactive Card
      </Card>
    )

    const user = userEvent.setup()
    const card = screen.getByTestId('card')

    await user.click(card)
    expect(handlePress).not.toHaveBeenCalled()
  })

  it('does not apply interactive styles when not interactive', () => {
    render(<Card data-testid="card">Regular Card</Card>)
    const card = screen.getByTestId('card')
    expect(card).not.toHaveClass('cursor-pointer', 'hover:shadow-lg', 'transition-shadow')
  })

  it('combines interactive with other modifiers', () => {
    render(
      <Card interactive compact bordered shadow="lg" data-testid="card">
        Interactive Card with Modifiers
      </Card>
    )
    const card = screen.getByTestId('card')
    expect(card).toHaveClass(
      'card',
      'card-compact',
      'card-bordered',
      'shadow-lg',
      'cursor-pointer',
      'hover:shadow-lg',
      'transition-shadow'
    )
  })

  it('respects custom role when interactive', () => {
    render(
      <Card interactive role="article" data-testid="card">
        Custom Role Card
      </Card>
    )
    const card = screen.getByTestId('card')
    expect(card).toHaveAttribute('role', 'article')
  })
})
