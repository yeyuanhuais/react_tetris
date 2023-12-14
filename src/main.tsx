import App from "@/App";
import "@/index.css";
import store from "@/store";
import { subscribeRecord } from "@/unit";
import * as React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

subscribeRecord(store); // 将更新的状态记录到
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
