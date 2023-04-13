import React, { useEffect, useMemo, useState } from "react";
import styles from "./SignUp.module.scss";
import FormPage from "../FormPage";
import { Link, useNavigate } from "react-router-dom";
import { RoutesList } from "src/pages/Router";
import Input from "src/components/Input";
import { reg } from "src/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  AuthSelectors,
  setRegisterErrors,
  signUpUser,
} from "src/redux/reducers/authSlice";
// import SelectComponent from "src/components/SelectComponent/";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newEmailError = useSelector(AuthSelectors.getEmailErrors);
  const newPasswordError = useSelector(AuthSelectors.getPasswordErrors);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [passwordTouched, setPasswordTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);

  const onBlurEmail = () => {
    setEmailTouched(true);
  };

  const onBlurPassword = () => {
    setPasswordTouched(true);
  };

  const onSignUpBtnClick = () => {
    dispatch(
      signUpUser({
        data: {
          email,
          password,
          password_confirmation: confirmPassword,
          token_name: "qwe",
        },
        callback: () => {
          navigate(RoutesList.SignIn);
        },
      })
    );
  };

  useEffect(() => {
    if (emailTouched) {
      if (email.length === 0) {
        setEmailError("Email is required field.");
      } else if (!reg.test(email)) {
        setEmailError("Enter a valid email.");
      } else {
        setEmailError("");
      }
    }
  }, [email, emailTouched]);

  useEffect(() => {
    newEmailError && setEmailError(newEmailError);
    newPasswordError && setPasswordError(newPasswordError);
    dispatch(setRegisterErrors(null));
  }, [newEmailError, newPasswordError]);

  useEffect(() => {
    if (passwordTouched) {
      if (password !== confirmPassword) {
        setPasswordError("Passwords must match.");
      } else if (password.length === 0 || confirmPassword.length === 0) {
        setPasswordError("Password is required field.");
      } else if (password.length < 5) {
        setPasswordError("The password must be at least 5 characters.");
      } else {
        setPasswordError("");
      }
    }
  }, [confirmPassword, password, passwordTouched]);

  const isValid = useMemo(() => {
    return (
      emailError.length === 0 &&
      passwordError.length === 0 &&
      emailTouched &&
      passwordTouched
    );
  }, [emailError, passwordError, emailTouched, passwordTouched]);

  return (
    <FormPage
      titleFormPage="Sign Up"
      buttonTitle="Sign up"
      disabledButton={!isValid}
      onClick={onSignUpBtnClick}
      footerContent={
        <span>
          Already have an account? <Link to={RoutesList.SignIn}>Sign In</Link>
        </span>
      }
    >
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
