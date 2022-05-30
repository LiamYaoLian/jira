import React from 'react';
import {Button, Drawer} from "antd";
import {Spin, Form, Input} from "antd";
import {useAddProject, useEditProject} from "../../utils/project";
import {useProjectModal, useProjectsQueryKey} from "./util";
import { UserSelect } from "components/user-select";

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
        mutateAsync({ ...editingProject, ...values }).then(() => {
            form.resetFields();
            close();
        });
    };

    return <Drawer onClose={close} visible={projectModalOpen} width={'100%'}>
        {
            isLoading ? <Spin size={'large'}/> : <>
                <h1>{title}</h1>
                <Form
                  form={form}
                  layout={"vertical"}
                  style={{ width: "40rem" }}
                  onFinish={onFinish}
                >
                    <Form.Item
                      label={"name"}
                      name={"name"}
                      rules={[{ required: true, message: "Please input project name" }]}
                    >
                        <Input placeholder={"Please input project name"} />
                    </Form.Item>

                    <Form.Item
                      label={"department"}
                      name={"department"}
                      rules={[{ required: true, message: "Please input department name" }]}
                    >
                        <Input placeholder={"Please input department name"} />
                    </Form.Item>

                    <Form.Item label={"Person in Charge"} name={"personId"}>
                        <UserSelect defaultOptionName={"Person in Charge"} />
                    </Form.Item>

                    <Form.Item style={{ textAlign: "right" }}>
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
    </Drawer>
}