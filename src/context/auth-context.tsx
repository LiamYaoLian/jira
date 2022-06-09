import React, {ReactNode, useCallback} from 'react';
import * as auth from 'auth-provider';
import {resetRoute, useMount} from '../utils';
import { http } from '../utils/http';
import {useQueryClient} from 'react-query';
import {User} from '../types/user';
import {useAsync} from '../utils/use-async';
import { FullPageErrorFallback, FullPageLoading } from 'components/lib';


interface AuthForm {
  username: string;
  password: string;
}

/**
 * a function to return user by sending token to backend
 */
const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http('me', { token });
    user = data.user;
  }
  return user;
};

/**
 * a context object
 */
const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = 'AuthContext';

/**
 * a function to return AuthContext.Provider component
 * @param children
 * @constructor
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {data: user, error, isLoading, isIdle, isError, run, setData: setUser} = useAsync<User | null>();
  const queryClient = useQueryClient();

  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then((user) => {
    setUser(null)
    // The clear method clears all connected caches.
    queryClient.clear()
    // after logging out, reset URL
    resetRoute()
  });

  // when a component is mounted, update user by sending token to backend
  useMount(useCallback(() => run(bootstrapUser()), []));

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  /*
  * The Provider component accepts a value prop to be passed to consuming components that are descendants of this Provider.
  * https://reactjs.org/docs/context.html#contextprovider
  * */
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

/**
 * A function to return the current context value
 */
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth can be used only in AuthProvider');
  }
  return context;
};
