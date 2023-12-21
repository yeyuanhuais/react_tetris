import { useThrottle } from "ahooks";
import { useEffect, useState } from "react";

export const useResize = () => {
  const [width, setWidth] = useState<number>(() => document.documentElement.clientWidth);
  const [height, setHeight] = useState<number>(document.documentElement.clientHeight);
  const throttleWidth = useThrottle(width, { wait: 500 });
  const throttleHeight = useThrottle(height, { wait: 500 });
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.addEventListener("resize", (e: { target: any }) => {
      setWidth(e.target.innerWidth);
      setHeight(e.target.innerHeight);
    });
    return () =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      window.removeEventListener("resize", (e: { target: any }) => {
        setWidth(e.target.innerWidth);
        setHeight(e.target.innerHeight);
      });
  }, []);

  return [throttleWidth, throttleHeight];
};
