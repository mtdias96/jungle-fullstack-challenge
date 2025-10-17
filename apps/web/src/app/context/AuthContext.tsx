import { createContext, useState } from 'react';
import { storageKeys } from '../config/storageKeys';
import { AuthService } from '../services/auth/AuthService';
import type { ISignUpDTO } from '../types/auth/signUp';

interface IAuthContext {
  signedIn: boolean;
  signIn(email: string, password: string): Promise<void>;
  signup(createOwner: ISignUpDTO): Promise<void>;
  signOut(): void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({} as IAuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const accessToken = sessionStorage.getItem(storageKeys.accessToken);

    return !!accessToken;
  });

  const signup = async (createUser: ISignUpDTO) => {
    const { accessToken } = await AuthService.signup(createUser);

    sessionStorage.setItem('accessToken', accessToken);

    setSignedIn(true);
  };

  const signIn = async (email: string, password: string) => {
    const { accessToken } = await AuthService.signin({ email, password });

    sessionStorage.setItem('accessToken', accessToken);

    setSignedIn(true);
  };

  const signOut = () => {
    sessionStorage.clear();
    setSignedIn(false);
  };

  const value: IAuthContext = {
    signedIn,
    signup,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
