import DiscoverBooksScreen from "pages/DiscoverBooksScreen";
import UnAuthPage from "pages/UnAuthPage";
import React from "react";
import { FormData, User } from "lib/types";
import * as auth from "lib/auth-provider";
import { client } from "lib/Client";

const getUser = async () => {
  let user = null;

  const token = await auth.getToken();

  if (token) {
    user = await client("http://localhost:3001/auth/me", { token });
  }

  return user;
};

function App() {
  const [user, setUser] = React.useState<User>();

  const login = (formData: FormData) =>
    auth
      .login({ email: formData.email, password: formData.password })
      .then((u: User) => setUser(u));

  const register = (formData: FormData) => {
    console.log({ formData, register: "register" });
  };

  React.useEffect(() => {
    getUser().then(setUser);
  }, []);

  return user ? (
    <DiscoverBooksScreen />
  ) : (
    <UnAuthPage login={login} register={register} />
  );
}

export default App;
