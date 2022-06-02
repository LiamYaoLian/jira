/**
 * SearchPanelProps
 */
import React from 'react';
import {Form, Input} from 'antd';
import {UserSelect} from 'components/user-select';
import {Project} from "../../types/project";

interface SearchPanelProps {
  param: Partial<Pick<Project, 'name' | 'personId'>>;
  setParam: (param: SearchPanelProps['param']) => void;
}

export const SearchPanel = ({param, setParam}: SearchPanelProps) => {
  return (
    <Form css={{marginBottom: '2rem'}} layout={'inline'}>
      <Form.Item>
        <Input
          type='text'
          placeholder={'Project Name'}
          value={param.name}
          onChange={(evt) => setParam({...param, name: evt.target.value})}
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName={'Person in Charge'}
          value={param.personId}
          onChange={(value) => setParam({...param, personId: value})}
        />
      </Form.Item>
    </Form>
  );
};
