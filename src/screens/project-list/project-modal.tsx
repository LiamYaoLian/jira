import React from 'react';
import {Button, Drawer, Form, Input, Spin} from "antd";
import {useAddProject, useEditProject} from "../../utils/project";
import {useProjectModal, useProjectsQueryKey} from "./util";
import {UserSelect} from "components/user-select";
import styled from "@emotion/styled";

export const ProjectModal = () => {
  const {projectModalOpen, close, editingProject, isLoading} = useProjectModal()
  const useMutateProject = editingProject ? useEditProject : useAddProject
  const title = editingProject ? 'Edit Project' : 'Create Project'
  const [form] = Form.useForm();

  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutateProject(useProjectsQueryKey());

  const onFinish = (values: any) => {
    mutateAsync({...editingProject, ...values}).then(() => {
      form.resetFields();
      close();
    });
  };

  return <Drawer onClose={close} visible={projectModalOpen} width={'100%'}>
    <Container>
      {
        isLoading ? <Spin size={'large'}/> : <>
          <h1>{title}</h1>
          <Form
            form={form}
            layout={"vertical"}
            style={{width: "40rem"}}
            onFinish={onFinish}
          >
            <Form.Item
              label={"Name"}
              name={"name"}
              rules={[{required: true, message: "Please input project name"}]}
            >
              <Input placeholder={"Please input project name"}/>
            </Form.Item>

            <Form.Item
              label={"Organization"}
              name={"organization"}
              rules={[{required: true, message: "Please input organization name"}]}
            >
              <Input placeholder={"Please input organization name"}/>
            </Form.Item>

            <Form.Item label={"Person in Charge"} name={"personId"}>
              <UserSelect defaultOptionName={"Person in Charge"}/>
            </Form.Item>

            <Form.Item style={{textAlign: "right"}}>
              <Button
                loading={mutateLoading}
                type={"primary"}
                htmlType={"submit"}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </>
      }
      <h1>Project Modal</h1>
      <Button onClick={close}>Close</Button>
    </Container>
  </Drawer>
}

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;