import { useEffect, useState } from "react";
import "@/App.css";
import { useAppDispatch, useAppSelector } from "@/hook/storeHook";
import { StoreReducer } from "@/store";
import { useResize } from "@/hook/useResize";
import { isFocus, visibilityChangeEvent } from "./unit";

function App() {
  const [count, setCount] = useState(0);
  const music = useAppSelector((state: StoreReducer) => state.music.value);
  const dispatch = useAppDispatch();
  const [width, height] = useResize();
  useEffect(() => {
    if (visibilityChangeEvent) {
      document.addEventListener(
        visibilityChangeEvent,
        () => {
          dispatch("", isFocus());
        },
        false
      );
    }
    return document.removeEventListener(
      visibilityChangeEvent,
      () => {
        dispatch("", isFocus());
      },
      false
    );
  }, []);
  return <></>;
}

export default App;
