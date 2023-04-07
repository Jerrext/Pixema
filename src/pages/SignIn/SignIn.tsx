import React, { useState } from "react";
import styles from "src/pages/SignIn/SignIn.module.scss";
import Input from "src/components/Input/";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className={styles.signInWrapper}>
      <Input
        value={email}
        placeholder="Your email"
        title="Email"
        inputType="email"
        onChange={setEmail}
      />
      <Input
        value={password}
        placeholder="Your password"
        title="Password"
        inputType="password"
        onChange={setPassword}
      />
    </div>
  );
};

export default SignIn;
