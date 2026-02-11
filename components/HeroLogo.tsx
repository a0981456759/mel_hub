
import React from 'react';
import { motion } from 'framer-motion';

const HeroLogo: React.FC = () => {
  // Heavy mechanical spring
  const mechanicalSpring = {
    type: "spring",
    damping: 25,
    stiffness: 120,
    mass: 1.5,
  };

  return (
    <div className="heading-xl text-8xl md:text-[13rem] leading-[0.75] mb-12 select-none flex flex-col items-start font-black relative">

      {/* MEL - 從上方滑下來 */}
      <div className="relative overflow-hidden">
        {/* 垂直滑軌 */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-[3px] bg-gradient-to-b from-[#00F0FF] to-transparent"
          initial={{ height: 0, top: "-100px" }}
          animate={{ height: "100px", top: "-100px" }}
          transition={{ duration: 0.3, delay: 0 }}
        />
        <motion.div
          className="relative"
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...mechanicalSpring, delay: 0.2 }}
        >
          <span className="text-[#0F172A]">MEL</span>
          {/* 鎖定閃光 */}
          <motion.div
            className="absolute inset-0 bg-[#00F0FF]/40 blur-2xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ delay: 0.6, duration: 0.3 }}
          />
        </motion.div>
      </div>

      {/* CHAIN - 從右邊滑進來 */}
      <div className="relative overflow-hidden">
        {/* 水平滑軌 */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 h-[3px] bg-gradient-to-l from-[#00F0FF] to-transparent"
          initial={{ width: 0, right: "-150px" }}
          animate={{ width: "150px", right: "-150px" }}
          transition={{ duration: 0.3, delay: 0.5 }}
        />
        <motion.div
          className="relative"
          initial={{ x: 300, opacity: 0, rotate: 90 }}
          animate={{ x: 0, opacity: 1, rotate: 0 }}
          transition={{ ...mechanicalSpring, delay: 0.7 }}
        >
          <span className="text-[#2563EB] outline-text hover:text-[#00F0FF] transition-colors cursor-default">
            CHAIN
          </span>
          {/* 鎖定閃光 */}
          <motion.div
            className="absolute inset-0 bg-[#00F0FF]/40 blur-2xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ delay: 1.2, duration: 0.3 }}
          />
        </motion.div>
      </div>

      {/* LAB. - 從下方滑上來 */}
      <div className="relative overflow-hidden">
        {/* 垂直滑軌 */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-[3px] bg-gradient-to-t from-[#00F0FF] to-transparent"
          initial={{ height: 0, bottom: "-100px" }}
          animate={{ height: "100px", bottom: "-100px" }}
          transition={{ duration: 0.3, delay: 1.0 }}
        />
        <motion.div
          className="relative"
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...mechanicalSpring, delay: 1.2 }}
        >
          <span className="text-[#0F172A]">LAB.</span>
          {/* 鎖定閃光 */}
          <motion.div
            className="absolute inset-0 bg-[#00F0FF]/40 blur-2xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ delay: 1.6, duration: 0.3 }}
          />
        </motion.div>
      </div>

      {/* 組裝完成後的邊框 */}
      <motion.div
        className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-[#00F0FF]"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.8, type: "spring" }}
      />
      <motion.div
        className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-[#00F0FF]"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.9, type: "spring" }}
      />
      <motion.div
        className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-[#00F0FF]"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.0, type: "spring" }}
      />
      <motion.div
        className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-[#00F0FF]"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.1, type: "spring" }}
      />

      <style>{`
        .outline-text {
          -webkit-text-stroke: 2px #2563EB;
          color: transparent;
          paint-order: stroke fill;
        }
        @media (min-width: 768px) {
          .outline-text {
            -webkit-text-stroke: 3px #2563EB;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroLogo;
