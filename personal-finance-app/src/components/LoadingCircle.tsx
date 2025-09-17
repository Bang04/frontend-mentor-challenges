"use client"

import { motion } from "motion/react"

export const  LoadingCircle = () => {
    return (
        <div className="flex justify-center items-center p-10 rounded-lg">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                }}
                 className="w-12 h-12 rounded-full border-4 border-gray-300 animate-spin"
                   style={{ borderTopColor: "#000" }} 
            />
        </div>
    )
}
