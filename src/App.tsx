import React from 'react';
import './App.css';
import {useAuth} from './context/auth-context';
import {ErrorBoundary} from './components/error-boundary';
import {FullPageErrorFallback, FullPageLoading} from './components/lib';

const AuthenticatedApp = React.lazy(() => import("authenticated-app"));
const UnauthenticatedApp = React.lazy(() => import("unauthenticated-app"));
const AdminApp = React.lazy(() => import ('admin-app'));

function App() {
  const {user} = useAuth();

  return (
    <div className='App'>
        <ErrorBoundary fallbackRender={FullPageErrorFallback}>
          {/*React 16.6 added a <Suspense> component that lets you “wait” for some code to load and declaratively
        specify a loading state (like a spinner) while we’re waiting*/}
          {/*React.Suspense: experimental feature*/}
          <React.Suspense fallback={<FullPageLoading/>}>
            {user ? (user.role === 'admin'? <AdminApp/> : <AuthenticatedApp/>) : <UnauthenticatedApp/>}
          </React.Suspense>
        </ErrorBoundary>
    </div>
  );
}

export default App;

