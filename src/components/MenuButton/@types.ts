export enum MenuButtonType {
  DropDownButton,
  Link,
}

type DropDownItemType = {
  title: string;
  routeLink: string;
};

export type DropDownListType = DropDownItemType[];
