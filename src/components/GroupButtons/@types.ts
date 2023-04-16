import { ReactNode } from "react";

type GroupButton = {
  title: ReactNode | string;
  buttonType: GroupButtonType;
  link?: string;
  onClick?: () => void;
};

export type GroupButtonList = GroupButton[];

export enum GroupButtonType {
  Link,
  Button,
}
