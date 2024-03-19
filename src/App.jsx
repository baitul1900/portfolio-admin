import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SideNavigation from "./pages/SideNavigation";
import OTPComponent from "./components/OTPComponent";
import ProjectTable from "../src/components/project/ProjectTable";
import ProjectView from "./components/project/ProjectView";
import ProjectUpdatePage from "./pages/ProjectUpdatePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/" element={<SideNavigation />} />
        <Route path="/otp" element={<OTPComponent />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/project" element={<ProjectTable />} />
        <Route path="/project/:id" element={<ProjectView />} />
        <Route path="/project-update/:id" element={<ProjectUpdatePage/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
