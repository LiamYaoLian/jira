/**
 * LoginScreen
 */
import React from "react";
import {useAuth} from "../context/auth-context";
import {Form, Input} from "antd";
import {LongButton} from "./index";
import {useAsync} from "../utils/use-async";

export const LoginScreen = ({onError,}: { onError: (error: Error) => void }) => {
  const {login} = useAuth();
  const {run, isLoading} = useAsync(undefined, {throwOnError: true});

  const handleSubmit = async (values: { username: string; password: string; }) => {
    try {
      await run(login(values));
    } catch (e) {
      onError(e as Error);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name={"username"} rules={[{required: true, message: "Please input username"}]}>
        <Input placeholder={"username"} type="text" id={"username"}/>
      </Form.Item>
      <Form.Item name={"password"} rules={[{required: true, message: "Please input password"}]}>
        <Input placeholder={"password"} type="password" id={"password"}/>
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>Log In</LongButton>
      </Form.Item>
    </Form>
  );
};
