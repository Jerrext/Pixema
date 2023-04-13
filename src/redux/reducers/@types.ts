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

export type inputErrorsState = {
  email?: string[];
  password?: string[];
};

export type SignUpUserPayload = PayloadWithCallback<SigUpPayloadData>;
export type SignInUserPayload = PayloadWithCallback<SigInPayloadData>;
