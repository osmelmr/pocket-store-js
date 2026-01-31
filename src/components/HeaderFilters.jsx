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
                className="fixed left-0 w-full  z-10 bg-white/80 backdrop-blur-md"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col md:flex-row gap-4 md:justify-between">
                        <div className="sm:hidden w-full md:w-48 bg-white rounded-lg">
                            <SearchFilter />
                        </div>
                        <div className="w-full md:w-48">
                            <CategoryFilter className="" />
                        </div>
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