import { motion } from "framer-motion";

export const AnimatedPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0, filter: "blur(5px)" }}
      animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
      // exit={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
      transition={{
        duration: 0.25,
        ease: "easeInOut",
      }}
      className="max-h-screen"
    >
      {children}
    </motion.div>
  );
};
