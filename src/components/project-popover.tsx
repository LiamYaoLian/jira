import React from 'react';
import {Button, Divider, List, Popover, Typography} from "antd";
import {useProjects} from "../utils/project";
import styled from "@emotion/styled";
import {ButtonNoPadding} from './lib';
import {useDispatch} from "react-redux";
import {projectListActions} from "../screens/project-list/project-list.slice";

export const ProjectPopover = () => {
    const dispatch = useDispatch()
    const {data: projects, isLoading} = useProjects()
    const pinnedProjects = projects?.filter(project => project.pin)

    const content = <ContentContainer>
        <Typography.Text type={'secondary'}>Pinned Project</Typography.Text>
        <List>
            {
                // TODO
                pinnedProjects?.map(project => <List.Item key={project.id}>
                    <List.Item.Meta title={project.name}/>
                </List.Item>)
            }
        </List>
        <Divider/>
        <ButtonNoPadding onClick={() => dispatch(projectListActions.openProjectModal())}
                         type={"link"}>Create Project</ButtonNoPadding>
    </ContentContainer>
    return <Popover placement={'bottom'} content={content}><span>Project</span></Popover>
}

// TODO
const ContentContainer = styled.div`
  min-weight: 30rem;

`