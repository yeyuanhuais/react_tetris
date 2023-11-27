import { useThrottle } from "ahooks";
import { useEffect, useState } from "react";

export const useResize = () => {
  const [width, setWidth] = useState<number>(() => document.documentElement.clientWidth);
  const [height, setHeight] = useState<number>(document.documentElement.clientHeight);
  const throttleWidth = useThrottle(width, { wait: 500 });
  const throttleHeight = useThrottle(height, { wait: 500 });
  useEffect(() => {
    window.addEventListener("resize", e => {
      setWidth((e?.target as any).clientWidth);
      setHeight((e?.target as any).clientWidth);
    });
    return () =>
      window.removeEventListener("resize", e => {
        setWidth((e?.target as any).clientWidth);
        setHeight((e?.target as any).clientWidth);
      });
  }, []);

  return [throttleWidth, throttleHeight];
};
