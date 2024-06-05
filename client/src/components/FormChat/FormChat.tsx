import React from "react";
import styles from "./FormChat.module.scss";
import { useFormStore } from "../../store";
import { socket } from "../../socket";
import EmojiPicker from "emoji-picker-react";

const FormChat = () => {
  const { formData, messageChat, setMessageChat } = useFormStore(
    (state) => state
  );

  const [isOpen, setIsOpen] = React.useState(false);
  const onEmojiClick = ({ emoji }: { emoji: string }) => {
    setMessageChat(`${messageChat} ${emoji}`);
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setMessageChat(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!messageChat) return;
    socket.emit("sendMessage", { message: messageChat, params: formData });
    setMessageChat("");
  };

  return (
    <form className={styles.form} onSubmit={(e) => handleSubmit(e as any)}>
      <div className={styles.input}>
        <input
          type="text"
          name="message"
          placeholder="Введите что-нибудь"
          onChange={handleChange}
          required
          autoComplete="off"
          value={messageChat}
        />
      </div>
      <div className={styles.emoji}>
        <span onClick={() => setIsOpen((prev) => !prev)}>
          {!isOpen ? "😃" : "❌"}
        </span>
        {isOpen && (
          <div className={styles.emojies}>
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
      </div>
      <div className={styles.button}>
        <input type="submit" onSubmit={handleSubmit} value={"Send a message"} />
      </div>
    </form>
  );
};

export default FormChat;
