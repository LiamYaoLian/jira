import React from 'react';
import './App.css';
import { useAuth } from './context/auth-context';
import { AuthenticatedApp } from './authenticated-app';
import { UnauthenticatedApp } from './unauthenticated-app';
import fundebug from 'fundebug-javascript';
import { ErrorBoundary } from './components/error-boundary';
import { FullPageErrorFallback } from './components/lib';

function App() {
  const { user } = useAuth();
  fundebug.notify('test 3', '3');

  return (
    <div className='App'>
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}

      </ErrorBoundary>
        <button onClick={methodDoesNotExist}>Break the world</button>;
    </div>
  );
}

export default App;
