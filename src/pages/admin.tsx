import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { navigate } from 'gatsby';
import './AdminProducts.css';

// ==================== TYPES ====================
interface Product {
  id: string;
  name: string;
  thumbnail: string;
  gallery: string[];
  price: number;
  salePrice?: number;
  quantity: number;
  shortDesc: string;
  longDesc: string;
  type: string;
  category: string;
  sku: string;
  featured: boolean;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
  createdAt: string;
  updatedAt: string;
  related?: string[];
}

interface ProductFormData {
  name: string;
  thumbnail: string;
  gallery: string[];
  price: number;
  salePrice?: number;
  quantity: number;
  shortDesc: string;
  longDesc: string;
  type: string;
  category: string;
  sku: string;
  featured: boolean;
}

interface ProductContextType {
  products: Product[];
  createProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  setRelatedProducts: (productId: string, relatedIds: string[]) => void;
  searchProducts: (query: string) => Product[];
}

// ==================== CONTEXT ====================
const ProductContext = createContext<ProductContextType | undefined>(undefined);

// ==================== PROVIDER ====================
const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const initialProducts: Product[] = [
    {
      id: '1',
      name: 'Midnight Oud',
      thumbnail: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop',
        'https://images.unsplash.com/photo-1590736969954-9920385bf7a9?w=800&h=800&fit=crop'
      ],
      price: 299.99,
      salePrice: 249.99,
      quantity: 42,
      shortDesc: 'A mysterious blend of oud, amber, and spice',
      longDesc: 'Midnight Oud is an exquisite fragrance that captures the essence of Arabian nights.',
      type: 'Eau de Parfum',
      category: 'Luxury',
      sku: 'PERF-001-MID',
      featured: true,
      status: 'in_stock',
      createdAt: '2024-01-15',
      updatedAt: '2024-02-20',
      related: ['2', '3']
    },
    {
      id: '2',
      name: 'White Gardenia',
      thumbnail: 'https://images.unsplash.com/photo-1590736969954-9920385bf7a9?w=400&h=400&fit=crop',
      gallery: [],
      price: 189.99,
      quantity: 15,
      shortDesc: 'Fresh floral scent with gardenia and jasmine',
      longDesc: 'A delicate blend of white gardenia, jasmine, and lily of the valley.',
      type: 'Eau de Toilette',
      category: 'Floral',
      sku: 'PERF-002-WHI',
      featured: true,
      status: 'low_stock',
      createdAt: '2024-02-01',
      updatedAt: '2024-02-25'
    },
    {
      id: '3',
      name: 'Amber Noir',
      thumbnail: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop',
      gallery: [],
      price: 349.99,
      quantity: 0,
      shortDesc: 'Rich amber and vanilla with woody undertones',
      longDesc: 'A luxurious blend of amber, vanilla, patchouli, and cedarwood.',
      type: 'Parfum',
      category: 'Oriental',
      sku: 'PERF-003-AMB',
      featured: false,
      status: 'out_of_stock',
      createdAt: '2024-01-20',
      updatedAt: '2024-02-28'
    },
    {
  id: '4',
  name: 'Royal Musk',
  thumbnail: 'https://images.unsplash.com/photo-1598454444372-3c9b05a5867d?w=400&h=400&fit=crop',
  gallery: [
    'https://images.unsplash.com/photo-1598454444372-3c9b05a5867d?w=800&h=800&fit=crop'
  ],
  price: 279.99,
  salePrice: 229.99,
  quantity: 30,
  shortDesc: 'Warm musk with a hint of citrus',
  longDesc: 'Royal Musk delivers a balance of white musk, refreshing citrus notes, and subtle wood.',
  type: 'Eau de Parfum',
  category: 'Classic',
  sku: 'PERF-004-MUS',
  featured: false,
  status: 'in_stock',
  createdAt: '2024-03-02',
  updatedAt: '2024-03-10',
  related: ['1']
},
{
  id: '5',
  name: 'Pink Velvet',
  thumbnail: 'https://images.unsplash.com/photo-1585386959984-a4155223f425?w=400&h=400&fit=crop',
  gallery: [],
  price: 159.99,
  quantity: 65,
  shortDesc: 'Sweet fruity scent with strawberry and rose',
  longDesc: 'Playful and elegant, this scent mixes rose petals with fruity strawberry sweetness.',
  type: 'Body Mist',
  category: 'Floral',
  sku: 'PERF-005-PVK',
  featured: true,
  status: 'in_stock',
  createdAt: '2024-03-12',
  updatedAt: '2024-03-20'
},
{
  id: '6',
  name: 'Ocean Breeze',
  thumbnail: 'https://images.unsplash.com/photo-1520975922071-aafc3a1c6c5b?w=400&h=400&fit=crop',
  gallery: [],
  price: 129.99,
  quantity: 7,
  shortDesc: 'Fresh aquatics with sea salt and mint',
  longDesc: 'A refreshing escape with notes of ocean mist, salt breeze, and crisp mint.',
  type: 'Cologne',
  category: 'Fresh',
  sku: 'PERF-006-OCB',
  featured: false,
  status: 'low_stock',
  createdAt: '2024-03-05',
  updatedAt: '2024-03-18'
},
{
  id: '7',
  name: 'Saffron Night',
  thumbnail: 'https://images.unsplash.com/photo-1505577058444-a3dab90d4253?w=400&h=400&fit=crop',
  gallery: [],
  price: 399.99,
  salePrice: 359.99,
  quantity: 4,
  shortDesc: 'Luxurious saffron with smoky leather',
  longDesc: 'Dark and provocative. Saffron, leather, and warm resinous notes.',
  type: 'Parfum',
  category: 'Oriental',
  sku: 'PERF-007-SAF',
  featured: true,
  status: 'low_stock',
  createdAt: '2024-03-15',
  updatedAt: '2024-03-22'
},
{
  id: '8',
  name: 'Citrus Burst',
  thumbnail: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&h=400&fit=crop',
  gallery: [],
  price: 109.99,
  quantity: 100,
  shortDesc: 'Energizing lemon and bergamot blend',
  longDesc: 'Bright, bold, and energetic. A lively blast of citrus optimism.',
  type: 'Eau de Cologne',
  category: 'Fresh',
  sku: 'PERF-008-CIT',
  featured: false,
  status: 'in_stock',
  createdAt: '2024-03-10',
  updatedAt: '2024-03-25'
}

  ];

  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('perfume_admin_products');
      return saved ? JSON.parse(saved) : initialProducts;
    }
    return initialProducts;
  });

  const calculateStatus = (quantity: number): Product['status'] => {
    if (quantity === 0) return 'out_of_stock';
    if (quantity <= 10) return 'low_stock';
    return 'in_stock';
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('perfume_admin_products', JSON.stringify(products));
    }
  }, [products]);

  const createProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Product => {
    const newProduct: Product = {
      ...productData,
      id: `product-${Date.now()}`,
      status: calculateStatus(productData.quantity),
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      related: []
    };

    setProducts(prev => [...prev, newProduct]);
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(product => {
      if (product.id === id) {
        const updated = {
          ...product,
          ...updates,
          updatedAt: new Date().toISOString().split('T')[0],
          status: updates.quantity !== undefined ? calculateStatus(updates.quantity) : product.status
        };
        return updated;
      }
      return product;
    }));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  const setRelatedProducts = (productId: string, relatedIds: string[]) => {
    updateProduct(productId, { related: relatedIds });
  };

  const searchProducts = (query: string): Product[] => {
    if (!query.trim()) return products;
    const lowerQuery = query.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.sku.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery)
    );
  };

  return (
    <ProductContext.Provider value={{
      products,
      createProduct,
      updateProduct,
      deleteProduct,
      getProductById,
      setRelatedProducts,
      searchProducts
    }}>
      {children}
    </ProductContext.Provider>
  );
};

const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within ProductProvider');
  return context;
};

// ==================== ADMIN LAYOUT ====================
interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('admin_logged_in') === 'true';
    }
    return false;
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('admin_logged_in');
    navigate('/admin/login');
  };

  if (!isAuthenticated) {
    return <div className="admin-loading">Loading...</div>;
  }

  return (
    <div className="admin-main">
      <nav className="admin-nav">
        <div className="nav-left">
          <h1 className="nav-logo">Perfume Admin</h1>
          <div className="nav-links">
            <button onClick={() => navigate('/admin/products')} className="nav-link active">
              📦 Products
            </button>
          </div>
        </div>
        <div className="nav-right">
          <button onClick={handleLogout} className="logout-btn">
            Logout →
          </button>
        </div>
      </nav>
      <main className="admin-content">
        {children}
      </main>
    </div>
  );
};

// ==================== PRODUCT LIST PAGE ====================
const ProductListPage: React.FC = () => {
  const { products, deleteProduct } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const ITEMS_PER_PAGE = 8;

  const filteredProducts = React.useMemo(() => {
    if (!searchTerm.trim()) return products;
    const searchLower = searchTerm.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(searchLower) ||
      p.sku.toLowerCase().includes(searchLower)
    );
  }, [products, searchTerm]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };

  const getStatusBadge = (status: string, quantity: number) => {
    switch (status) {
      case 'out_of_stock':
        return <span className="status-badge out-of-stock">Out of Stock</span>;
      case 'low_stock':
        return <span className="status-badge low-stock">Low Stock</span>;
      default:
        return <span className="status-badge in-stock">In Stock</span>;
    }
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    setDeleteConfirm(null);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Product Management</h1>
          <p className="page-subtitle">Manage your perfume inventory</p>
        </div>
        <div className="header-actions">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          <button onClick={() => navigate('/admin/products/new')} className="btn-primary">
            + Add New Product
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{products.length}</div>
          <div className="stat-label12">Total Products</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{products.filter(p => p.featured).length}</div>
          <div className="stat-label12">Featured</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {products.filter(p => p.status === 'out_of_stock').length}
          </div>
          <div className="stat-label12">Out of Stock</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {formatPrice(products.reduce((sum, p) => sum + p.price, 0))}
          </div>
          <div className="stat-label12">Total Value</div>
        </div>
      </div>

      <div className="table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="product-thumb">
                    <img src={product.thumbnail} alt={product.name} />
                    {product.featured && <span className="featured-badge">Featured</span>}
                  </div>
                </td>
                <td>
                  <div className="product-info">
                    <div className="product-name">{product.name}</div>
                    <div className="product-type">{product.type}</div>
                  </div>
                </td>
                <td><code className="product-sku">{product.sku}</code></td>
                <td><span className="category-badge">{product.category}</span></td>
                <td>
                  <div className="price-display">
                    {product.salePrice ? (
                      <>
                        <span className="sale-price">{formatPrice(product.salePrice)}</span>
                        <span className="original-price">{formatPrice(product.price)}</span>
                      </>
                    ) : (
                      <span className="current-price">{formatPrice(product.price)}</span>
                    )}
                  </div>
                </td>
                <td>
                  <div className="stock-display">
                    <div className="stock-quantity">{product.quantity} units</div>
                    <div className="stock-bar">
                      <div className={`stock-fill ${product.status}`}
                        style={{ width: `${Math.min(100, (product.quantity / 100) * 100)}%` }} />
                    </div>
                  </div>
                </td>
                <td>{getStatusBadge(product.status, product.quantity)}</td>
                <td>
                  <div className="action-buttons">
                    <button onClick={() => navigate(`/admin/products/edit/${product.id}`)} className="btn-action edit">
                      Edit
                    </button>
                    <button onClick={() => navigate(`/admin/products/related/${product.id}`)} className="btn-action related">
                      Related
                    </button>
                    <button onClick={() => setDeleteConfirm(product.id)} className="btn-action delete">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="page-btn">
            ← Previous
          </button>
          <div className="page-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button key={page} onClick={() => setCurrentPage(page)} className={`page-number ${currentPage === page ? 'active' : ''}`}>
                {page}
              </button>
            ))}
          </div>
          <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="page-btn">
            Next →
          </button>
        </div>
      )}

      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>Confirm Delete</h3>
              <button onClick={() => setDeleteConfirm(null)} className="modal-close">×</button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this product? This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button onClick={() => setDeleteConfirm(null)} className="btn-secondary">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="btn-danger">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ==================== CREATE/EDIT PRODUCT PAGE ====================
const ProductFormPage: React.FC<{ mode: 'create' | 'edit'; productId?: string }> = ({ mode, productId }) => {
  const { createProduct, updateProduct, getProductById } = useProducts();
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    thumbnail: '',
    gallery: [],
    price: 0,
    salePrice: undefined,
    quantity: 0,
    shortDesc: '',
    longDesc: '',
    type: 'Eau de Parfum',
    category: 'Luxury',
    sku: '',
    featured: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const CATEGORIES = ['Luxury', 'Floral', 'Oriental', 'Citrus', 'Woody', 'Fresh'];
  const TYPES = ['Eau de Parfum', 'Eau de Toilette', 'Parfum', 'Eau de Cologne'];

  useEffect(() => {
    if (mode === 'edit' && productId) {
      const product = getProductById(productId);
      if (product) {
        setFormData({
          name: product.name,
          thumbnail: product.thumbnail,
          gallery: product.gallery,
          price: product.price,
          salePrice: product.salePrice,
          quantity: product.quantity,
          shortDesc: product.shortDesc,
          longDesc: product.longDesc,
          type: product.type,
          category: product.category,
          sku: product.sku,
          featured: product.featured
        });
      }
    }
  }, [mode, productId, getProductById]);

  useEffect(() => {
    if (formData.name && !formData.sku) {
      const sku = formData.name.toUpperCase().replace(/[^A-Z0-9]/g, '').substring(0, 6) +
        '-' + Date.now().toString().substring(8, 12);
      setFormData(prev => ({ ...prev, sku: `PERF-${sku}` }));
    }
  }, [formData.name]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked :
        type === 'number' ? parseFloat(value) || 0 : value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'thumbnail' | 'gallery') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (type === 'thumbnail') {
        setFormData(prev => ({ ...prev, thumbnail: result }));
      } else {
        setFormData(prev => ({ ...prev, gallery: [...prev.gallery, result] }));
      }
    };
    reader.readAsDataURL(file);
  };

  const removeGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.thumbnail) newErrors.thumbnail = 'Thumbnail is required';
    if (formData.price <= 0) newErrors.price = 'Price must be greater than 0';
    if (formData.quantity < 0) newErrors.quantity = 'Quantity cannot be negative';
    if (formData.salePrice && formData.salePrice >= formData.price) {
      newErrors.salePrice = 'Sale price must be less than regular price';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      if (mode === 'create') {
        createProduct(formData);
        setSuccessMessage('Product created successfully!');
      } else if (mode === 'edit' && productId) {
        updateProduct(productId, formData);
        setSuccessMessage('Product updated successfully!');
      }

      setTimeout(() => navigate('/admin/products'), 1500);
    } catch (error) {
      setErrors({ ...errors, general: 'Operation failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">{mode === 'create' ? 'Create New Product' : 'Edit Product'}</h1>
          <p className="page-subtitle">
            {mode === 'create' ? 'Add a new perfume to your inventory' : 'Update product details'}
          </p>
        </div>
        <button onClick={() => navigate('/admin/products')} className="btn-secondary">
          ← Back to Products
        </button>
      </div>

      {successMessage && (
        <div className="success-message">
          <span className="success-icon">✓</span>
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-grid">
          {/* Left Column */}
          <div className="form-column">
            <div className="form-section">
              <h3 className="section-title">Basic Information</h3>
              <div className="form-group">
                <label className="form-label required">Product Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange}
                  className={`form-input ${errors.name ? 'error' : ''}`} placeholder="e.g., Midnight Oud" />
                {errors.name && <div className="error-message">{errors.name}</div>}
              </div>

              <div className="form-group">
                <label className="form-label required">SKU</label>
                <input type="text" name="sku" value={formData.sku} onChange={handleInputChange}
                  className="form-input" placeholder="PERF-001-MID" />
              </div>

              <div className="form-row">
                <div className="form-group half">
                  <label className="form-label required">Category</label>
                  <select name="category" value={formData.category} onChange={handleInputChange} className="form-select">
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div className="form-group half">
                  <label className="form-label required">Type</label>
                  <select name="type" value={formData.type} onChange={handleInputChange} className="form-select">
                    {TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title">Pricing & Inventory</h3>
              <div className="form-row">
                <div className="form-group half">
                  <label className="form-label required">Regular Price</label>
                  <div className="currency-input">
                    <span className="currency-symbol">$</span>
                    <input type="number" name="price" value={formData.price || ''} onChange={handleInputChange}
                      className={`form-input ${errors.price ? 'error' : ''}`} step="0.01" min="0" />
                  </div>
                  {errors.price && <div className="error-message">{errors.price}</div>}
                </div>
                <div className="form-group half">
                  <label className="form-label">Sale Price (Optional)</label>
                  <div className="currency-input">
                    <span className="currency-symbol">$</span>
                    <input type="number" name="salePrice" value={formData.salePrice || ''} onChange={handleInputChange}
                      className={`form-input ${errors.salePrice ? 'error' : ''}`} step="0.01" min="0" />
                  </div>
                  {errors.salePrice && <div className="error-message">{errors.salePrice}</div>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label required">Quantity</label>
                <input type="number" name="quantity" value={formData.quantity || ''} onChange={handleInputChange}
                  className={`form-input ${errors.quantity ? 'error' : ''}`} min="0" />
                {errors.quantity && <div className="error-message">{errors.quantity}</div>}
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title">Description</h3>
              <div className="form-group">
                <label className="form-label required">Short Description</label>
                <textarea name="shortDesc" value={formData.shortDesc} onChange={handleInputChange}
                  className="form-textarea" rows={3} placeholder="Brief product description" />
              </div>
              <div className="form-group">
                <label className="form-label">Long Description (Optional)</label>
                <textarea name="longDesc" value={formData.longDesc} onChange={handleInputChange}
                  className="form-textarea" rows={6} placeholder="Detailed product description" />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="form-column">
            <div className="form-section">
              <h3 className="section-title">Product Images</h3>
              <div className="form-group">
                <label className="form-label required">Thumbnail</label>
                <div className={`image-upload ${errors.thumbnail ? 'error' : ''}`}>
                  {formData.thumbnail ? (
                    <div className="image-preview">
                      <img src={formData.thumbnail} alt="Thumbnail" />
                      <button type="button" onClick={() => setFormData(prev => ({ ...prev, thumbnail: '' }))} className="remove-btn">
                        ×
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="upload-placeholder">
                        <span className="upload-icon">📷</span>
                        <span>Click to upload thumbnail</span>
                      </div>
                      <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'thumbnail')} className="file-input" />
                    </>
                  )}
                </div>
                {errors.thumbnail && <div className="error-message">{errors.thumbnail}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Gallery Images (Optional)</label>
                <div className="gallery-upload">
                  <div className="gallery-grid">
                    {formData.gallery.map((img, index) => (
                      <div key={index} className="gallery-item">
                        <img src={img} alt={`Gallery ${index + 1}`} />
                        <button type="button" onClick={() => removeGalleryImage(index)} className="remove-btn small">
                          ×
                        </button>
                      </div>
                    ))}
                    {formData.gallery.length < 5 && (
                      <div className="gallery-upload-placeholder">
                        <span className="upload-icon">+</span>
                        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'gallery')} className="file-input" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="section-title">Settings</h3>
              <div className="form-group">
                <label className="checkbox-label">
                  <input type="checkbox" name="featured" checked={formData.featured} onChange={handleInputChange}
                    className="checkbox-input" />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-text">
                    <strong>Featured Product</strong>
                    <span className="checkbox-desc">Display in featured sections</span>
                  </span>
                </label>
              </div>

              <div className="preview-card">
                <h4 className="preview-title">Price Preview</h4>
                <div className="preview-content">
                  <div className="price-display">
                    {formData.salePrice ? (
                      <>
                        <span className="sale-price">{formatCurrency(formData.salePrice)}</span>
                        <span className="original-price">{formatCurrency(formData.price)}</span>
                        <span className="discount-badge">
                          Save {Math.round((1 - formData.salePrice / formData.price) * 100)}%
                        </span>
                      </>
                    ) : (
                      <span className="regular-price">{formatCurrency(formData.price)}</span>
                    )}
                  </div>
                  <div className="stock-preview">
                    <span>Stock Status: </span>
                    <span className={`stock-status ${formData.quantity === 0 ? 'out' : formData.quantity <= 10 ? 'low' : 'in'}`}>
                      {formData.quantity === 0 ? 'Out of Stock' : formData.quantity <= 10 ? 'Low Stock' : 'In Stock'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/admin/products')} className="btn-secondary" disabled={isSubmitting}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : mode === 'create' ? 'Create Product' : 'Update Product'}
          </button>
        </div>
      </form>

      {errors.general && <div className="error-message general-error">{errors.general}</div>}
    </div>
  );
};

// ==================== RELATED PRODUCTS PAGE ====================
const RelatedProductsPage: React.FC<{ productId: string }> = ({ productId }) => {
  const { products, getProductById, setRelatedProducts } = useProducts();
  const currentProduct = getProductById(productId);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (currentProduct) {
      setSelectedProducts(currentProduct.related || []);
    }
  }, [currentProduct]);

  const filteredProducts = products.filter(product =>
    product.id !== productId &&
    (searchTerm === '' || product.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSave = async () => {
    if (!currentProduct) return;
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setRelatedProducts(currentProduct.id, selectedProducts);
    setSaveMessage('Related products saved successfully!');
    setIsSaving(false);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };

  if (!currentProduct) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Related Products</h1>
          <p className="page-subtitle">Manage related products for <strong>{currentProduct.name}</strong></p>
        </div>
        <div className="header-actions">
          <button onClick={() => navigate(`/admin/products/edit/${currentProduct.id}`)} className="btn-secondary">
            Edit Product
          </button>
          <button onClick={() => navigate('/admin/products')} className="btn-secondary">
            ← Back to Products
          </button>
        </div>
      </div>

      <div className="current-product-card">
        <div className="product-thumb">
          <img src={currentProduct.thumbnail} alt={currentProduct.name} />
        </div>
        <div className="product-info">
          <h3>{currentProduct.name}</h3>
          <div className="product-meta">
            <span className="product-sku">{currentProduct.sku}</span>
            <span className="category-badge">{currentProduct.category}</span>
            <span className="type-badge">{currentProduct.type}</span>
          </div>
          <p className="product-desc">{currentProduct.shortDesc}</p>
        </div>
      </div>

      {saveMessage && (
        <div className={`save-message ${saveMessage.includes('Failed') ? 'error' : 'success'}`}>
          {saveMessage}
        </div>
      )}

      <div className="related-grid">
        {/* Available Products */}
        <div className="available-section">
          <div className="section-header">
            <h3>Available Products</h3>
            <div className="search-box">
              <input type="text" placeholder="Search..." value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} className="search-input" />
              <span className="search-icon">🔍</span>
            </div>
          </div>
          <div className="products-list">
            {filteredProducts.map(product => (
              <div key={product.id} className={`product-item ${selectedProducts.includes(product.id) ? 'selected' : ''}`}
                onClick={() => toggleProductSelection(product.id)}>
                <div className="item-checkbox">
                  <input type="checkbox" checked={selectedProducts.includes(product.id)} onChange={() => { }} />
                </div>
                <div className="item-thumb">
                  <img src={product.thumbnail} alt={product.name} />
                </div>
                <div className="item-info">
                  <div className="item-name">{product.name}</div>
                  <div className="item-details">
                    <span className="item-category">{product.category}</span>
                    <span className="item-price">{formatPrice(product.price)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Products */}
        <div className="selected-section">
          <div className="section-header">
            <h3>Selected Products</h3>
            <div className="selected-count">{selectedProducts.length} selected</div>
          </div>
          <div className="selected-list">
            {selectedProducts.map(id => {
              const product = products.find(p => p.id === id);
              if (!product) return null;
              return (
                <div key={id} className="selected-item">
                  <div className="selected-thumb">
                    <img src={product.thumbnail} alt={product.name} />
                  </div>
                  <div className="selected-info">
                    <div className="selected-name">{product.name}</div>
                    <div className="selected-details">
                      <span>{product.category}</span>
                      <span>{formatPrice(product.price)}</span>
                    </div>
                  </div>
                  <button onClick={() => toggleProductSelection(id)} className="remove-btn">×</button>
                </div>
              );
            })}
          </div>

          <div className="selection-actions">
            <div className="selection-tip">
              <p><strong>Tip:</strong> Select complementary products that customers might also like.</p>
            </div>
            <div className="action-buttons">
              <button onClick={() => setSelectedProducts([])} className="btn-secondary" disabled={selectedProducts.length === 0}>
                Clear All
              </button>
              <button onClick={handleSave} className="btn-primary" disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Related Products'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN ADMIN PRODUCTS COMPONENT ====================
const AdminProducts: React.FC = () => {
  // Check if authenticated
  React.useEffect(() => {
    const isLoggedIn = localStorage.getItem('admin_logged_in') === 'true';
    if (!isLoggedIn) {
      navigate('/admin/login');
    }
  }, []);

  return (
    <ProductProvider>
      <AdminLayout>
        <ProductListPage />
      </AdminLayout>
    </ProductProvider>
  );
};

// For individual pages (used with Gatsby file-based routing)
export const ProductList = () => (
  <ProductProvider>
    <AdminLayout>
      <ProductListPage />
    </AdminLayout>
  </ProductProvider>
);

export const ProductCreate = () => (
  <ProductProvider>
    <AdminLayout>
      <ProductFormPage mode="create" />
    </AdminLayout>
  </ProductProvider>
);

export const ProductEdit = ({ params }: { params: { id: string } }) => (
  <ProductProvider>
    <AdminLayout>
      <ProductFormPage mode="edit" productId={params.id} />
    </AdminLayout>
  </ProductProvider>
);

export const ProductRelated = ({ params }: { params: { id: string } }) => (
  <ProductProvider>
    <AdminLayout>
      <RelatedProductsPage productId={params.id} />
    </AdminLayout>
  </ProductProvider>
);

export default AdminProducts;

// Export types and utilities for use in other modules
export type { Product, ProductFormData, ProductContextType };
export { ProductProvider, useProducts };