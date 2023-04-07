import React, { useState } from "react";
import styles from "src/pages/SignIn/SignIn.module.scss";
import Input from "src/components/Input";
import Switcher from "src/components/Switch";
import Tabs from "src/components/Tabs/";

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
      <Switcher />
      <Switcher disabled />
      <Tabs onClick={() => {}} />
    </div>
  );
};

export default SignIn;
