import React from 'react';
import { useTasksSearchParams } from 'screens/kanban/util';
import { useSetUrlSearchParam } from 'utils/url';
import { Row } from 'components/lib';
import { Button, Input } from 'antd';
import { UserSelect } from 'components/user-select';
import { TaskTypeSelect } from 'components/task-type-select';

export const SearchPanel = () => {
    const searchParams = useTasksSearchParams();
    const setSearchParams = useSetUrlSearchParam();
    const reset = () => {
        setSearchParams({
            typeId: undefined,
            processorId: undefined,
            tagId: undefined,
            name: undefined,
        });
    };

    return (
        <Row gap={true}>
            <Input
                style={{ width: '20rem', marginRight: '1rem' }}
                placeholder={'Task Name'}
                value={searchParams.name}
                onChange={(evt) => setSearchParams({ name: evt.target.value })}
            />
            <UserSelect
                style={{marginRight: '1rem' }}
                defaultOptionName={'Processor'}
                value={searchParams.processorId}
                onChange={(value) => setSearchParams({ processorId: value })}
            />
            <TaskTypeSelect
                style={{marginRight: '1rem' }}
                defaultOptionName={'Type'}
                value={searchParams.typeId}
                onChange={(value) => setSearchParams({ typeId: value })}
            />
            <Button onClick={reset}>Reset Filter</Button>
        </Row>
    );
};
