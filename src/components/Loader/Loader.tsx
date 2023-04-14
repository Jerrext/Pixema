import React from "react";
import styles from "./Loader.module.scss";
import Lottie from "lottie-react";

import loader from "src/assets/loader.json";

const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <Lottie
        style={{ width: 400, height: 400 }}
        animationData={loader}
        loop={true}
      />
    </div>
  );
};

export default Loader;
