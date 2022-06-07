import React from 'react';
import {Button, Divider, List, Popover, Typography} from 'antd';
import {useProjects} from '../utils/project';
import styled from '@emotion/styled';
import { ButtonNoPadding } from './lib';
import {useProjectModal} from '../screens/project-list/util';

/**
 * ProjectPopover component
 * @constructor
 */
export const ProjectPopover = () => {
    const {open} = useProjectModal()
    // TODO refetch: how to implement
    const {data: projects, refetch} = useProjects()
    const pinnedProjects = projects?.filter(project => project.pin)

    const content = <ContentContainer>
        <Typography.Text type={'secondary'}>Pinned Project</Typography.Text>
        <List>
            {
                pinnedProjects?.map(project => <List.Item>
                    <List.Item.Meta title={project.name}/>
                </List.Item>)
            }
        </List>
        <Divider/>
        <ButtonNoPadding onClick={open} type={'link'}>Create New Project</ButtonNoPadding>
    </ContentContainer>
    return <Popover onVisibleChange={() => refetch()} placement={'bottom'} content={content}><span>Project</span></Popover>
}

const ContentContainer = styled.div`
  min-width: 30rem;
`