# FlickTime - Movie Discovery Platform

FlickTime is a modern, responsive web application designed for discovering movies and TV shows. It interfaces with the TMDB API to provide real-time data, featuring a dynamic watchlist, advanced search capabilities, and a polished user interface with smooth animations.

## Features

- **Movie & TV Discovery**: Browse popular, top-rated, and trending content.
- **Detailed Information**: View cast, crew, production details, and recommendations.
- **Watchlist Management**: Add or remove titles from a personal watchlist.
- **Search Functionality**: robust search across the entire TMDB database.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices.
- **Mood Matcher**: Experimental feature to find movies based on current mood.
- **Smooth Animations**: Professional transitions and micro-interactions using Framer Motion.
- **Robust Error Handling**: Graceful fallbacks for missing images and network states.

## Technology Stack

- **Frontend**: React.js, Vite
- **Styling**: TailwindCSS, Sass
- **State Management**: React Context API
- **Routing**: React Router DOM
- **Animations**: Framer Motion
- **Icons**: React Icons, Lucide React
- **Testing**: Vitest, React Testing Library
- **CI/CD**: GitHub Actions

## Installation and Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/flicktime.git
   cd flicktime
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and add your TMDB API Key:
   ```
   VITE_TMDB_API_KEY=your_api_key_here
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the production-ready application.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm test`: Runs the test suite using Vitest.
- `npm run test:ui`: Opens the interactive test UI.

## Testing and Quality Assurance

This project maintains code quality through:

- **Unit Testing**: Components are tested using Vitest and React Testing Library.
- **Linting**: ESLint is configured to enforce code standards.
- **CI Pipeline**: Automated workflows check every commit for:
  - Linting errors
  - Test failures
  - Build integrity
  - Dependency vulnerabilities

## Implementation Details

### Architecture
The application is structured using a feature-based architecture. Key components include:
- **Views**: Main page layouts (Home, MovieDetails, Watchlist).
- **Components**: Reusable UI elements (Card, Banner, MovieImage).
- **Context**: Global state management for API configuration and Watchlist data.

### Performance
Performance is optimized through:
- Image optimization and lazy loading.
- Custom fallback components to prevent layout shifts.
- Efficient state updates and re-render optimization.
- Framer Motion "layout" props for GPU-accelerated layout transitions.
