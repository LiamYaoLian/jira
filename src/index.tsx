import "./wdyr";
import React from "react";
import ReactDOM from "react-dom";
//import ReactDOM from "react-dom/client";
import enGB from 'antd/lib/locale/en_GB';
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {loadServer} from "./mocks";
import "antd/dist/antd.less";
import {AppProviders} from "context";
import {Profiler} from "components/profiler";
import {ConfigProvider} from "antd";

// TODO profiler

loadServer(() =>
  ReactDOM.render(
    <React.StrictMode>
      <Profiler id={"Root App"} phases={["mount"]}>
        <AppProviders>
          {/*<DevTools />*/}
          <ConfigProvider locale={enGB}>
          <App />
          </ConfigProvider>
        </AppProviders>
      </Profiler>
    </React.StrictMode>,
    document.getElementById("root")
  )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
