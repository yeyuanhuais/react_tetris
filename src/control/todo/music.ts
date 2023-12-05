import event from "../../unit/event";
import { useAppDispatch, useAppSelector } from "@/hook/storeHook";
import { StoreReducer } from "@/store";
import { changeMusic } from "@/store/music";

const dispatch = useAppDispatch();
const {
  music: musicState,
  lock: lockState,
} = useAppSelector((state: StoreReducer) => state);
const down = (store) => {
  dispatch(changeMusic(true));
  if (store.getState().get("lock")) {
    return;
  }
  event.down({
    key: "music",
    once: true,
    callback: () => {
      if (lockState) {
        return;
      }
      dispatch(changeMusic(!musicState));
    },
  });
};

const up = () => {
  dispatch(changeMusic(false));
  event.up({
    key: "music",
  });
};

export default {
  down,
  up,
};
