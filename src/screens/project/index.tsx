import React from 'react';
import { Link } from 'react-router-dom';
import {Routes, Route, Navigate} from 'react-router';
import { EpicScreen } from '../epic';
import { KanbanScreen } from '../kanban';

export const ProjectScreen = () => {
  return (
    <div>
      <h1>Project Screen</h1>
      <Link to={'kanban'}>Kanban</Link>
      <Link to={'epic'}>Epic</Link>

      <Routes>
        <Route path={'/kanban'} element={<KanbanScreen />} />
        <Route path={'/epic'} element={<EpicScreen />} />
        <Route index element={<KanbanScreen />} />
      </Routes>
    </div>
  );
};
