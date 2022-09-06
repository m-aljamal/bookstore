import React from "react";
import Modal from "components/Modal";
import { Logo } from "components/Logo";
import Button from "components/Button";
import AuthForm from "components/AuthForm";
import { FormData } from "lib/types";

interface UnAuthPageProps {
  login: (formData: FormData) => void;
  register: (formData: FormData) => void;
}
const UnAuthPage = ({ login, register }: UnAuthPageProps) => {
  const [showModal, setShowModal] = React.useState("null");

  return (
    <div>
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
        <AuthForm onSubmit={login} submitButton={<Button>Login</Button>} />
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
    </div>
  );
};

export default UnAuthPage;
