import React, { useState } from "react";
import styles from "src/pages/SignIn/SignIn.module.scss";
import Input from "src/components/Input";
import Switcher from "src/components/Switch";
import Tabs from "src/components/Tabs/";
import UserName from "src/components/UserName/";
import SelectComponent from "src/components/SelectComponent/";
import HomeLink from "src/components/HomeLink/";
import Button from "src/components/Button/";
import { ButtonType } from "src/components/Button/Button";
// import SelectComponent from "src/components/SelectComponent/";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
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
      <UserName userName="Daniil Kolpakov" />
      <SelectComponent title="Country" placeholder="Select country" />
      <HomeLink />
      <HomeLink disabled />
      <Button title="Primary" type={ButtonType.Primary} onClick={() => {}} />
      <Button
        title="Secondary"
        type={ButtonType.Secondary}
        onClick={() => {}}
      />
      <Button
        title="Disabled"
        type={ButtonType.Primary}
        disabled
        onClick={() => {}}
      />
    </div>
  );
};

export default SignIn;
