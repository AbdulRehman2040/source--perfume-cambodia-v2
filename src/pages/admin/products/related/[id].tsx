import React from 'react';
import { PageProps } from 'gatsby';
import { ProductRelated } from '../../../../components/AdminProducts';

const RelatedProductsPage = ({ params }: PageProps) => {
    return <ProductRelated params={{ id: params.id || '' }} />;
};

export default RelatedProductsPage;
