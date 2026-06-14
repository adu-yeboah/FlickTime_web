import { FiGrid, FiList, FiSliders, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { QUICK_PRESETS } from '../constants';

function TvHeader({
    viewMode, setViewMode,
    isSidebarOpen, setIsSidebarOpen,
    activeFilters, removeChip, resetFilters,
    activePreset, applyPreset
}) {
    return (
        <div className="pt-8 pb-4">
            <div className="container mx-auto px-4">
                <div className="flex flex-col gap-4 border-b border-gray-800 pb-6 mb-6">
                    <div className="flex justify-between items-center">
                        <div className="text-4xl font-bold text-white">
                            <span className="text-cyan-400">tv</span> shows.
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:flex items-center bg-gray-800/60 rounded-lg p-1 border border-gray-700/50">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400 hover:text-white'}`}
                                >
                                    <FiGrid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('compact')}
                                    className={`p-2 rounded-md transition-all ${viewMode === 'compact' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400 hover:text-white'}`}
                                >
                                    <FiList className="w-4 h-4" />
                                </button>
                            </div>
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-800/60 rounded-lg text-cyan-400 hover:text-cyan-300 transition-colors border border-gray-700/50"
                            >
                                <FiSliders className="w-5 h-5" />
                                <span className="font-semibold">Filters</span>
                                {activeFilters.length > 0 && (
                                    <span className="bg-cyan-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                        {activeFilters.length}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                        {QUICK_PRESETS.map(preset => (
                            <button
                                key={preset.id}
                                onClick={() => applyPreset(preset)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 border ${
                                    activePreset === preset.id
                                        ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                                        : 'bg-gray-800/40 text-gray-400 border-gray-700/50 hover:border-gray-600 hover:text-gray-300'
                                }`}
                            >
                                <preset.icon className="w-4 h-4" />
                                {preset.label}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence>
                        {activeFilters.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="flex flex-wrap items-center gap-2"
                            >
                                <span className="text-xs text-gray-500 font-medium mr-1">Active:</span>
                                {activeFilters.map((chip, i) => (
                                    <motion.button
                                        key={`${chip.key}-${chip.id || i}`}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        onClick={() => removeChip(chip)}
                                        className="flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-xs font-medium border border-cyan-500/30 hover:bg-cyan-500/20 transition-colors"
                                    >
                                        {chip.label}
                                        <FiX className="w-3 h-3" />
                                    </motion.button>
                                ))}
                                <button onClick={resetFilters} className="text-xs text-gray-500 hover:text-red-400 transition-colors ml-2">
                                    Clear all
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}

export default TvHeader;
