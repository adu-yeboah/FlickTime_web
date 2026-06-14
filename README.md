# FlickTime - Cinematic Discovery Platform

FlickTime is a modern, blazing-fast web application designed for discovering movies and TV shows. It interfaces with the TMDB API to provide real-time data, featuring a dynamic watchlist, advanced discovery capabilities, and a highly polished user interface reminiscent of top-tier streaming services.

## 🚀 Key Features

### 🎨 Premium UI & Dynamic Theming
- **Dynamic Poster Theming**: The application dynamically extracts dominant colors from movie posters (using `fast-average-color`) and seamlessly themes the entire Details page—including buttons, box-shadows, icons, and gradients.
- **Cinematic Micro-Animations**: Professional, GPU-accelerated transitions and micro-interactions utilizing `framer-motion`.
- **YouTube Trailer Modal**: Watch high-definition trailers right inside the app through a sleek, animated modal iframe.

### 🔍 Discovery Engine
- **Advanced Filtering Sidebar**: Easily discover new content by filtering TV shows and Movies by Genre, Release Year, Minimum Rating, and Popularity.
- **Smart Local Recommendations**: The Home page dynamically generates a "Because you added [X]" section based on items currently saved in your Watchlist.
- **Recently Viewed History**: Never lose your place. The app securely tracks your browsing history locally and surfaces your "Recently Viewed" items on the Home page.
- **Where to Watch**: Instantly see which streaming providers (Netflix, Hulu, Prime Video, etc.) currently have a title available to stream, rent, or buy in your region.

### ⚡ Performance & Architecture
- **React Query Migration**: We utilize `@tanstack/react-query` for automatic caching, background data fetching, and vastly improved API performance.
- **True Infinite Scrolling**: Utilizing the `IntersectionObserver` API, the Movies, TV, and Search pages feature seamless, continuous scrolling without pagination buttons.
- **Progressive Web App (PWA)**: Install FlickTime directly onto your mobile or desktop device for a native-app-like experience.
- **Absolute Path Aliasing**: Clean, maintainable imports utilizing `@/` path aliasing across the entire codebase.

## 🛠 Technology Stack

- **Frontend Core**: React.js, Vite
- **State & Data Fetching**: `@tanstack/react-query`, React Context API
- **Styling**: TailwindCSS, Vanilla CSS
- **Animations**: Framer Motion
- **Color Extraction**: `fast-average-color`
- **Routing**: React Router DOM
- **Icons**: React Icons, Lucide React
- **PWA**: `vite-plugin-pwa`

## ⚙️ Installation and Setup

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

## 📜 Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the production-ready application and generates PWA assets.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npm test`: Runs the test suite using Vitest.

## 🧪 Architecture Notes

The application follows a modular, feature-based architecture:
- **`src/api/queries.js`**: Contains all modular React Query hooks (`useMovieDetails`, `useInfiniteMovies`, etc.) responsible for data fetching and caching.
- **`src/context/`**: Manages local-storage synchronized state such as the `WatchlistContext` and `HistoryContext`.
- **`src/components/`**: Houses heavily reusable, animated UI components like the `Card` component which handles its own watchlist logic and history recording.
- **`src/views/`**: Page-level components handling layout and advanced logic (e.g., the complex Advanced Discovery logic within `Movies.jsx` and `Tv.jsx`).
