import React from 'react';
import {Button, Divider, List, Popover, Typography} from "antd";
import {useProjects} from "../utils/project";
import styled from "@emotion/styled";
import { ButtonNoPadding } from './lib';

export const ProjectPopover = (props: {setProjectModalOpen: (isOpen: boolean) => void }) => {
    const {data: projects, isLoading} = useProjects()
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
        <ButtonNoPadding onClick={() => props.setProjectModalOpen(true)} type={'link'}>Create New Project</ButtonNoPadding>
    </ContentContainer>
    return <Popover placement={'bottom'} content={content}><span>Project</span></Popover>
}

const ContentContainer = styled(Button)`
  min-weight: 30rem;
  
`