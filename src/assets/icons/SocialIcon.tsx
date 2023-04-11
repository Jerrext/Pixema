import React from "react";

export const SocialIcon = ({
  width = "24",
  height = "24",
  stroke = "#AFB2B6",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="7.54545"
        cy="11.6364"
        r="2.54545"
        stroke={stroke}
        strokeWidth="2"
      />
      <circle
        cx="16.4546"
        cy="6.54545"
        r="2.54545"
        stroke={stroke}
        strokeWidth="2"
      />
      <circle
        cx="16.4546"
        cy="16.7273"
        r="2.54545"
        stroke={stroke}
        strokeWidth="2"
      />
      <path
        d="M13.9998 16L10.0908 13.5455M10.0908 10.5L13.9998 8"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
