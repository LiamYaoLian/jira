import React from 'react';
import {Form, Input, Select} from 'antd';

export interface User {
    id: string;
    name: string;
    email: string;
    title: string;
    organization: string
    token: string
}


interface SearchPanelProps {
    users: User[],
    param: {
        name: string;
        personId: string;
    }
    setParam: (param: SearchPanelProps['param']) => void;
}

export const SearchPanel = ({users, param, setParam}: SearchPanelProps) => {
    // , '>*': ''
    return <Form css={{marginBottom: '2rem'}} layout={'inline'}>
        <Form.Item>
            <Input type='text' placeholder={'Project Name'} value={param.name} onChange={evt => setParam({
                ...param,
                name: evt.target.value
            })}/>
        </Form.Item>
        <Form.Item>
            {/*<select value={param.personId} onChange={evt => setParam({*/}
            {/*       ...param,*/}
            {/*    personId: evt.target.value*/}
            {/*    })}>*/}
            {/*    <option value={''}>Person in charge</option>*/}
            {/*    {*/}
            {/*    users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)*/}
            {/*    }*/}
            {/*</select>*/}
            <Select value={param.personId} onChange={value => setParam({
                ...param,
                personId: value
            })}>
                <Select.Option value={''}>Person in charge</Select.Option>
                {
                    users.map(user => <Select.Option key={user.id} value={user.id}>{user.name}</Select.Option>)
                }
            </Select>
        </Form.Item>
    </Form>
}