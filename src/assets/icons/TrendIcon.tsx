import React from "react";

export const TrendIcon = ({
  width = "16",
  height = "16",
  fill = "#ffffff",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.03562 0L7.05711 2.17207C6.35791 3.72381 5.4208 5.13509 4.28586 6.34554L4.1573 6.47741C3.42839 7.24599 3.01192 8.29864 3.00023 9.40195V9.54158C2.98093 11.7021 4.1663 13.6609 6.00004 14.4985L6.18574 14.5839C7.38842 15.1387 8.7471 15.1387 9.94978 14.5839H9.99264C11.8401 13.7121 13.0254 11.7214 12.9996 9.53382V6.16712C12.3839 7.69418 11.2658 8.91683 9.86407 9.59588C9.86407 9.59588 9.86407 9.59588 9.82122 9.59588C9.77837 9.59588 9.2784 9.82084 9.06413 9.59588C8.87275 9.38556 8.85442 9.0538 9.02127 8.82014L9.07127 8.78135H9.10698C10.7467 7.42768 11.129 4.91952 9.97835 3.06417C9.04984 1.5282 8.03562 0 8.03562 0Z"
        fill={fill}
      />
    </svg>
  );
};