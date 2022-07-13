import React, {useState} from 'react';
import {Row, ScreenContainer} from 'components/lib';
import {useProjectInUrl} from 'screens/kanban/util';
import {TimeLogTable} from "./time-log-table";
import {useTimeLogs} from "../../utils/time-log";
import {useTasks} from "../../utils/task";
import {Task} from "../../types/task";
import {TimeLog} from "../../types/time-log";

export const TimeLogScreen = () => {
  const {data: currentProject} = useProjectInUrl();
  const {data: timeLogs, isLoading: timeLogsAreLoading} = useTimeLogs({projectId: currentProject?.id});
  // TODO
  const {data: tasks, isLoading: tasksAreLoading} = useTasks({projectId: currentProject?.id});
  const [dataSource, setDataSource] = useState<TimeLog[] | undefined>([]);
  const createTimeLogTable = () => {
    if (!timeLogsAreLoading && !tasksAreLoading) {
      return <TimeLogTable tasks={tasks as Task[]} timeLogs={timeLogs as TimeLog[]} dataSource={dataSource} setDataSource={setDataSource}/>
    }
  }

  return (
    <ScreenContainer>
      <Row between={true}>
        <h1>{currentProject?.name} Time Log</h1>
      </Row>
      {createTimeLogTable()}
    </ScreenContainer>
  );
};
