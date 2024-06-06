import { create } from "zustand";
import { FieldType } from "./App";

export interface IMessage {
  user: { name: string };
  message: string;
}

interface IField {
  formData: FieldType;
  setFormData: (data: FieldType) => void;
  messages: IMessage[];
  setMessages: (message: IMessage) => void;
  messageChat: string;
  setMessageChat: (message: string) => void;
  countUsers: number;
  setCountUsers: (count: number) => void;
}

export const useFormStore = create<IField>((set, get) => ({
  formData: {},
  messages: [],
  messageChat: "",
  countUsers: 0,
  setFormData: (data: FieldType) => {
    set({ formData: data });
  },
  setMessages: (message: IMessage) =>
    set({ messages: [...get().messages, message] }),
  setMessageChat: (messegeChat: string) => set({ messageChat: messegeChat }),
  setCountUsers: (count: number) => set({ countUsers: count }),
}));
