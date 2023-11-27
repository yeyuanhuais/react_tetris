import { useState } from "react";
import "@/App.css";
import { useAppDispatch, useAppSelector } from "@/hook/storeHook";
import { StoreReducer } from "@/store";
import { useResize } from "@/hook/useResize";

function App() {
  const [count, setCount] = useState(0);
  const music = useAppSelector((state: StoreReducer) => state.music.value);
  const dispatch = useAppDispatch();
  const [width, height] = useResize();
  return (
    <>
    </>
  );
}

export default App;
