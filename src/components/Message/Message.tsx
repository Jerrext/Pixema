import React, { FC, useEffect } from "react";
import styles from "./Message.module.scss";
import { CheckMarkIcon, ErrorIcon } from "src/assets/icons";
import { useDispatch } from "react-redux";
import { setMessage } from "src/redux/reducers/messageSlice";

type MessageProps = {
  status: boolean;
  message: string;
};

const Message: FC<MessageProps> = ({ status, message }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(setMessage(null));
    }, 1500);
  }, []);
  return (
    <div className={styles.message}>
      {status ? <CheckMarkIcon /> : <ErrorIcon />}
      <p>{message}</p>
    </div>
  );
};

export default Message;
