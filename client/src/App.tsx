import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, InputNumber } from "antd";
import { useNavigate } from "react-router-dom";
import { useFormStore } from "./store";
import styles from "./App.module.scss";
export type FieldType = {
  username?: string;
  room?: string;
};

const App: React.FC = () => {
  const { setFormData } = useFormStore((state) => state);

  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    if (values) {
      setFormData(values);
      navigate("/chat");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      className={styles.formAuth}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <h1 className={styles.title}>Войти в чат</h1>
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Room"
        name="room"
        rules={[{ required: true, message: "Please input your room number!" }]}
      >
        <InputNumber />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
