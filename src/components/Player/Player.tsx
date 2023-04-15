import React, { FC, useEffect } from "react";

type PlayerProps = {
  title: string;
  year: number;
};

const Player: FC<PlayerProps> = ({ title, year }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//yohoho.cc/yo.js";
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return <div id="yohoho" data-title={`${title} (${year})`}></div>;
};

export default Player;
