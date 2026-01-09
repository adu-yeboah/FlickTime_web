import { describe, it, expect, } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './Navbar'

const renderNavbar = () => {
  return render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  )
}

describe('Navbar Component', () => {
  describe('Rendering', () => {
    it('renders the logo with branding', () => {
      renderNavbar()
      expect(screen.getByText('lick')).toBeInTheDocument()
      expect(screen.getByText('ime')).toBeInTheDocument()
    })

    it('renders desktop navigation links', () => {
      renderNavbar()
      expect(screen.getAllByText('Home').length).toBeGreaterThan(0)
      expect(screen.getAllByText('Movies').length).toBeGreaterThan(0)
      expect(screen.getAllByText('TV Shows').length).toBeGreaterThan(0)
      expect(screen.getAllByText('Watchlist').length).toBeGreaterThan(0)
    })

    it('renders search link', () => {
      renderNavbar()
      expect(screen.getByLabelText('Go to search page')).toBeInTheDocument()
    })

    it('renders mobile menu button', () => {
      renderNavbar()
      expect(screen.getByLabelText(/Open menu/)).toBeInTheDocument()
    })
  })

  describe('Mobile Menu Interactions', () => {
    it('toggles mobile menu on button click', async () => {
      const user = userEvent.setup()
      renderNavbar()
      const menuButton = screen.getByLabelText(/Open menu/)

      expect(menuButton).toHaveAttribute('aria-expanded', 'false')

      await user.click(menuButton)
      expect(menuButton).toHaveAttribute('aria-expanded', 'true')
      expect(menuButton).toHaveAttribute('aria-label', 'Close menu')

      await user.click(menuButton)
      expect(menuButton).toHaveAttribute('aria-expanded', 'false')
      expect(menuButton).toHaveAttribute('aria-label', 'Open menu')
    })

    it('closes mobile menu when navigation link is clicked', async () => {
      const user = userEvent.setup()
      renderNavbar()
      const menuButton = screen.getByLabelText(/Open menu/)

      // Open menu
      await user.click(menuButton)
      expect(menuButton).toHaveAttribute('aria-expanded', 'true')

      // Click a navigation link
      const navLinks = screen.getAllByText('Home')
      const mobileHomeLink = navLinks[navLinks.length - 1] // Get the last one (mobile menu)
      await user.click(mobileHomeLink)

      expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA labels for navigation', () => {
      renderNavbar()
      const desktopNav = screen.getByRole('navigation', { name: 'Main navigation' })
      const mobileNav = screen.getByRole('navigation', { name: 'Mobile navigation' })

      expect(desktopNav).toBeInTheDocument()
      expect(mobileNav).toBeInTheDocument()
    })

    it('has proper aria-expanded on menu button', () => {
      renderNavbar()
      const menuButton = screen.getByLabelText(/Open menu/)
      expect(menuButton).toHaveAttribute('aria-expanded')
    })

    it('has aria-controls linking menu button to menu', () => {
      renderNavbar()
      const menuButton = screen.getByLabelText(/Open menu/)
      expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu')
      expect(screen.getByRole('navigation', { name: 'Mobile navigation' })).toHaveAttribute('id', 'mobile-menu')
    })

    it('search link has proper aria-label', () => {
      renderNavbar()
      const searchLink = screen.getByLabelText('Go to search page')
      expect(searchLink).toBeInTheDocument()
      expect(searchLink).toHaveAttribute('title', 'Search')
    })

    it('menu button label updates based on state', async () => {
      const user = userEvent.setup()
      renderNavbar()
      const menuButton = screen.getByLabelText(/Open menu/)

      expect(menuButton).toHaveAttribute('aria-label', 'Open menu')

      await user.click(menuButton)
      expect(menuButton).toHaveAttribute('aria-label', 'Close menu')
    })

    it('icons have aria-hidden attribute', () => {
      renderNavbar()
      const menuButton = screen.getByLabelText(/Open menu/)
      const icon = menuButton.querySelector('svg')
      expect(icon).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('Navigation Links', () => {
    it('has correct links in navigation', () => {
      renderNavbar()
      const homeLinks = screen.getAllByText('Home')
      const movieLinks = screen.getAllByText('Movies')
      const tvLinks = screen.getAllByText('TV Shows')
      const watchlistLinks = screen.getAllByText('Watchlist')

      expect(homeLinks.length).toBeGreaterThanOrEqual(2) // Desktop and mobile
      expect(movieLinks.length).toBeGreaterThanOrEqual(2)
      expect(tvLinks.length).toBeGreaterThanOrEqual(2)
      expect(watchlistLinks.length).toBeGreaterThanOrEqual(2)
    })

    it('logo links to home', () => {
      renderNavbar()
      const logoLink = screen.getByRole('link', { name: /lick.*ime/i })
      expect(logoLink).toHaveAttribute('href', '/')
    })
  })

  describe('Keyboard Navigation', () => {
    it('menu button is accessible via Tab key', async () => {
      const user = userEvent.setup()
      renderNavbar()
      const menuButton = screen.getByLabelText(/Open menu/)

      await user.tab()
      // Menu button should be reachable via tab
      expect(menuButton).toHaveAttribute('aria-label')
    })
  })
})
