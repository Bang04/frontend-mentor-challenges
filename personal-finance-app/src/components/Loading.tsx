"use client"
import { motion, Variants } from "motion/react"
export const Loading = () => {
    const dotVariants: Variants = {
        jump: {
            y: -30,
            transition: {
                duration: 0.8,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
            },
        },
    }

    return (
        <motion.div
            animate="jump"
            transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
            className="flex justify-center items-center w-dvw h-screen gap-3"
            style={{ willChange : 'transform' }}
        >
            <motion.div className="dot size-6 rounded-full bg-black" variants={dotVariants} />
            <motion.div className="dot size-6 rounded-full bg-black" variants={dotVariants} />
            <motion.div className="dot size-6 rounded-full bg-black" variants={dotVariants} />
        </motion.div>

    )
}