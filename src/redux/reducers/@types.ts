import { CardListType } from "src/utils/@globalTypes";

export type PayloadWithCallback<Data> = {
  data: Data;
  callback: Callback;
};

export type Callback = () => void;

export type SigUpPayloadData = {
  email: string;
  password: string;
  password_confirmation: string;
  token_name: string;
};

export type SigInPayloadData = {
  email: string;
  password: string;
  token_name: string;
};

export type InputErrorsData = {
  email?: string[];
  password?: string[];
};

export type GetUserDataPayload = {
  id: number | string;
};

export type GetAllMoviesPayload = {
  page: number;
  order?: string;
  type?: string;
  genre?: string;
  released?: string;
  runtime?: string;
  score?: string;
  language?: string;
  certification?: string;
  country?: string;
  include_adult?: boolean;
};

export type SignUpUserPayload = PayloadWithCallback<SigUpPayloadData>;
export type SignInUserPayload = PayloadWithCallback<SigInPayloadData>;

export type ListValue = {
  itemId: number;
  itemType: string;
};

export type ListPayload = {
  id: number;
  value: ListValue;
};

export type MessagePayload = {
  status: boolean;
  message: string;
};

export type DetailsListType = {
  name: string;
  description: string;
  public: boolean;
};

export type DetailsListPayload = {
  id?: number;
  data: {
    details: DetailsListType;
  };
  token?: string;
};

export type FullListsPayload = {
  id: number;
  title: string;
  list: CardListType;
};

export type RemoveListPayload = {
  id: number;
  callback: () => void;
};

export type FiltersPayload = {
  page: number;
  order: string;
  type: string;
  genre: string;
  released: string;
  runtime: string;
  score: string;
  language: string;
  certification: string;
  country: string;
};

export type AddReviewPayload = {
  mediaId: number;
  mediaType: string;
  review?: string;
  score: number;
};

export type RatingDataType = {
  id: number;
  reviewableId: number;
  score: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
};
