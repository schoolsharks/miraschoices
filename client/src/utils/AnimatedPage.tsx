import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    x: '100vw',
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: '-100vw',
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const AnimatedPage = ({ Component, ...props }:any) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={pageVariants}
    transition={pageTransition}
    style={{flex:"1",display:"flex",flexDirection:"column"}}
  >
    <Component {...props} />
  </motion.div>
);

export default AnimatedPage;