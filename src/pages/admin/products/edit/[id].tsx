import React from 'react';
import { PageProps } from 'gatsby';
import { ProductEdit } from '../../../../components/AdminProducts';

const EditProductPage = ({ params }: PageProps) => {
    return <ProductEdit params={{ id: params.id || '' }} />;
};

export default EditProductPage;
