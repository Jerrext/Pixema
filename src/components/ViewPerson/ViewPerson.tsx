import React, { FC, useEffect, useState } from "react";
import styles from "./ViewPerson.module.scss";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { logoutUser } from "src/redux/reducers/authSlice";
import { SingleMovieCredits } from "src/redux/sagas/@types";
import { UnknownPersonIcon } from "src/assets/icons";

type ViewPersonProps = { personData: SingleMovieCredits };

const ViewPerson: FC<ViewPersonProps> = ({ personData }) => {
  const { name, pivot, poster } = personData;

  return (
    <>
      <span className={styles.name}>
        {name}
        <span className={styles.viewPerson}>
          <div className={styles.personPoster}>
            {poster ? <img src={poster} /> : <UnknownPersonIcon />}
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
