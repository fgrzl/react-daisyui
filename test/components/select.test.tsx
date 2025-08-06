import React from 'react'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Select, SelectItem } from '@/components/select'

describe('Select', () => {
  it('renders correctly', () => {
    render(
      <Select aria-label="Test select">
        <SelectItem id="option1">Option 1</SelectItem>
        <SelectItem id="option2">Option 2</SelectItem>
      </Select>
    )
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByText('Select an option')).toBeInTheDocument()
  })

  it('applies correct variant classes', () => {
    render(
      <Select variant="secondary">
        <SelectItem id="option1">Option 1</SelectItem>
      </Select>
    )
    const select = screen.getByRole('button').closest('[class*="select"]')
    expect(select).toHaveClass('select-secondary')
  })

  it('applies correct size classes', () => {
    render(
      <Select size="lg">
        <SelectItem id="option1">Option 1</SelectItem>
      </Select>
    )
    const select = screen.getByRole('button').closest('[class*="select"]')
    expect(select).toHaveClass('select-lg')
  })

  it('applies bordered style by default', () => {
    render(
      <Select>
        <SelectItem id="option1">Option 1</SelectItem>
      </Select>
    )
    const select = screen.getByRole('button').closest('[class*="select"]')
    expect(select).toHaveClass('select-bordered')
  })

  it('applies ghost style when specified', () => {
    render(
      <Select ghost>
        <SelectItem id="option1">Option 1</SelectItem>
      </Select>
    )
    const select = screen.getByRole('button').closest('[class*="select"]')
    expect(select).toHaveClass('select-ghost')
    expect(select).not.toHaveClass('select-bordered')
  })

  it('shows custom placeholder', () => {
    render(
      <Select placeholder="Choose an option">
        <SelectItem id="option1">Option 1</SelectItem>
      </Select>
    )
    expect(screen.getByText('Choose an option')).toBeInTheDocument()
  })

  it('opens popover when button is clicked', async () => {
    render(
      <Select>
        <SelectItem id="option1">Option 1</SelectItem>
        <SelectItem id="option2">Option 2</SelectItem>
      </Select>
    )

    const user = userEvent.setup()
    await act(async () => {
      await user.click(screen.getByRole('button'))
    })

    expect(screen.getByRole('listbox')).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Option 1' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Option 2' })).toBeInTheDocument()
  })

  it('selects option when clicked', async () => {
    render(
      <Select>
        <SelectItem id="option1">Option 1</SelectItem>
        <SelectItem id="option2">Option 2</SelectItem>
      </Select>
    )

    const user = userEvent.setup()

    // Open the select
    await act(async () => {
      await user.click(screen.getByRole('button'))
    })

    // Select an option
    await act(async () => {
      await user.click(screen.getByRole('option', { name: 'Option 1' }))
    })

    // Check that the selected value is displayed (the placeholder should be replaced)
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('Option 1')
  })

  it('applies custom className', () => {
    render(
      <Select className="custom-class">
        <SelectItem id="option1">Option 1</SelectItem>
      </Select>
    )
    const select = screen.getByRole('button').closest('[class*="select"]')
    expect(select).toHaveClass('custom-class')
  })

  it('renders with different variants', () => {
    const variants = [
      'primary',
      'secondary',
      'accent',
      'neutral',
      'info',
      'success',
      'warning',
      'error',
    ] as const

    variants.forEach(variant => {
      const { unmount } = render(
        <Select variant={variant}>
          <SelectItem id="option1">Option 1</SelectItem>
        </Select>
      )
      const select = screen.getByRole('button').closest('[class*="select"]')
      expect(select).toHaveClass(`select-${variant}`)
      unmount()
    })
  })

  it('supports all sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg'] as const

    sizes.forEach(size => {
      const { unmount } = render(
        <Select size={size}>
          <SelectItem id="option1">Option 1</SelectItem>
        </Select>
      )
      const select = screen.getByRole('button').closest('[class*="select"]')

      if (size === 'md') {
        // Medium is default with no additional class
        expect(select).toHaveClass('select')
      } else {
        expect(select).toHaveClass(`select-${size}`)
      }
      unmount()
    })
  })

  it('handles disabled state', () => {
    render(
      <Select isDisabled>
        <SelectItem id="option1">Option 1</SelectItem>
      </Select>
    )
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('prevents interaction when disabled', async () => {
    render(
      <Select isDisabled>
        <SelectItem id="option1">Option 1</SelectItem>
      </Select>
    )

    const user = userEvent.setup()
    await act(async () => {
      await user.click(screen.getByRole('button'))
    })

    // Popover should not open when disabled
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('handles keyboard navigation', async () => {
    render(
      <Select>
        <SelectItem id="option1">Option 1</SelectItem>
        <SelectItem id="option2">Option 2</SelectItem>
        <SelectItem id="option3">Option 3</SelectItem>
      </Select>
    )

    const button = screen.getByRole('button')
    button.focus()

    const user = userEvent.setup()

    // Open with Enter
    await act(async () => {
      await user.keyboard('{Enter}')
    })

    expect(screen.getByRole('listbox')).toBeInTheDocument()

    // Navigate with arrow keys
    await act(async () => {
      await user.keyboard('{ArrowDown}')
    })

    // Select with Enter
    await act(async () => {
      await user.keyboard('{Enter}')
    })

    // Should have selected the first option
    expect(screen.getByText('Option 1')).toBeInTheDocument()
  })

  it('handles keyboard navigation with Space', async () => {
    render(
      <Select>
        <SelectItem id="option1">Option 1</SelectItem>
        <SelectItem id="option2">Option 2</SelectItem>
      </Select>
    )

    const button = screen.getByRole('button')
    button.focus()

    const user = userEvent.setup()

    // Open with Space
    await act(async () => {
      await user.keyboard(' ')
    })

    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('closes popover when Escape is pressed', async () => {
    render(
      <Select>
        <SelectItem id="option1">Option 1</SelectItem>
        <SelectItem id="option2">Option 2</SelectItem>
      </Select>
    )

    const user = userEvent.setup()

    // Open the select
    await act(async () => {
      await user.click(screen.getByRole('button'))
    })

    expect(screen.getByRole('listbox')).toBeInTheDocument()

    // Close with Escape
    await act(async () => {
      await user.keyboard('{Escape}')
    })

    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('supports controlled state', async () => {
    const TestComponent = () => {
      const [selectedKey, setSelectedKey] = React.useState<string | number>('option2')

      return (
        <Select selectedKey={selectedKey} onSelectionChange={setSelectedKey}>
          <SelectItem id="option1">Option 1</SelectItem>
          <SelectItem id="option2">Option 2</SelectItem>
          <SelectItem id="option3">Option 3</SelectItem>
        </Select>
      )
    }

    render(<TestComponent />)

    // Should show the initially selected option in the button
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('Option 2')
  })

  it('supports uncontrolled state', async () => {
    render(
      <Select defaultSelectedKey="option1">
        <SelectItem id="option1">Option 1</SelectItem>
        <SelectItem id="option2">Option 2</SelectItem>
      </Select>
    )

    // Should show the default selected option in the button
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('Option 1')
  })

  it('has proper focus management', async () => {
    render(
      <Select>
        <SelectItem id="option1">Option 1</SelectItem>
        <SelectItem id="option2">Option 2</SelectItem>
      </Select>
    )

    const button = screen.getByRole('button')

    // Focus the select button
    await act(async () => {
      button.focus()
    })

    expect(button).toHaveFocus()
  })

  it('renders dropdown arrow', () => {
    render(
      <Select>
        <SelectItem id="option1">Option 1</SelectItem>
      </Select>
    )

    const arrow = screen.getByText('▼')
    expect(arrow).toBeInTheDocument()
    expect(arrow).toHaveAttribute('aria-hidden', 'true')
  })

  it('applies correct base classes', () => {
    render(
      <Select>
        <SelectItem id="option1">Option 1</SelectItem>
      </Select>
    )
    const select = screen.getByRole('button').closest('[class*="select"]')
    expect(select).toHaveClass('select', 'select-bordered')
  })
})

describe('SelectItem', () => {
  it('renders correctly', async () => {
    render(
      <Select>
        <SelectItem id="item1">Test Item</SelectItem>
      </Select>
    )

    const user = userEvent.setup()
    await act(async () => {
      await user.click(screen.getByRole('button'))
    })

    expect(screen.getByRole('option', { name: 'Test Item' })).toBeInTheDocument()
  })

  it('applies custom className', async () => {
    render(
      <Select>
        <SelectItem id="item1" className="custom-item-class">
          Test Item
        </SelectItem>
      </Select>
    )

    const user = userEvent.setup()
    await act(async () => {
      await user.click(screen.getByRole('button'))
    })

    const item = screen.getByRole('option', { name: 'Test Item' })
    expect(item).toHaveClass('custom-item-class')
  })
})
