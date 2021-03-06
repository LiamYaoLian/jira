import './wdyr'; // must be the first line
import React from 'react';
import ReactDOM from 'react-dom';
//import ReactDOM from 'react-dom/client';
import enUS from 'antd/lib/locale/en_US';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {loadServer} from './mocks';
import 'antd/dist/antd.less';
import {AppProviders} from 'context';
import {Profiler} from 'components/profiler';
import {ConfigProvider} from 'antd';

loadServer(() =>
  ReactDOM.render(
    <React.StrictMode>
      <Profiler id={'Root App'} phases={['mount']}>
        <AppProviders>
          <ConfigProvider locale={enUS}>
          <App />
          </ConfigProvider>
        </AppProviders>
      </Profiler>
    </React.StrictMode>,
    document.getElementById('root')
  )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
