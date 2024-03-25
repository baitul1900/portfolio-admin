import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import OTPComponent from "./components/OTPComponent";
import ProjectView from "./components/project/ProjectView";
import ProjectUpdatePage from "./pages/ProjectUpdatePage";
import ProjectPage from "../src/pages/ProjectPage";
import ServicePage from "./pages/ServicePage";
import ServiceById from "./components/serviceComponent/ServiceById";
import CreateService from "./components/serviceComponent/CreateService";
import ServiceUpdate from "./components/serviceComponent/ServiceUpdate";
import BlogPage from "./pages/BlogPage";
import BlogUpdatedPage from "./pages/BlogUpdatedPage";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/otp" element={<OTPComponent />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/project" element={<ProjectPage />} />
        <Route path="/project/:id" element={<ProjectView />} />
        <Route path="/project-update/:id" element={<ProjectUpdatePage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/servicebyId/:id" element={<ServiceById />} />
        <Route path="/create-service" element={<CreateService/>} />
        <Route path="/update-service/:id" element={<ServiceUpdate/>} />
        <Route path="blog" element={<BlogPage/>} />
        <Route path="blog-updated/:id" element={<BlogUpdatedPage/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
