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
    const {data: projects, refetch} = useProjects()
    const pinnedProjects = projects?.filter(project => project.pin)
    const setRoute = (projectId: number) => {
        window.location.href = window.location.origin + '/projects/' + projectId
    }

    const content = <ContentContainer>
        <Typography.Text type={'secondary'}>Pinned Project</Typography.Text>
        <List>
            {
                pinnedProjects?.map(project => <List.Item>
                    {/*<List.Item.Meta title={project.name}/>*/}
                    <ButtonNoPadding
                      style={{textAlign: "left"}}
                      type={'link'}
                      onClick={() => setRoute(project.id)}>{project.name}</ButtonNoPadding>
                </List.Item>)
            }
        </List>
        <Divider/>
        <ButtonNoPadding onClick={open} type={'link'}>Create New Project</ButtonNoPadding>
    </ContentContainer>
    // onVisibleChange, refetch to refresh
    return <Popover onVisibleChange={() => refetch()} placement={'bottom'} content={content}><span>Project</span></Popover>
}

const ContentContainer = styled.div`
  min-width: 30rem;
`
