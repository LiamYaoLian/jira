import React from 'react';
import './App.css';
import {useAuth} from './context/auth-context';
import {AuthenticatedApp} from './authenticated-app';
import {UnauthenticatedApp} from './unauthenticated-app';
import fundebug from 'fundebug-javascript';
import {ErrorBoundary} from "./components/error-boundary";
import {FullPageErrorFallback} from "./components/lib";
//import {fundebug} from 'fundebug-reactnative';

// const fundebug : any = require("fundebug-reactnative");
// fundebug.init({
//   apikey: "fbde117182c6d7fc63fd2c6cd42ed7168cb80ea8c6daadb2ad8d4b67c8182c96"
// });

function App() {
  const {user} = useAuth()
  //fundebug.notify("test 3", "3")

  return (

    <div className='App'>
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
          {user? <AuthenticatedApp/> : <UnauthenticatedApp/>}
      </ErrorBoundary>

    </div>
  );
}

export default App;
