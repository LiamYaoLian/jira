import React, { useEffect } from 'react';
import { useTasksModal, useTasksQueryKey } from 'screens/kanban/util';
import { useDeleteTask, useEditTask } from 'utils/task';
import { Button, Form, Input, Modal } from 'antd';
import { UserSelect } from 'components/user-select';
import { TaskTypeSelect } from 'components/task-type-select';
import { EpicSelect } from 'components/epic-select';

// span: how large
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

export const TaskModal = () => {
    const [form] = Form.useForm();
    const { editingTaskId, editingTask, close } = useTasksModal();
    const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(useTasksQueryKey());
    const { mutate: deleteTask } = useDeleteTask(useTasksQueryKey());

    const onCancel = () => {
        close();
        form.resetFields();
    };

    const onOk = async () => {
        await editTask({ ...editingTask, ...form.getFieldsValue() });
        close();
    };

    const startDelete = () => {
        close();
        Modal.confirm({
            okText: 'Confirm',
            cancelText: 'Cancel',
            title: 'Are you sure about deleting the task?',
            onOk() {
                return deleteTask({ id: Number(editingTaskId) });
            },
        });
    };

    useEffect(() => {
        form.setFieldsValue(editingTask);
    }, [form, editingTask]);

    return (
        <Modal
            forceRender={true}
            onCancel={onCancel}
            onOk={onOk}
            okText={'Confirm'}
            cancelText={'Cancel'}
            confirmLoading={editLoading}
            title={'Edit Task'}
            visible={!!editingTaskId}
        >
            {/* form: Form control instance created by Form.useForm() */}
            <Form {...layout} initialValues={editingTask} form={form}>
                <Form.Item
                    label={'Task Name'}
                    name={'name'}
                    rules={[{ required: true, message: 'Please input task name' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label={'Epic'} name={'epicId'}>
                    <EpicSelect defaultOptionName={'Epic'} />
                </Form.Item>
                <Form.Item label={'Processor'} name={'processorId'}>
                    <UserSelect defaultOptionName={'Processor'} />
                </Form.Item>
                <Form.Item label={'Type'} name={'typeId'}>
                    <TaskTypeSelect />
                </Form.Item>
            </Form>
            <div style={{ textAlign: 'right' }}>
                <Button onClick={startDelete} style={{ fontSize: '14px' }} size={'small'}>Delete</Button>
            </div>
        </Modal>
    );
};