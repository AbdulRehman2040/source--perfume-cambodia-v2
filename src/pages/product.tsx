import React, { useState } from 'react';
import { FaStar, FaHeart, FaTruck, FaShieldAlt, FaUndo, FaAward, FaChevronDown, FaCheck } from 'react-icons/fa';
import './product.css';
import Navigation from '../componets/Navbar/nav';
import Footer from '../componets/footer/footer';

const ProductPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [expandedSection, setExpandedSection] = useState<string | null>('Fragrance Notes');

  const product = {
    name: "Midnight Bloom – Eau de Parfum",
    subtitle: "Unisex • 100ml • Long lasting",
    rating: 4.8,
    reviews: 2000,
    originalPrice: 149.00,
    currentPrice: 89.00,
    savings: 60.00,
    description: "A captivating blend of night-blooming flowers and warm amber, creating an unforgettable olfactory experience that lasts throughout the day and into the night.",
    features: [
      "12-16 hour longevity",
      "Alcohol-free formula",
      "Concentrated essence",
      "Natural ingredients"
    ]
  };

  const images = [
    "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/1.webp",
    "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/2.webp",
    "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/3.webp",
    "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=500&fit=crop"
  ];

  const featureCards = [
    {
      icon: <FaTruck />,
      title: "Free delivery",
      subtitle: "by Dec 3 – Dec 5"
    },
    {
      icon: <FaShieldAlt />,
      title: "Authentic perfume",
      subtitle: "guaranteed"
    },
    {
      icon: <FaUndo />,
      title: "30-day free",
      subtitle: "returns"
    },
    {
      icon: <FaAward />,
      title: "1-year bottle",
      subtitle: "integrity warranty"
    }
  ];

  const detailsSections = [
    {
      title: "Fragrance Notes",
      content: "Top: Bergamot, Black Currant • Middle: Night-blooming Jasmine, Rose • Base: Amber, Musk, Sandalwood"
    },
    {
      title: "How to Use",
      content: "Spray on pulse points - wrists, neck, and behind ears. For longer lasting scent, apply to moisturized skin."
    },
    {
      title: "Ingredients",
      content: "Alcohol-free, Paraben-free, Phthalate-free. Made with natural essential oils and fragrance compounds."
    }
  ];

  return (
    <div>
      <Navigation/>
    <div className="luxury-product-page">
      {/* Main Product Section */}
      <div className="product-hero-section">
        <div className="product-container">
          
          {/* Product Images */}
          <div className="product-images-section">
            {/* Thumbnails on Left */}
            <div className="thumbnail-stack">
              {images.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onMouseEnter={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${product.name} view ${index + 1}`} />
                </button>
              ))}
            </div>
            
            <div className="main-image-container">
              <img 
                src={images[selectedImage]} 
                alt={product.name}
                className="main-product-image"
              />
              <div className="image-overlay"></div>
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info-section">
            {/* Product Header */}
            <div className="product-header">
              <h1 className="product-title">{product.name}</h1>
              <p className="product-subtitle">{product.subtitle}</p>
              
              {/* Rating */}
              <div className="rating-section">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}
                    />
                  ))}
                </div>
                <span className="rating-text">
                  {product.rating}/5 ({product.reviews.toLocaleString()}+ reviews)
                </span>
              </div>
            </div>

            {/* Pricing */}
            <div className="pricing-section">
              <div className="price-comparison">
                <span className="original-price">${product.originalPrice.toFixed(2)}</span>
                <span className="price-arrow">→</span>
                <span className="current-price">Now ${product.currentPrice.toFixed(2)}</span>
              </div>
              <div className="savings-badge">
                Save ${product.savings.toFixed(2)}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="cta-section">
              <button className="add-to-cart-btn">
                Add to Cart
              </button>
              <button className="wishlist-btn">
                <FaHeart />
              </button>
            </div>

            {/* Financing Badge */}
            <div className="financing-badge">
              <span className="badge-text">Buy now, pay later</span>
              <span className="badge-subtext">Available</span>
            </div>

            {/* Feature Cards */}
            <div className="feature-cards-grid">
              {featureCards.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <div className="feature-text">
                    <div className="feature-title">{feature.title}</div>
                    <div className="feature-subtitle">{feature.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>



            {/* Guarantee Badge */}
            <div className="guarantee-badge">
              <div className="guarantee-icon">✨</div>
              <div className="guarantee-text">
                <div className="guarantee-title">Guaranteed by The Perfume Promise</div>
                <div className="guarantee-subtitle">Authenticity & Quality Assured</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Description & Details Row */}
        <div className="description-details-container">
          <div className="description-details-row">
            {/* Product Description */}
            <div className="description-section">
              <h3 className="section-heading">Product Description</h3>
              <p className="product-description">{product.description}</p>
              <div className="feature-list">
                {product.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <FaCheck className="check-icon" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Expandable Details */}
            <div className="details-sections">
              <h3 className="section-heading">Product Details</h3>
              {detailsSections.map((section, index) => (
                <div key={index} className="detail-section">
                  <button 
                    className="detail-header"
                    onClick={() => setExpandedSection(expandedSection === section.title ? null : section.title)}
                  >
                    <span className="detail-title">{section.title}</span>
                    <FaChevronDown className={`chevron ${expandedSection === section.title ? 'expanded' : ''}`} />
                  </button>
                  {expandedSection === section.title && (
                    <div className="detail-content">
                      {section.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info Sections */}
      <div className="additional-sections">
        {/* Reviews Preview */}
      

        {/* You Might Also Like */}
        <div className="recommendations-section">
          <h3 className="section-title">You Might Also Like</h3>
          <div className="recommendations-grid">
            {[
              { name: "Desert Oud Royale", price: "$129.00", image: "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/1.webp" },
              { name: "Rose Velvet Noir", price: "$99.00", image: "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/1.webp" },
              { name: "Citrus Aqua Breeze", price: "$79.00", image: "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/3.webp" },
              { name: "Amber Midnight Intense", price: "$139.00", image: "https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/1.webp" }
            ].map((item, index) => (
              <div key={index} className="recommendation-card">
                <img src={item.image} alt={item.name} />
                <div className="card-info">
                  <h4>{item.name}</h4>
                  <span className="card-price">{item.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default ProductPage;