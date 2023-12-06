import * as React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import store from './store';
import { subscribeRecord } from "./unit/index.js";

console.log("%c 11111", "font-size:13px; background:pink; color:#bf2c9f;", );
subscribeRecord(store); // 将更新的状态记录到
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
