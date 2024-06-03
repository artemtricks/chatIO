import { create } from "zustand";
import { FieldType } from "./App";

interface IMessage {
  user: { name: string };
  message: string;
}

interface IField {
  formData: FieldType;
  setFormData: (data: FieldType) => void;
  messages: IMessage[];
  setMessages: (message: IMessage) => void;
}

export const useFormStore = create<IField>((set, get) => ({
  formData: {},
  messages: [],
  setFormData: (data: FieldType) => set({ formData: data }),
  setMessages: (message: IMessage) =>
    set({ messages: [...get().messages, message] }),
}));
