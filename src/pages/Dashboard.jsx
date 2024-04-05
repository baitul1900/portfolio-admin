import Test from "../Layout/Test";
import AllDataCards from "../components/Dashboard/AllDataCards";
import TopSection from "../components/Dashboard/TopSection";

const Dashboard = () => {
  
    return (
      <Test>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <TopSection />
            </div>

            <div>
              <AllDataCards />
            </div>
          </div>
        </div>
      </Test>
    );
  };

export default Dashboard;
