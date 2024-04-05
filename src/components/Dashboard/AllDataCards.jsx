import { useEffect } from "react";
import blogStore from "../../store/blogStore";
import projectStore from "../../store/projectStore";
import serviceStore from "../../store/serviceStore";
import CountUp from "react-countup";

const AllDataCards = () => {
  const { blogList, blogRequest } = blogStore((state) => state);
  const { project, projectRequest } = projectStore((state) => state);
  const { serviceList, serviceRequestList } = serviceStore((state) => state);

  useEffect(() => {
    blogRequest();
    projectRequest();
    serviceRequestList();
  }, []);

  return (
    <>
      <div className=" row d-flex justify-content-between align-items-center">
        <div className="col-4">
          <div className="card dashboard-cards" id="blog-card">
            <div className="head">
              <h3>Blog</h3>
              <i className="bi bi-clipboard"></i>
            </div>
            <div className="card-body p-0">
              <CountUp start={0} end={blogList.length} duration={1}  className="count-number"/>
            </div>
          </div>
        </div>

        <div className="col-4">
          <div className="card dashboard-cards" id="blog-card">
            <div className="head">
              <h3>Project</h3>
              <i className="bi bi-clipboard"></i>
            </div>
            <div className="card-body p-0">
              <CountUp start={0} end={project.length} duration={1}  className="count-number"/>
            </div>
          </div>
        </div>


        <div className="col-4">
          <div className="card dashboard-cards" id="blog-card">
            <div className="head">
              <h3>Service</h3>
              <i className="bi bi-clipboard"></i>
            </div>
            <div className="card-body p-0">
               <CountUp start={0} end={serviceList.length} duration={1}  className="count-number"/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllDataCards;
