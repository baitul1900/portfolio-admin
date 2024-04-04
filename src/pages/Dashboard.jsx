import { useEffect } from "react";
import Test from "../Layout/Test";
import blogStore from "../store/blogStore";
import TopSection from "../components/Dashboard/TopSection";
import Cookies from "js-cookie";
import LoginComponent from "../components/LoginComponent";

const Dashboard = () => {
  const { blogList, blogRequest } = blogStore((state) => state);
  const token = Cookies.get("token");

  useEffect(() => {
    blogRequest();
  }, []);

  if (!token) {
    return <LoginComponent />;
  } else {
    return (
      <Test>
        <div className="container-fluid">
          <div className="row">
            <div className="col-8">
              <TopSection />
            </div>
          </div>
        </div>
      </Test>
    );
  }
};

export default Dashboard;
