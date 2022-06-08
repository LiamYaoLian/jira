import React from 'react';
import './App.css';
import {useAuth} from './context/auth-context';
import {ErrorBoundary} from './components/error-boundary';
import {FullPageErrorFallback, FullPageLoading} from './components/lib';

// TODO
const AuthenticatedApp = React.lazy(() => import("authenticated-app"));
const UnauthenticatedApp = React.lazy(() => import("unauthenticated-app"));
const AdminApp = React.lazy(() => import ('admin-app'));

// TODO React.Suspense
function App() {
  const {user} = useAuth();

  return (
    <div className='App'>
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {/*React.Suspense: experimental feature*/}
        <React.Suspense fallback={<FullPageLoading/>}>
          {user ? (user.role === 'admin'? <AdminApp/> : <AuthenticatedApp/>) : <UnauthenticatedApp/>}
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
