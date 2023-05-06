import React, { useEffect, useMemo, useState } from "react";
import styles from "./SignIn.module.scss";
import FormPage from "../FormPage";
import { Link, useNavigate } from "react-router-dom";
import { RoutesList } from "src/pages/Router";
import Input from "src/components/Input";
import { reg } from "src/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  AuthSelectors,
  setInputErrors,
  signInUser,
} from "src/redux/reducers/authSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newError = useSelector(AuthSelectors.getEmailErrors);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const onSignInBtnClick = () => {
    dispatch(
      signInUser({
        data: {
          email,
          password,
          token_name: "qwe",
        },
        callback: () => {
          navigate(RoutesList.Home);
        },
      })
    );
  };

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
      if (password.length === 0) {
        setPasswordError("Password is required field");
      } else {
        setPasswordError("");
      }
    }
  }, [password, passwordTouched]);

  useEffect(() => {
    if (newError) {
      setEmailError(newError);
      setPasswordError(newError);
    }
    dispatch(setInputErrors(null));
  }, [newError]);

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
      titleFormPage="Sign In"
      buttonTitle="Sign in"
      disabledButton={!isValid}
      onClick={onSignInBtnClick}
      footerContent={
        <span>
          Don’t have an account? <Link to={RoutesList.SignUp}>Sign Up</Link>
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
      <div className={styles.passwordWrapper}>
        <Input
          value={password}
          title="Password"
          placeholder="Your password"
          errText={passwordError}
          onBlur={onBlurPassword}
          onChange={setPassword}
          inputType="password"
        />
        {/* <Link to={RoutesList.ResetPassword} className={styles.forgotPassword}>
          Forgot password?
        </Link> */}
      </div>
    </FormPage>
  );
};

export default SignIn;
