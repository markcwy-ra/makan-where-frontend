import { useRef, useEffect } from "react";

const useIsFirstRender = () => {
  const isFirstRender = useRef(true);
  useEffect(() => {
    isFirstRender.current = false;
  }, []);
  return isFirstRender.current;
};

const randomIndex = (arrayLength) => {
  return Math.floor(Math.random() * arrayLength);
};

export { useIsFirstRender, randomIndex };
