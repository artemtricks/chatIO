import React from "react";
import { IMessage } from "../../store";
import { FieldType } from "../../App";
import styles from "./Messages.module.scss";

type Props = {
  messages: IMessage[];
  formData: FieldType;
};

const Messages: React.FC<Props> = (props) => {
  const { messages, formData } = props;
  const { username } = formData;

  return (
    <div className={styles.messages}>
      {messages.map((item, i) => {
        const isMe =
          item.user.name.toLowerCase().trim() ===
          username?.toLowerCase().trim();

        const className = isMe ? styles.me : styles.user;

        return (
          <div key={i} className={`${className} ${styles.message}`}>
            <span className={styles.user}>{item.user.name}</span>
            <div className={styles.text}>{item.message}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
