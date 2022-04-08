import { React } from 'react';
import { Routes, Route } from 'react-router-dom';
import AddFood from './components/AddFood/AddFood';
import AddUser from './components/AddUser/AddUser';
import EditFood from './components/EditFood/EditFood';
import { AuthPage } from './pages/AuthPage';
import AddDomain from './components/AddDomain';
import AddProject from './components/AddProject';
import DomainList from './components/DomainList/DomainList';
import DemoList from './components/DomainList/DemoList';
import UserList from './components/User/UserList';
import Parser from './components/Parser/Parser';
import ProjectList from './components/ProjectList/ProjectList';
import DomainGrid from './components/DomainList/DomainGrid';

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/project/add" exact element={<AddProject />} />
        <Route path="/project/all" exact element={<ProjectList />} />
        <Route path="/edit/:id" element={<EditFood />} />
        <Route path="/food/add" element={<AddFood />} />
        <Route path="/user/add" element={<AddUser />} />
        <Route path="/user/all" element={<UserList />} />
        <Route path="/domain/add" element={<AddDomain />} />
        <Route path="/domain/list" element={<DomainList />} />
        <Route path="/domain/grid" element={<DomainGrid />} />
        <Route path="/project/:id" element={<DomainGrid />} />
        <Route path="/domain/all" element={<DemoList />} />
        <Route path="/parser" element={<Parser />} />
        <Route path="*" element={<AddProject />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="*" element={<AuthPage />} />
    </Routes>
  );
};
