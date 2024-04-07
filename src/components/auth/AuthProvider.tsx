import React, { createContext, useState } from "react";
import { fakeAuthProvider } from "./fakeAuth";

interface AuthContextType {
  user: any;
  password: any;
  signin: (user: string, password: any, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [password, setPassword] = useState<any>(null);

  const signin = (
    newUser: string,
    newPassword: string,
    callback: VoidFunction
  ) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      setPassword(newPassword);
      callback();
    });
  };

  const signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      setPassword(null);
      callback();
    });
  };

  const value = { user, password, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export default AuthProvider;
