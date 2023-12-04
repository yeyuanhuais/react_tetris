import "@/App.css";
import { useAppDispatch, useAppSelector } from "@/hook/storeHook";
import { useResize } from "@/hook/useResize";
import { StoreReducer } from "@/store";
import { useEffect, useState } from "react";
import { changeFocus } from "./store/focus";
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
          dispatch(changeFocus(isFocus()));
        },
        false
      );
    }
    return document.removeEventListener(
      visibilityChangeEvent,
      () => {
        dispatch(changeFocus(isFocus()));
      },
      false
    );
  }, []);
  return <></>;
}

export default App;
