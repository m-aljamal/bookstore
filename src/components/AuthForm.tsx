import { FormData } from "lib/types";
import React from "react";

interface AuthFormProps {
  onSubmit: (formData: FormData) => void;
  submitButton: React.ReactElement;
}

const AuthForm = ({ onSubmit, submitButton }: AuthFormProps) => {
  const handleSubmit = (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit({
      email: e.target.email.value,
      password: e.target.password.value,
    });
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex flex-col items-start space-y-2">
        <label htmlFor="email" className="">
          email
        </label>
        <input
          type="text"
          name="email"
          id="email"
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

export default AuthForm;
