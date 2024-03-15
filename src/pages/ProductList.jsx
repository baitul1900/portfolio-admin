import React from 'react';
import MasterLayout from '../Layout/MasterLayout';
import ProductTable from '../components/product/ProductTable';

const ProductList = () => {
    return (
        <MasterLayout>
            <ProductTable/>
        </MasterLayout>
    );
};

export default ProductList;