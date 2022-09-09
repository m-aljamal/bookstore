import UnAuthPage from "pages/UnAuthPage";
import React from "react";
import { FormData, User } from "lib/types";
import * as auth from "lib/auth-provider";
import { client } from "lib/Client";
import useAsync from "lib/useAsync";
import { BrowserRouter as Router } from "react-router-dom";
import AuthPage from "pages/AuthPage";

const getUser = async () => {
  let user = null;

  const token = await auth.getToken();

  if (token) {
    user = await client("http://localhost:3001/auth/me", { token });
  }

  return { ...user, token };
};

function App() {
  const {
    data: user,
    error,
    isError,
    isLoading,
    isIdle,
    isSuccess,
    setData,
    run,
  } = useAsync<User | null>();

  React.useEffect(() => {
    run(getUser());
  }, [run]);
  const login = (formData: FormData) =>
    auth
      .login({ email: formData.email, password: formData.password })
      .then((user: User) => setData(user));

  const register = (formData: FormData) => {
    console.log({ formData, register: "register" });
  };

  const logout = () => {
    auth.logout();
    setData(null);
  };
  if (isIdle || isLoading) {
    return <div>loading...</div>;
  }
  if (isError) {
    return <div>error {error?.message}</div>;
  }

  if (isSuccess) {
    return user ? (
      <Router>
        <AuthPage user={user} logout={logout} />
      </Router>
    ) : (
      <UnAuthPage login={login} register={register} />
    );
  } else {
    return <div>error</div>;
  }
}

export default App;
