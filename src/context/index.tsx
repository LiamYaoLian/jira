import { ReactNode } from 'react';
import { AuthProvider } from './auth-context';
import { QueryClientProvider, QueryClient } from 'react-query';
import {store} from "../store";
import {Provider} from "react-redux";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
      <Provider store={store}>
          <QueryClientProvider client={new QueryClient()}>
              <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
      </Provider>

  );
};
