import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import serviceStore from "../../store/serviceStore";

const ServiceTable = () => {
  const { serviceList, serviceRequestList } = serviceStore(
    (state) => state
  );

  useEffect(() => {
    serviceRequestList();
  }, []);


  return (
    <>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <h1>Services</h1>
        <Link to="/add-service" className="btn btn-danger">
          Add New <i className="bi bi-plus-square"></i>
        </Link>
      </div>

      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Service Name</th>
            <th scope="col">Description</th>
            <th scope="col">Feature List</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {serviceList.map((service, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{service.serviceName}</td>
              <td>{service.des}</td>
              <td>
                {service.feature.map((feature, idx) => (
                  <span key={idx}>{feature}</span>
                ))}
              </td>
              <td className="d-flex justify-content-evenly">
                <Link
                  to={`/servicebyId/${service._id}`}
                  className="btn btn-primary"
                >
                  <i className="bi bi-eye"></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ServiceTable;
