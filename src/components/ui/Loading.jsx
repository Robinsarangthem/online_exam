import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <motion.div
                className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
                animate={{
                    rotate: 360
                }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
            <motion.p
                className="mt-4 text-lg text-gray-700 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                Loading...
            </motion.p>
        </div>
    );
};

export default Loading;