import React from "react";
import { useFormStore } from "../../store";
import styles from "./Chat.module.scss";
import Messages from "../../components/Messages/Messages";
import { socket } from "../../socket";
import FormChat from "../../components/FormChat/FormChat";

export const Chat: React.FC = () => {
  const { formData, setMessages, messages } = useFormStore((state) => state);

  console.log(messages, "messages");

  React.useEffect(() => {
    socket.emit("join", formData);
  }, [formData]);

  React.useEffect(() => {
    socket.on("message", ({ data }) => {
      setMessages(data);
    });
  }, []);
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.title}>{`Номер комнаты ${formData.room}`}</div>
        <div className={styles.user}>0 users in this room</div>
        <button className={styles.left} onClick={() => {}}>
          Left the room
        </button>
      </div>
      <div className={styles.messages}>
        <Messages formData={formData} messages={messages} />
      </div>
      <FormChat />
    </div>
  );
};
