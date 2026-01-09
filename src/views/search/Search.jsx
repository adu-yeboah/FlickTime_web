/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useRef } from 'react'
import Navbar from '../../components/Navbar'
import apiDetails from '../../api/movieApi'
import Card from '../../components/Card'
import { IoSearch, IoClose, IoFilter, IoFilm, IoTv } from 'react-icons/io5'
import { FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

function Search() {
  const [input, setInput] = useState("")
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchType, setSearchType] = useState('movie') // 'movie' or 'tv'
  const [showResults, setShowResults] = useState(false)
  const searchTimeout = useRef(null)
  const navigate = useNavigate()

  const fetchData = (value) => {
    if (!value.trim()) {
      setData([])
      setShowResults(false)
      return
    }

    setIsLoading(true)
    const endpoint = searchType === 'movie'
      ? 'search/movie'
      : 'search/tv'

    fetch(`https://api.themoviedb.org/3/${endpoint}?query=${value}&api_key=${apiDetails.api_key}`)
      .then(res => res.json())
      .then(data => {
        setData(data.results || [])
        setShowResults(true)
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Search error:', error)
        setIsLoading(false)
      })
  }

  const handleChange = (value) => {
    setInput(value)

    // Clear previous timeout
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current)
    }

    // Set new timeout for debouncing
    searchTimeout.current = setTimeout(() => {
      fetchData(value)
    }, 500)
  }

  const clearSearch = () => {
    setInput("")
    setData([])
    setShowResults(false)
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current)
    }
  }

  const toggleSearchType = () => {
    setSearchType(prev => prev === 'movie' ? 'tv' : 'movie')
  }

  useEffect(() => {
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <Navbar />

      {/* Search Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="max-w-4xl mx-auto">
          {/* Search Title */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Discover Movies & TV Shows
            </h1>
            <p className="text-gray-400">
              Search through thousands of titles to find your next favorite
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-12">
            <div className="relative flex items-center">
              <div className="absolute left-4 text-gray-400">
                <FiSearch className="w-6 h-6" />
              </div>

              <input
                type="text"
                placeholder="Search for movies or TV shows..."
                className="w-full pl-12 pr-24 py-4 bg-gray-800/50 border-2 border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300 text-lg"
                value={input}
                onChange={(e) => handleChange(e.target.value)}
                autoFocus
              />

              {/* Clear Button */}
              {input && (
                <button
                  onClick={clearSearch}
                  className="absolute right-20 p-2 text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label="Clear search"
                >
                  <IoClose className="w-6 h-6" />
                </button>
              )}

              {/* Search Type Toggle */}
              <button
                onClick={toggleSearchType}
                className={`absolute right-4 flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${searchType === 'movie'
                  ? 'bg-cyan-400 text-gray-900 hover:bg-cyan-500'
                  : 'bg-purple-500 text-white hover:bg-purple-600'
                  }`}
                aria-label={`Search ${searchType === 'movie' ? 'TV shows' : 'movies'}`}
              >
                {searchType === 'movie' ? (
                  <>
                    <IoFilm className="w-5 h-5" />
                    <span className="font-semibold">Movies</span>
                  </>
                ) : (
                  <>
                    <IoTv className="w-5 h-5" />
                    <span className="font-semibold">TV Shows</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Search Results Header */}
          {showResults && (
            <div className="mb-6 border-b border-gray-800 pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Search Results
                    {input && (
                      <span className="text-cyan-400 ml-2">"{input}"</span>
                    )}
                  </h2>
                  <p className="text-gray-400 mt-1">
                    {isLoading ? 'Searching...' : `${data.length} results found`}
                  </p>
                </div>

                {/* Filter Options */}
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200">
                    <IoFilter className="w-5 h-5" />
                    <span className="hidden sm:inline">Filter</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search Results */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {isLoading ? (
          // Loading Skeleton
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="w-full h-64 sm:h-72 bg-gray-800 rounded-xl mb-3"></div>
                <div className="h-4 bg-gray-800 rounded mb-2"></div>
                <div className="h-3 w-2/3 bg-gray-800 rounded"></div>
              </div>
            ))}
          </div>
        ) : showResults ? (
          // Search Results Grid
          data.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {data.map((item) => (
                <Card
                  key={item.id}
                  item={item}
                  onClick={(item) => navigate('/movie_details', { state: { item } })}
                />
              ))}
            </div>
          ) : (
            // No Results
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-800 rounded-full mb-6">
                <IoSearch className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                No results found
              </h3>
              <p className="text-gray-400 max-w-md mx-auto">
                We couldn't find any {searchType === 'movie' ? 'movies' : 'TV shows'} matching "{input}". Try different keywords or check the spelling.
              </p>
            </div>
          )
        ) : (
          // Initial State - Empty Search
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full mb-6 border border-gray-700">
              <FiSearch className="w-10 h-10 text-cyan-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Start Searching
            </h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Enter a movie or TV show title in the search bar above to begin discovering content.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => handleChange('Action')}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
              >
                Action
              </button>
              <button
                onClick={() => handleChange('Comedy')}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
              >
                Comedy
              </button>
              <button
                onClick={() => handleChange('Drama')}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
              >
                Drama
              </button>
              <button
                onClick={() => handleChange('Sci-Fi')}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
              >
                Sci-Fi
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Search