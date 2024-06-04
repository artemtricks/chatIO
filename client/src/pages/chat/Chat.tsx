import React from "react";
import { useFormStore } from "../../store";
import io from "socket.io-client";
import styles from "./Chat.module.scss";
import EmojiPicker from "emoji-picker-react";

export const Chat: React.FC = () => {
  const socket = io("http://localhost:5555");
  const { formData, setMessages, messages } = useFormStore((state) => state);
  const [messageInput, setMessageInput] = React.useState<string>();
  const [isOpen, setIsOpen] = React.useState(false);
  console.log(formData, "datatete", messages);
  console.log(messageInput, "messageInput");

  const onEmojiClick = () => {};

  const handleChange = (value: string) => {
    setMessageInput(value);
  };
  React.useEffect(() => {
    socket.emit("join", formData);
  }, [formData]);

  React.useEffect(() => {
    socket.on("message", ({ data }) => {
      console.log(data, "data");
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
        {messages.map((item, index) => (
          <span key={index}>{item.message}</span>
        ))}
      </div>
      <form className={styles.form}>
        <div className={styles.input}>
          <input
            type="text"
            name="message"
            placeholder="Введите что-нибудь"
            onChange={() => {}}
            required
            autoComplete="off"
            value={messageInput}
          />
        </div>
        <div className={styles.emoji}>
          <span onClick={() => setIsOpen((prev) => !prev)}>
            {!isOpen ? "😃" : "❌"}
          </span>
          {isOpen && (
            <div className={styles.emogies}>
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>
        <div className={styles.button}>
          <input type="submit" onSubmit={() => {}} value={"Send a message"} />
        </div>
      </form>
    </div>
  );
};
