import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import serviceStore from "../../store/serviceStore";

const ServiceTable = () => {
  const { serviceList, serviceRequestList, serviceRequestById } = serviceStore(
    (state) => state
  );

  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (async () => {
      await serviceRequestList();
    })();
  }, []);

  const openModal = async (id) => {
    try {
      await serviceRequestById(id);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching service by ID:', error);
    }
  };

  const closeModal = () => {
    setSelectedService(null);
    setShowModal(false);
  };

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
                <button
                  onClick={() => openModal(service._id)}
                  className="btn btn-primary"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && selectedService && (
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedService.serviceName}</h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <p>{selectedService.des}</p>
                <ul>
                  {selectedService.feature.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceTable;
