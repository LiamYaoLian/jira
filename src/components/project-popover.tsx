import React from 'react';
import {List, Popover, Typography} from "antd";
import {useProjects} from "../utils/project";
import styled from "@emotion/styled";

export const ProjectPopover = () => {
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

    </ContentContainer>
    return <Popover placement={'bottom'} content={content}><span>Project</span></Popover>
}

const ContentContainer = styled.div`
  min-weight: 30rem;
  
`