import { createContext, useState, useEffect, useMemo, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/router';

// import { User } from '../types';
import { NEXT_URL } from '../config/index';

type User = {
  username: string;
  email: string;
  password: string;
}

type UserLogin ={
  email: string;
  password: string;
}

type Context = {
    user: string | null;
    error: string | null;
    register: (user: User) => void;
    login: ({
        email,
        password,
      }: UserLogin) => void;
    logout: () => void;
}

const defaultValues: Context = {
    user: null,
    error: null,
    register: () => { },
    login: () => { },
    logout: () => { },
};

  const AuthContext = createContext(defaultValues);


  export const AuthProvider = (props: { children: ReactNode }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const router = useRouter();

    useEffect(() => {
      checkUserLoginIn();
    }, []);

     // Register user
  const register = useCallback(
    async (user: User) => {
      const res = await fetch(`${NEXT_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        router.push("/account/dashboard");
      } else {
        setError(data.message);
        // setError(null);
      }
    },
    [router]
  );

  // Login user
  // Optimizing re-renders with useCallback and useMemo
  // ref. https://beta.reactjs.org/apis/react/useContext#optimizing-re-renders-when-passing-objects-and-functions
  const login = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      const identifier = email;

      const res = await fetch(`${NEXT_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      }
      );

      const data = await res.json();
      setError(null);

      if (res.ok) {
        setUser(data.user);
        router.push("/account/dashboard");
      } else {
        setError(data.message);
      }
    },
    [router]
  );

  // Logout user
  const logout = useCallback(async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: "POST",
    });

    if (res.ok) {
      setUser(null);
      router.push("/");
    }
  }, [router]);

  // Check if user is logged in
  const checkUserLoginIn = async () => {
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  };

    const contextValue = useMemo(
        () => ({
          user,
          error,
          login,
          register,
          logout,
        }),
        [user, error, login, register, logout]
      );
    return (
      <AuthContext.Provider value={contextValue}>
        {props.children}
      </AuthContext.Provider>
    );
  };

  export default AuthContext;