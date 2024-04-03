import { useEffect } from "react";
import Test from "../Layout/Test";
import blogStore from "../store/blogStore";
import TopSection from "../components/Dashboard/TopSection";

const Dashboard = () => {
  const { blogList, blogRequest } = blogStore((state) => state);

  useEffect(() => {
    blogRequest();
  }, []);

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
};

export default Dashboard;
