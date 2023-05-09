import React, { FC } from "react";
import styles from "./ViewPerson.module.scss";
import classNames from "classnames";
import { SingleMovieCredits } from "src/redux/sagas/@types";
import { UnknownPersonIcon } from "src/assets/icons";
import { Theme, useThemeContext } from "src/Context/Theme/Context";

type ViewPersonProps = { personData: SingleMovieCredits };

const ViewPerson: FC<ViewPersonProps> = ({ personData }) => {
  const { name, pivot, poster } = personData;

  const { theme } = useThemeContext();

  return (
    <>
      <span className={styles.name}>
        {name}
        <span
          className={classNames(styles.viewPerson, {
            [styles.viewPersonLight]: theme === Theme.Light,
          })}
        >
          <div className={styles.personPoster}>
            <UnknownPersonIcon />
            <img src={poster} />
          </div>
          <div className={styles.personDescription}>
            <p>
              <span>Name: </span>
              <span>{name}</span>
            </p>
            {pivot.character && (
              <p>
                <span>Character: </span>
                <span>{pivot.character}</span>
              </p>
            )}
            <p>
              <span>Job: </span>
              <span>{pivot.job[0].toUpperCase() + pivot.job.slice(1)}</span>
            </p>
          </div>
        </span>
      </span>
      {", "}
    </>
  );
};

export default ViewPerson;
