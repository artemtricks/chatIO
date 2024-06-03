import React from "react";
import { useFormStore } from "../store";
import io from "socket.io-client";

export const Chat: React.FC = () => {
  const socket = io("http://localhost:5555");
  const { formData, setMessages, messages } = useFormStore((state) => state);
  console.log(formData, "datatete", messages);

  React.useEffect(() => {
    socket.emit("join", formData);
  }, [formData]);

  React.useEffect(() => {
    socket.on("message", ({ data }) => {
      console.log(data, "data");
      setMessages(data);
    });
  }, []);
  return <div>Chat</div>;
};
