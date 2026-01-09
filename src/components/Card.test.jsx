import { describe, it, expect, vi, } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import Card from './Card'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

// Mock the WatchlistContext
vi.mock('../context/WatchlistContext', () => ({
  useWatchlist: () => ({
    addToWatchlist: vi.fn(),
    removeFromWatchlist: vi.fn(),
    isInWatchlist: vi.fn(() => false),
  }),
}))

const mockItem = {
  id: 1,
  title: 'Test Movie Title',
  poster_path: '/test-poster.jpg',
  vote_average: 8.5,
  release_date: '2024-01-15',
}

describe('Card Component', () => {
  describe('Rendering', () => {

    it('renders card with movie title', () => {
      render(<MemoryRouter><Card item={mockItem} onClick={vi.fn()} /></MemoryRouter>)
      expect(screen.getAllByText('Test Movie Title')[0]).toBeInTheDocument()
    })

    it('renders rating badge with correct vote average', () => {
      render(<MemoryRouter><Card item={mockItem} onClick={vi.fn()} /></MemoryRouter>)
      expect(screen.getByText('8.5', { hidden: true })).toBeInTheDocument()
    })

    it('renders poster image with correct alt text', () => {
      render(<MemoryRouter><Card item={mockItem} onClick={vi.fn()} /></MemoryRouter>)
      const img = screen.getByAltText('Test Movie poster')
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute('src', 'https://image.tmdb.org/t/p/w500/test-poster.jpg')
    })
  })

  describe('Accessibility', () => {
    it('has proper aria-label on card', () => {
      render(<MemoryRouter><Card item={mockItem} onClick={vi.fn()} /></MemoryRouter>)
      const card = screen.getByRole('button', { name: /Test Movie Title.*8.5.*rating/i })
      expect(card).toBeInTheDocument()
    })

    it('has aria-label on watchlist button', () => {
      render(<MemoryRouter><Card item={mockItem} onClick={vi.fn()} /></MemoryRouter>)
      const watchlistBtn = screen.getByLabelText(/Add Test Movie to Watchlist/i)
      expect(watchlistBtn).toBeInTheDocument()
    })

    it('has aria-label on rating badge', () => {
      render(<MemoryRouter><Card item={mockItem} onClick={vi.fn()} /></MemoryRouter>)
      const ratingBadge = screen.getByLabelText(/Rating: 8.5 out of 10/)
      expect(ratingBadge).toBeInTheDocument()
    })

    it('is keyboard accessible with Enter key', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(<MemoryRouter><Card item={mockItem} onClick={handleClick} /></MemoryRouter>)
      const card = screen.getByRole('button', { name: /Test Movie Title/ })

      card.focus()
      await user.keyboard('{Enter}')
      expect(handleClick).toHaveBeenCalled()
    })

    it('is keyboard accessible with Space key', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(<MemoryRouter><Card item={mockItem} onClick={handleClick} /></MemoryRouter>)
      const card = screen.getByRole('button', { name: /Test Movie Title/ })

      card.focus()
      await user.keyboard(' ')
      expect(handleClick).toHaveBeenCalled()
    })
  })

  describe('Interactions', () => {
    it('calls onClick when card is clicked', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()
      render(<MemoryRouter><Card item={mockItem} onClick={handleClick} /></MemoryRouter>)
      const card = screen.getByRole('button', { name: /Test Movie Title/ })

      await user.click(card)
      expect(handleClick).toHaveBeenCalledWith(mockItem)
    })

    it('renders release year from release_date', () => {
      render(<MemoryRouter><Card item={mockItem} onClick={vi.fn()} /></MemoryRouter>)
      expect(screen.getAllByText(/2024/)[0]).toBeInTheDocument()
    })

    it('renders N/A for missing release date', () => {
      const itemNoDate = { ...mockItem, release_date: null, first_air_date: null }
      render(<MemoryRouter><Card item={itemNoDate} onClick={vi.fn()} /></MemoryRouter>)
      expect(screen.getAllByText('Unknown Date')[0]).toBeInTheDocument()
    })
  })

  describe('Rating Colors', () => {
    it('shows green badge for high ratings (8+)', () => {
      render(<MemoryRouter><Card item={mockItem} onClick={vi.fn()} /></MemoryRouter>)
      const ratingBadge = screen.getByLabelText(/Rating: 8.5/)
      expect(ratingBadge).toHaveClass('bg-green-500')
    })

    it('shows yellow badge for medium-high ratings (6-8)', () => {
      const item = { ...mockItem, vote_average: 7.0 }
      render(<MemoryRouter><Card item={item} onClick={vi.fn()} /></MemoryRouter>)
      const ratingBadge = screen.getByLabelText(/Rating: 7.0/)
      expect(ratingBadge).toHaveClass('bg-yellow-500')
    })

    it('shows orange badge for medium ratings (4-6)', () => {
      const item = { ...mockItem, vote_average: 5.5 }
      render(<MemoryRouter><Card item={item} onClick={vi.fn()} /></MemoryRouter>)
      const ratingBadge = screen.getByLabelText(/Rating: 5.5/)
      expect(ratingBadge).toHaveClass('bg-orange-500')
    })

    it('shows red badge for low ratings (<4)', () => {
      const item = { ...mockItem, vote_average: 3.0 }
      render(<MemoryRouter><Card item={item} onClick={vi.fn()} /></MemoryRouter>)
      const ratingBadge = screen.getByLabelText(/Rating: 3.0/)
      expect(ratingBadge).toHaveClass('bg-red-500')
    })
  })

  describe('Edge Cases', () => {
    it('uses name fallback when title is missing', () => {
      const item = { ...mockItem, title: null, name: 'TV Show Name' }
      render(<MemoryRouter><Card item={item} onClick={vi.fn()} /></MemoryRouter>)
      expect(screen.getAllByText('TV Show Name')[0]).toBeInTheDocument()
    })

    it('handles missing vote_average', () => {
      const item = { ...mockItem, vote_average: null }
      render(<MemoryRouter><Card item={item} onClick={vi.fn()} /></MemoryRouter>)
      expect(screen.getByText('N/A', { hidden: true })).toBeInTheDocument()
    })
  })
})
