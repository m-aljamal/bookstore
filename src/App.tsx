import React from "react";
import Button from "./components/Button";
import { Container } from "./components/Container";
import { Logo } from "./components/Logo";
import Modal from "./components/Modal";

interface FormData {
  username: string;
  password: string;
}

function App() {
  const [showModal, setShowModal] = React.useState("null");

  const login = (formData: FormData) => {
    console.log({ formData, login: "login" });
  };

  const register = (formData: FormData) => {
    console.log({ formData, register: "register" });
  };
  return (
    <Container>
      <div className="flex flex-col justify-center items-center h-screen space-y-3">
        <Logo width="75" height="75" />
        <h2 className="text-4xl font-bold">Bookshelf</h2>
        <div className="space-x-5">
          <Button className="px-[24px]" onClick={() => setShowModal("login")}>
            Login
          </Button>
          <Button variant="outline" onClick={() => setShowModal("register")}>
            Register
          </Button>
        </div>
      </div>
      <Modal
        showModal={showModal === "login"}
        onClose={() => setShowModal("null")}
        title="Login"
      >
        <AuthForm onSubmit={login} submitButton={<Button >Login</Button>} />
      </Modal>
      <Modal
        showModal={showModal === "register"}
        onClose={() => setShowModal("null")}
        title="Register"
      >
        <AuthForm
          onSubmit={register}
          submitButton={<Button variant="outline">Register</Button>}
        />
      </Modal>
    </Container>
  );
}

export default App;

interface AuthFormProps {
  onSubmit: (formData: FormData) => void;
  submitButton: React.ReactElement;
}

const AuthForm = ({ onSubmit, submitButton }: AuthFormProps) => {
  const handleSubmit = (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit({
      username: e.target.username.value,
      password: e.target.password.value,
    });
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex flex-col items-start space-y-2">
        <label htmlFor="email" className="">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className="w-full bg-gray-100 p-3"
        />
      </div>
      <div className="flex flex-col items-start space-y-2">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="w-full bg-gray-100 p-3"
        />
      </div>
      <div>
        {React.cloneElement(submitButton, {
          type: "submit",
        })}
      </div>
    </form>
  );
};
