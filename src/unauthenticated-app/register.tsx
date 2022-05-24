import React, {FormEvent} from 'react';
import {useAuth} from '../context/auth-context';
import {Button, Form, Input} from 'antd';
import {LongButton} from './index';


export const RegisterScreen = ({onError} : {onError: (error: Error) => void}) => {
    const {register} = useAuth()


    // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    //     event.preventDefault()
    //     const username = (event.currentTarget.elements[0] as HTMLInputElement).value
    //     const password = (event.currentTarget.elements[1] as HTMLInputElement).value
    //     register({username, password})
    // }

    const handleSubmit = ({confirmedPassword, ...values}: {username: string, password: string, confirmedPassword: string }) => {

        if (confirmedPassword !== values.password) {
            onError(new Error('Please ensure passwords entered are the same'))
            return
        }

        register(values)
            .catch((e) => onError(e))

    }

    return <Form onFinish={handleSubmit}>
        <Form.Item name={'username'} rules={[{required:true, message:'Please input username'}]}>
            <Input placeholder={'username'} type='text' id={'username'}/>
        </Form.Item>
        <Form.Item name={'password'} rules={[{required:true, message:'Please input password'}]}>
            <input placeholder={'password'} type='password' id={'password'}/>
        </Form.Item>
        <Form.Item name={'confirmPassword'} rules={[{required:true, message:'Please confirm password'}]}>
            <input placeholder={'confirm password'} type='password' id={'confirmPassword'}/>
        </Form.Item>
        <Form.Item>
            <LongButton htmlType={'submit'} type={'primary'}>Register</LongButton>
        </Form.Item>
    </Form>
}