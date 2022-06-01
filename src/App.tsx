import React from 'react';
import './App.css';
import { useAuth } from './context/auth-context';
// import {AuthenticatedApp} from './authenticated-app';
// import { UnauthenticatedApp } from './unauthenticated-app';
import fundebug from 'fundebug-javascript';
import { ErrorBoundary } from './components/error-boundary';
import {FullPageErrorFallback, FullPageLoading} from './components/lib';

const AuthenticatedApp = React.lazy(() => import("authenticated-app"));
const UnauthenticatedApp = React.lazy(() => import("unauthenticated-app"));

function App() {
  const { user } = useAuth();
  //fundebug.notify('test 3', '3');

  return (
    <div className='App'>
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        // React.Suspense: experimental feature
        <React.Suspense fallback={<FullPageLoading/>}>
          {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </React.Suspense>


      </ErrorBoundary>
    </div>
  );
}

export default App;
