/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from "framer-motion"
import { SearchFilter } from "./SearchFilter";
import { CategoryFilter } from "./CategoryFilter";
import { OrderFilter } from "./OrderFilter";

export const HeaderFilters = ({ isFiltersVisible }) => {

    return (<AnimatePresence>
        {isFiltersVisible && (
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="fixed left-0 w-full z-10 transition-colors duration-300
                         bg-white/80 backdrop-blur-md 
                         dark:bg-slate-900 dark:backdrop-blur-none
                            border-b border-gray-100 dark:border-slate-800"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row gap-4 md:justify-between">

                        {/* Buscador móvil - fondo adaptado */}
                        <div className="sm:hidden w-full md:w-48 bg-white dark:bg-slate-800 rounded-xl overflow-hidden">
                            <SearchFilter />
                        </div>

                        {/* Selector de Categoría */}
                        <div className="w-full md:w-48">
                            <CategoryFilter className="" />
                        </div>

                        {/* Selector de Orden */}
                        <div className="w-full md:w-48">
                            <OrderFilter className="" />
                        </div>

                    </div>
                </div>
            </motion.div>
        )}
    </AnimatePresence>
    )
}