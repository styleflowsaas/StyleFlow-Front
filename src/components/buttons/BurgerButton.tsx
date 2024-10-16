import React from "react";
import { MotionConfig, motion } from "framer-motion";

interface HamburgerButtonProps {
  toggle: (pv: boolean) => void;
  isCollapse: boolean;
}
export const HamburgerButton: React.FC<HamburgerButtonProps> = ({
  toggle,
  isCollapse,
}) => {
  return (
    <MotionConfig
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <motion.button
        initial={false}
        animate={isCollapse ? "closed" : "open"}
        onClick={() => toggle(!isCollapse)}
        className="relative h-10 w-10 rounded-full transition-colors "
      >
        <motion.span
          variants={VARIANTS.top}
          className="absolute h-0.5 w-5 bg-fondo-dark dark:bg-fondo-ligth"
          style={{ y: "-50%", left: "50%", x: "-50%", top: "35%" }}
        />
        <motion.span
          variants={VARIANTS.middle}
          className="absolute h-0.5 w-5 bg-fondo-dark dark:bg-fondo-ligth"
          style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
        />
      </motion.button>
    </MotionConfig>
  );
};

export default HamburgerButton;
const VARIANTS = {
  top: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      top: ["35%", "50%", "50%"],
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      top: ["50%", "50%", "35%"],
    },
  },
  middle: {
    open: {
      rotate: ["0deg", "0deg", "-45deg"],
    },
    closed: {
      rotate: ["-45deg", "0deg", "0deg"],
    },
  },
  bottom: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      bottom: ["35%", "50%", "50%"],
      left: "0%",
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      bottom: ["50%", "50%", "35%"],
      left: "50%",
    },
  },
};
