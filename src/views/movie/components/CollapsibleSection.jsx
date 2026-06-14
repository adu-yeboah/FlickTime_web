import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

function CollapsibleSection({ title, icon, children, defaultOpen = true }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 overflow-hidden transition-all duration-300">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-5 text-white font-bold hover:bg-gray-700/30 transition-colors"
            >
                <span className="flex items-center gap-2">
                    {icon}
                    {title}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <FiChevronDown className="w-4 h-4 text-gray-400" />
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 pb-5">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default CollapsibleSection;
