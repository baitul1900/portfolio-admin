import { useEffect } from 'react';
import Test from '../../Layout/Test';
import serviceStore from '../../store/serviceStore';
import { useParams } from 'react-router-dom';

const ServiceById = () => {
    const { serviceList, serviceRequestById } = serviceStore((state) => state);
    const { id } = useParams();

    useEffect(() => {
        serviceRequestById(id);
    }, []);

    // Check if serviceList is not empty and get the first item
    const service = serviceList.length > 0 ? serviceList[0] : null;

    return (
        <Test>
            {service && (
                <div className="card">
                    <h1>{service.serviceName}</h1>
                    <p>{service.des}</p>
                    <ul>
                        {service.feature.map((feature, idx) => (
                            <li key={idx}>{feature}</li>
                        ))}
                    </ul>
                </div>
            )}
        </Test>
    );
};

export default ServiceById;
