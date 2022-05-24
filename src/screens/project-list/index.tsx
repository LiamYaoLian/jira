import React, {useState} from 'react';
import styled from '@emotion/styled';
import {Typography} from 'antd';
import {SearchPanel} from './search-panel';
import {List} from './list';
import {useDebounce, useDocumentTitle} from '../../utils';
import {useProjects} from "../../utils/project";
import {useUsers} from "../../utils/user";
import {useUrlQueryParam} from "../../utils/url";

export const ProjectListScreen = () => {



    const [param, setParam] = useUrlQueryParam(['name', 'personId'])
    const debouncedParam = useDebounce(param, 200)
    const {isLoading, error, data: list} = useProjects(debouncedParam)
    const {data: users} = useUsers()
    useDocumentTitle('Project List', false)



    return <Container>
        <h1>Project List</h1>
        <select onChange={evt => {
          const value = evt.target.value
          console.log(value, typeof value)
        }}>
            <option value={undefined}>Default Option</option>
            <option value={1}>Option 1</option>
        </select>
        <SearchPanel users={users || []} param={param} setParam={setParam}/>
        {error? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
        <List loading={isLoading} users={users || []} dataSource={list || []}/>
    </Container>
}

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
  padding: 3.2rem
`

