import React, { useEffect, useMemo, useState } from "react";
import styles from "./SignUp.module.scss";
import FormPage from "../FormPage";
import { Link } from "react-router-dom";
import { RoutesList } from "src/pages/Router";
import Input from "src/components/Input";
import { reg } from "src/utils/constants";
// import SelectComponent from "src/components/SelectComponent/";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [userNameError, setUserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [passwordTouched, setPasswordTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [userNameTouched, setUserNameTouched] = useState(false);

  const onBlurUserName = () => {
    setUserNameTouched(true);
  };

  const onBlurEmail = () => {
    setEmailTouched(true);
  };

  const onBlurPassword = () => {
    setPasswordTouched(true);
  };

  useEffect(() => {
    if (userNameTouched) {
      if (userName.length === 0) {
        setUserNameError("Name is required field");
      } else {
        setUserNameError("");
      }
    }
  }, [userName, userNameTouched]);

  useEffect(() => {
    if (emailTouched) {
      if (email.length === 0) {
        setEmailError("Email is required field");
      } else if (!reg.test(email)) {
        setEmailError("Enter a valid email");
      } else {
        setEmailError("");
      }
    }
  }, [email, emailTouched]);

  useEffect(() => {
    if (passwordTouched) {
      if (password !== confirmPassword) {
        setPasswordError("Passwords must match");
      } else if (password.length === 0 || confirmPassword.length === 0) {
        setPasswordError("Password is required field");
      } else {
        setPasswordError("");
      }
    }
  }, [confirmPassword, password, passwordTouched]);

  const isValid = useMemo(() => {
    return (
      emailError.length === 0 &&
      passwordError.length === 0 &&
      userNameError.length === 0 &&
      userNameTouched &&
      emailTouched &&
      passwordTouched
    );
  }, [
    emailError,
    passwordError,
    userNameError,
    userNameTouched,
    emailTouched,
    passwordTouched,
  ]);

  return (
    <FormPage
      titleFormPage="Sign Up"
      buttonTitle="Sign up"
      disabledButton={!isValid}
      onClick={() => {}}
      footerContent={
        <span>
          Already have an account? <Link to={RoutesList.SignIn}>Sign In</Link>
        </span>
      }
    >
      <Input
        value={userName}
        title="Name"
        placeholder="Your name"
        errText={userNameError}
        onBlur={onBlurUserName}
        onChange={setUserName}
        inputType="text"
      />
      <Input
        value={email}
        title="Email"
        placeholder="Your email"
        errText={emailError}
        onBlur={onBlurEmail}
        onChange={setEmail}
        inputType="email"
      />
      <Input
        value={password}
        title="Password"
        placeholder="Your password"
        errText={passwordError}
        onBlur={onBlurPassword}
        onChange={setPassword}
        inputType="password"
      />
      <Input
        value={confirmPassword}
        title="Confirm password"
        placeholder="Confirm password"
        errText={passwordError}
        onBlur={onBlurPassword}
        onChange={setConfirmPassword}
        inputType="password"
      />
    </FormPage>
  );
};

export default SignUp;
