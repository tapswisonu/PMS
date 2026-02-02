import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import TeamMembers from './pages/TeamMembers';
import TaskManagement from './pages/TaskManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:id" element={<ProjectDetails />} />
          <Route path="team" element={<TeamMembers />} />
          <Route path="tasks" element={<TaskManagement />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
