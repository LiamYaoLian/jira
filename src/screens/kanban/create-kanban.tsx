import React, { useState } from 'react';
import { useKanbansQueryKey, useProjectIdInUrl } from 'screens/kanban/util';
import { useAddKanban } from 'utils/kanban';
import { Input } from 'antd';
import { Container } from 'screens/kanban/kanban-column';

/**
 * CreateKanban component
 * @constructor
 */
export const CreateKanban = () => {
    const [name, setName] = useState('');
    const projectId = useProjectIdInUrl();
    const { mutateAsync: addKanban } = useAddKanban(useKanbansQueryKey());

    const submit = async () => {
        await addKanban({ name, projectId });
        setName('');
    };

    return (
        <Container>
            <Input
                size={'large'}
                placeholder={'Create Kanban Name'}
                onPressEnter={submit}
                value={name}
                onChange={(evt) => setName(evt.target.value)}
            />
        </Container>
    );
};