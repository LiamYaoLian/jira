import React, { ReactNode, useState } from 'react';
import * as auth from 'auth-provider';
import {resetRoute, useMount} from '../utils';
import { http } from '../utils/http';
import {useQueryClient} from "react-query";
import {User} from "../types/user";


interface AuthForm {
  username: string;
  password: string;
}

/**
 * A function to return user by sending token to backend
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
 * An context object
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
 * A function to return AuthContext.Provider component
 * @param children
 * @constructor
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const queryClient = useQueryClient();

  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then((user) => {
    setUser(null)
    // TODO
    queryClient.clear()
    // TODO
    resetRoute()
  });

  useMount(() => {
    bootstrapUser().then(setUser);
  });

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
