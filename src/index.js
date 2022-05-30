import "./wdyr";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {DevTools, loadServer} from "jira-dev-tool";
//import ReactDOM from 'react-dom';
// this should be imported after 'jira-dev-tool' so that it will override the styles in 'jira-dev-tool'
import "antd/dist/antd.less";
import * as fundebug from "fundebug-javascript";
import * as Sentry from "@sentry/react";
import {BrowserTracing} from "@sentry/tracing";
import {AppProviders} from "./context";


// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


Sentry.init({
  dsn: "https://cc49dd4bedf542f1b972f8fc4e022f26@o1261937.ingest.sentry.io/6440210",
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

fundebug.apikey =
  "be016abbbcf8ff9d35cdbde22a341d84edf938f630294b6d5491006c0bfd4cc7";
fundebug.notifierUrl = "http://127.0.0.1:10010/event/";
//fundebug.notifierUrl = "http://localhost:10010/event/";
//fundebug.test();
//Promise.reject("hello");
const ws = new WebSocket("wss://ap.fundebug.com/api/events/count");

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  componentDidCatch(error, info) {
    this.setState({hasError: true});
    // 将component中的报错发送到Fundebug
    fundebug.notifyError(error, {
      metaData: {
        info: info,
      },
    });
  }

  render() {
    // @ts-ignore
    if (this.state.hasError) {
      return null;
      // Note: 也可以在出错的component处展示出错信息，返回自定义的结果。
    }
    // @ts-ignore
    return this.props.children;
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));

loadServer(() =>
  root.render(
    <React.StrictMode>
      <AppProviders>
        <DevTools/>
        <ErrorBoundary>
          {/*<img src="notExist.jpg"/>*/}
          <App/>
        </ErrorBoundary>
      </AppProviders>
    </React.StrictMode>
  )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export const resetRoute = () => {
  window.location.href = window.location.origin;
};
