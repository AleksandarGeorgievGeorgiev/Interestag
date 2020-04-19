import React from "react";
import LoginForm from "./LoginForm";
import Header from "../core/Header";

function LoginScreen() {
  return (
    <div className="body">
      <Header />
      <LoginForm />
    </div>
  );
}

export default LoginScreen;
