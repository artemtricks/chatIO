import React from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, InputNumber } from "antd";
import { useNavigate } from "react-router-dom";
import { useFormStore } from "./store";
export type FieldType = {
  username?: string;
  room?: string;
};

const App: React.FC = () => {
  const { setFormData, formData } = useFormStore((state) => state);
  console.log(formData, "formdata");
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
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 900 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <h1>Войти в чат</h1>
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
