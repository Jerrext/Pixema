export type PayloadWithCallback<Data> = {
  data: Data;
  callback: () => void;
};

export type SigUpPayloadData = {
  email: string;
  password: string;
  password_confirmation: string;
  token_name: string;
};

export type SigInPayloadData = {
  email: string;
  password: string;
  password_confirmation: string;
  token_name: string;
};

export type SignUpUserPayload = PayloadWithCallback<SigUpPayloadData>;
export type SignInUserPayload = PayloadWithCallback<SigInPayloadData>;
