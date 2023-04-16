import { ReactNode } from "react";

type GroupButton = {
  title: ReactNode | string;
  link?: string;
  onClick?: () => void;
};

export type GroupButtonList = GroupButton[];
