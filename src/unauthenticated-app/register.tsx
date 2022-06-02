/**
 * RegisterScreen
 */
import React from 'react';
import {useAuth} from '../context/auth-context';
import {Form, Input} from 'antd';
import {LongButton} from './index';
import {useAsync} from '../utils/use-async';

export const RegisterScreen = ({onError}: { onError: (error: Error) => void }) => {
  const {register} = useAuth();
  const {run, isLoading} = useAsync(undefined, {throwOnError: true});

  const handleSubmit = async ({confirmedPassword, ...values}: {
    username: string;
    password: string;
    confirmedPassword: string;
  }) => {
    if (confirmedPassword !== values.password) {
      onError(new Error('Please ensure passwords entered are the same'));
      return;
    }

    await run(register(values)).catch((e) => onError(e));
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name={'username'} rules={[{required: true, message: 'Please input username'}]}>
        <Input placeholder={'username'} type='text' id={'username'}/>
      </Form.Item>
      <Form.Item name={'password'} rules={[{required: true, message: 'Please input password'}]}>
        <input placeholder={'password'} type='password' id={'password'}/>
      </Form.Item>
      <Form.Item name={'confirmedPassword'} rules={[{required: true, message: 'Please confirm password'}]}>
        <input placeholder={'confirm password'} type='password' id={'confirmedPassword'}/>
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={'submit'} type={'primary'}>Register</LongButton>
      </Form.Item>
    </Form>
  );
};
