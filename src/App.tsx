import React from 'react';
import './App.css';
import {useAuth} from './context/auth-context';
import {AuthenticatedApp} from './authenticated-app';
import {UnauthenticatedApp} from './unauthenticated-app';
//import {fundebug} from 'fundebug-reactnative';

// const fundebug : any = require("fundebug-reactnative");
// fundebug.init({
//   apikey: "fbde117182c6d7fc63fd2c6cd42ed7168cb80ea8c6daadb2ad8d4b67c8182c96"
// });

function App() {
  const {user} = useAuth()
  // fundebug.notify("Test", "Hello, Fundebug!")
  // fundebug.text()

  return (

    <div className='App'>
      {user? <AuthenticatedApp/> : <UnauthenticatedApp/>}
    </div>
  );
}

export default App;
