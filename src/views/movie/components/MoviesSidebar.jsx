import { FiList, FiCalendar, FiStar, FiFilter, FiX, FiSliders } from 'react-icons/fi';
import CollapsibleSection from './CollapsibleSection';
import { SORT_OPTIONS, GENRES } from '../constants';

function MoviesSidebar({
    isSidebarOpen, setIsSidebarOpen,
    filters, handleFilterChange,
    toggleGenre, resetFilters
}) {
    return (
        <div className={`static inset-0 z-50 lg:static lg:block lg:w-1/4 xl:w-1/5 ${isSidebarOpen ? 'block' : 'hidden'}`}>
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm lg:hidden" onClick={() => setIsSidebarOpen(false)} />
            <div className="relative bg-gray-900 lg:bg-transparent h-full w-4/5 lg:w-full max-w-sm p-6 lg:p-0 overflow-y-auto lg:overflow-visible">
                <div className="flex justify-between items-center lg:hidden mb-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <FiSliders className="text-cyan-400" /> Filters
                    </h2>
                    <button onClick={() => setIsSidebarOpen(false)} className="text-gray-400 hover:text-white">
                        <FiX className="w-6 h-6" />
                    </button>
                </div>

                <div className="space-y-4 sticky top-24">
                    <CollapsibleSection title="Sort By" icon={<FiList className="text-cyan-400" />}>
                        <select
                            value={filters.sortBy}
                            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 text-gray-300 rounded-lg p-3 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors appearance-none cursor-pointer"
                        >
                            {SORT_OPTIONS.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </CollapsibleSection>

                    <CollapsibleSection title="Release Year" icon={<FiCalendar className="text-cyan-400" />}>
                        <input
                            type="number"
                            placeholder="e.g. 2024"
                            min="1900"
                            max={new Date().getFullYear() + 2}
                            value={filters.year}
                            onChange={(e) => handleFilterChange('year', e.target.value)}
                            className="w-full bg-gray-900 border border-gray-700 text-gray-300 rounded-lg p-3 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                        />
                    </CollapsibleSection>

                    <CollapsibleSection title={`Min Rating (${filters.rating || '0'}+)`} icon={<FiStar className="text-cyan-400" />}>
                        <input
                            type="range"
                            min="0" max="10" step="1"
                            value={filters.rating || 0}
                            onChange={(e) => handleFilterChange('rating', e.target.value)}
                            className="w-full accent-cyan-400"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                            <span>0</span>
                            <span>5</span>
                            <span>10</span>
                        </div>
                    </CollapsibleSection>

                    <CollapsibleSection title={`Genres${filters.genre ? ` (${filters.genre.split(',').length})` : ''}`} icon={<FiFilter className="text-cyan-400" />}>
                        <div className="flex flex-wrap gap-2">
                            {GENRES.map(g => {
                                const isSelected = filters.genre && filters.genre.split(',').includes(g.id.toString());
                                return (
                                    <button
                                        key={g.id}
                                        onClick={() => toggleGenre(g.id)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 border ${
                                            isSelected
                                                ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50 shadow-sm shadow-cyan-500/20'
                                                : 'bg-gray-900 text-gray-400 border-gray-700 hover:border-gray-500 hover:text-gray-300'
                                        }`}
                                    >
                                        {g.name}
                                    </button>
                                )
                            })}
                        </div>
                    </CollapsibleSection>

                    <button
                        onClick={resetFilters}
                        className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-bold transition-colors border border-gray-700/50"
                    >
                        Reset All Filters
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MoviesSidebar;
