// Re-export the already-wrapped components from admin.tsx
export { ProductList, ProductCreate, ProductEdit, ProductRelated } from '../../pages/admin';
export { ProductProvider, useProducts } from '../../pages/admin';
export type { Product, ProductFormData, ProductContextType } from '../../pages/admin';
