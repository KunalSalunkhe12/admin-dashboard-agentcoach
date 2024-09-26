import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const containerVariants = {
    start: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const circleVariants = {
    start: {
      y: "0%",
    },
    end: {
      y: "100%",
    },
  };

  const circleTransition = {
    duration: 0.5,
    yoyo: Infinity,
    ease: "easeInOut",
  };

  return (
    <div className="flex items-center rounded-3xl justify-center py-24 bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center">
        <motion.div
          className="flex justify-center mb-8"
          variants={containerVariants}
          initial="start"
          animate="end"
        >
          {[0, 1, 2].map((index) => (
            <motion.span
              key={index}
              className="w-4 h-4 bg-white rounded-full mx-1"
              variants={circleVariants}
              transition={circleTransition}
            />
          ))}
        </motion.div>
        <h2 className="text-3xl font-bold text-white mb-4">
          Loading AgentCoach.ai
        </h2>
        <p className="text-lg text-white opacity-80 mb-8">
          Preparing your amazing dashboard experience
        </p>
        <div className="flex justify-center items-center">
          <div className="w-64 h-2 bg-white bg-opacity-20 rounded-full overflow-hidden flex">
            <motion.div
              className="h-full bg-white"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        <p className="text-white mt-2">{Math.round(progress)}%</p>
      </div>
    </div>
  );
}
