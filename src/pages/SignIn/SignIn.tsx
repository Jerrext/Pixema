import React, { useState } from "react";
import styles from "src/pages/SignIn/SignIn.module.scss";
import Input from "src/components/Input";
import Switcher from "src/components/Switch";
import Tabs from "src/components/Tabs/";
import UserName from "src/components/UserName/";
import SelectComponent from "src/components/SelectComponent/";
import HomeLink from "src/components/HomeLink/";
import Button from "src/components/Button/";
import Arrow from "src/components/Arrow";
import GroupButtons from "src/components/GroupButtons";
import Search from "src/components/Search";
import { ButtonType } from "src/utils/@globalTypes";
import Card from "src/components/Card/Card";
// import SelectComponent from "src/components/SelectComponent/";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const card = {
    id: 1,
    name: "The Suicide Squad",
    release_date: "2021-07-28T00:00:00.000000Z",
    year: "2021",
    tagline: "They're dying to save the world.",
    poster:
      "https://upload.wikimedia.org/wikipedia/ru/8/89/%D0%A1%D0%B0%D0%BC%D0%BE%D0%BB%D1%91%D1%82_%28%D1%84%D0%B8%D0%BB%D1%8C%D0%BC%2C_2023%29.png",
    backdrop:
      "https://image.tmdb.org/t/p/w1280/jlGmlFOcfo8n5tURmhC7YVd4Iyy.jpg",
    runtime: 132,
    budget: 180000000,
    revenue: 121261711,
    popularity: 5659,
    tmdb_id: 436969,
    imdb_id: "tt6334354",
    is_series: false,
    adult: false,
    season_count: 0,
    episode_count: 0,
    series_ended: false,
    language: "en",
    original_title: "The Suicide Squad",
    certification: "r",
    rating: "8.1",
    vote_count: 2657,
  };
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
      <Arrow onClick={() => {}} />
      <Arrow disabled onClick={() => {}} />
      <GroupButtons />
      <GroupButtons disabled />
      <Search />
      <Search disabled />
      <Card card={card} />
      <Card card={card} bookmark />
    </div>
  );
};

export default SignIn;
