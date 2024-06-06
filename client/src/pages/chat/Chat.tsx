import React from "react";
import { useFormStore } from "../../store";
import styles from "./Chat.module.scss";
import Messages from "../../components/Messages/Messages";
import { socket } from "../../socket";
import FormChat from "../../components/FormChat/FormChat";
import { useNavigate } from "react-router-dom";

export const Chat: React.FC = () => {
  const navigate = useNavigate();

  const { formData, setMessages, messages, countUsers, setCountUsers } =
    useFormStore((state) => state);

  React.useEffect(() => {
    socket.emit("join", formData);
  }, [formData]);

  React.useEffect(() => {
    socket.on("message", ({ data }) => {
      setMessages(data);
    });
  }, []);

  React.useEffect(() => {
    socket.on("joinRoom", ({ data }) => {
      setCountUsers(data.users.length);
    });
  }, []);

  const leftRoom = () => {
    socket.emit("leftRoom", { params: formData });
    navigate("/");
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.title}>{`Номер комнаты ${formData.room}`}</div>
        <div className={styles.user}>{countUsers} users in this room</div>
        <button className={styles.left} onClick={leftRoom}>
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
