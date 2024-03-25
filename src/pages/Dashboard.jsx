import { useEffect } from "react";
import Test from "../Layout/Test";
import blogStore from "../store/blogStore";

const Dashboard = () => {
  const { blogList, blogRequest } = blogStore((state) => state);

  useEffect(() => {
    blogRequest();
  }, []);

  return (
    <Test>
      <h1>Dashboard</h1>

      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <div className="card shadow-sm">
              <div className="row text-center">
                <div className="col-6 fs-1">Blog</div>
                <div className="col-6 fs-1">{blogList.length}</div>
              </div>
            </div>
          </div>
          <div className="col-4"></div>
          <div className="col-4"></div>
        </div>
      </div>
    </Test>
  );
};

export default Dashboard;
