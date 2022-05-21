import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {loadDevTools} from 'jira-dev-tool';
//import ReactDOM from 'react-dom';
import {AppProviders} from "context";
// this should be imported after "jira-dev-tool" so that it will override the styles in "jira-dev-tool"
import "antd/dist/antd.less";

// loadDevTools(() => ReactDOM.render(
//     <React.StrictMode>
//         <AppProviders>
//             <App />
//         </AppProviders>
//
//     </React.StrictMode>,
//     document.getElementById('root')
// ))


// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
loadDevTools(() => root.render(
    <React.StrictMode>
        <AppProviders>
            <App />
        </AppProviders>

    </React.StrictMode>
))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
