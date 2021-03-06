import React, { useEffect } from 'react';
import { Button, Drawer, Form, Input, Spin } from 'antd';
import { DrawerProps } from 'antd/es/drawer';
import styled from '@emotion/styled';
import { ErrorBox } from 'components/lib';
import { useAddEpic } from 'utils/epic';
import { useEpicsQueryKey } from 'screens/epic/util';
import { useProjectIdInUrl } from 'screens/kanban/util';

/**
 * CreateEpic component
 * @param props
 * @constructor
 */
export const CreateEpic = (props: Pick<DrawerProps, 'visible'> & { onClose: () => void }) => {
  const { mutate: addEpic, isLoading, error } = useAddEpic(useEpicsQueryKey());
  const [form] = Form.useForm();
  const projectId = useProjectIdInUrl();

  const onFinish = async (values: any) => {
    await addEpic({ ...values, projectId });
    props.onClose();
  };

  useEffect(() => form.resetFields(), [form, props.visible]);

  return (
    // forceRender: even if not visible， will still render it
    <Drawer
      visible={props.visible}
      onClose={props.onClose}
      forceRender={true}
      destroyOnClose={true}
      width={'100%'}
    >
      <Container>
        {isLoading ? (
          <Spin size={'large'} />
        ) : (
          <>
            <h1>Create Epic</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout={'vertical'}
              style={{ width: '40rem' }}
              onFinish={onFinish}
            >
              <Form.Item
                label={'Name'}
                name={'name'}
                rules={[{ required: true, message: 'Please input epic name' }]}
              >
                <Input placeholder={'Please input epic name'} />
              </Form.Item>

              <Form.Item style={{ textAlign: 'right' }}>
                <Button loading={isLoading} type={'primary'} htmlType={'submit'}>Submit</Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;