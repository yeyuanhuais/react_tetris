import store from "@/store";
import { changeMusic } from "@/store/music";
import event from "@/unit/event";

const down = () => {
  const dispatch = store.dispatch;
  const { music: musicState, lock: lockState } = store.getState();
  dispatch(changeMusic(true));
  if (lockState) {
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
  store.dispatch(changeMusic(false));
  event.up({
    key: "music",
  });
};

export default {
  down,
  up,
};
