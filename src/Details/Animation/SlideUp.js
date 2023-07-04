import { motion } from "framer-motion";

const SlideUp = ({ children, className }) => {
  return (
    <motion.div
      animate={{ y: 0 }}
      initial={{ y: 500 }}
      exit={{ y: 500 }}
      transition={{ type: "tween", duration: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
export default SlideUp;
