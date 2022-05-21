import React, {FormEvent} from 'react';
import {useAuth} from "../context/auth-context";
import {Button, Form, Input} from "antd";
import {LongButton} from "./index";


export const RegisterScreen = () => {
    const {register, user} = useAuth()

    // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    //     event.preventDefault()
    //     const username = (event.currentTarget.elements[0] as HTMLInputElement).value
    //     const password = (event.currentTarget.elements[1] as HTMLInputElement).value
    //     register({username, password})
    // }

    const handleSubmit = (values: {username: string, password: string}) => {
        register(values);
    }

    return <Form onFinish={handleSubmit}>
        <Form.Item name={"username"} rules={[{required:true, message:"Please input username"}]}>
            <Input placeholder={"username"} type="text" id={"username"}/>
        </Form.Item>
        <Form.Item name={"password"} rules={[{required:true, message:"Please input password"}]}>
            <input placeholder={"password"} type="password" id={"password"}/>
        </Form.Item>
        <Form.Item>
            <LongButton htmlType={"submit"} type={"primary"}>Register</LongButton>
        </Form.Item>
    </Form>
}