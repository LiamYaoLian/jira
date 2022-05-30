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
                      label={"名称"}
                      name={"name"}
                      rules={[{ required: true, message: "请输入项目名" }]}
                    >
                        <Input placeholder={"请输入项目名称"} />
                    </Form.Item>

                    <Form.Item
                      label={"部门"}
                      name={"organization"}
                      rules={[{ required: true, message: "请输入部门名" }]}
                    >
                        <Input placeholder={"请输入部门名"} />
                    </Form.Item>

                    <Form.Item label={"负责人"} name={"personId"}>
                        <UserSelect defaultOptionName={"负责人"} />
                    </Form.Item>

                    <Form.Item style={{ textAlign: "right" }}>
                        <Button
                          loading={mutateLoading}
                          type={"primary"}
                          htmlType={"submit"}
                        >
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </>
        }
        <h1>Project Modal</h1>
        <Button onClick={close}>Close</Button>
    </Drawer>
}