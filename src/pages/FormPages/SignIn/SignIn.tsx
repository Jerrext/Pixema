import React, { useEffect, useMemo, useState } from "react";
import styles from "./SignIn.module.scss";
import { CardListType } from "src/utils/@globalTypes";
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
// import SelectComponent from "src/components/SelectComponent/";

const cardList = [
  {
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
    rating: "7.9",
    vote_count: 2657,
  },
  {
    id: 2,
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
  },
  {
    id: 3,
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
  },
  {
    id: 4,
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
  },
  {
    id: 5,
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
  },
  {
    id: 6,
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
  },
  {
    id: 7,
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
  },
  {
    id: 8,
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
  },
  {
    id: 9,
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
  },
  {
    id: 10,
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
    rating: "7",
    vote_count: 2657,
  },
];

const cardList2: CardListType = [];

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

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
    { value: "chocdolate", label: "Chocolate" },
    { value: "strawdberry", label: "Strawberry" },
    { value: "vanidlla", label: "Vanilla" },
  ];

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
        <Link to={RoutesList.ResetPassword} className={styles.forgotPassword}>
          Forgot password?
        </Link>
      </div>
    </FormPage>
  );
};

export default SignIn;
