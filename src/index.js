import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { loadServer, DevTools} from 'jira-dev-tool';
//import ReactDOM from 'react-dom';
import {AppProviders} from 'context';
// this should be imported after 'jira-dev-tool' so that it will override the styles in 'jira-dev-tool'
import 'antd/dist/antd.less';
//import * as fundebug from 'fundebug-nodejs';

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

var fundebug = require("fundebug-javascript");
fundebug.apikey = "fbde117182c6d7fc63fd2c6cd42ed7168cb80ea8c6daadb2ad8d4b67c8182c96";
//
// class ErrorBoundary extends React.Component {
//     constructor(props : any) {
//         super(props);
//         this.state = { hasError: false };
//     }
//
//     componentDidCatch(error: any, info: any) {
//         this.setState({ hasError: true });
//         // 将component中的报错发送到Fundebug
//         fundebug.notifyError(error, {
//             metaData: {
//                 info: info
//             }
//         });
//     }
//
//     render() {
//         // @ts-ignore
//         if (this.state.hasError) {
//             return null;
//             // Note: 也可以在出错的component处展示出错信息，返回自定义的结果。
//         }
//         // @ts-ignore
//         return this.props.children;
//     }
// }



// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement);
// loadServer(() => root.render(
//     <React.StrictMode>
//         <AppProviders>
//             <DevTools/>
//                     <App />
//         </AppProviders>
//     </React.StrictMode>
// ))

const root = ReactDOM.createRoot(
  document.getElementById('root'));
loadServer(() => root.render(
    <React.StrictMode>
        <AppProviders>
            <DevTools/>
                    <App />
        </AppProviders>
    </React.StrictMode>
))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
