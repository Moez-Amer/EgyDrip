import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import ProductModal from '../components/ProductModal';
import LoadingScreen from '../components/LoadingScreen';
import FilterPanel from '../components/FilterPanel';
import { useLocation } from 'react-router-dom';

// Store configurations
const STORES = [
    {
        name: 'Juvenile',
        url: 'https://juvenileeg.com',
        endpoint: '/products.json'
    },
    {
        name: 'TwentySeven',
        url: 'https://twentysevenegy.myshopify.com',
        endpoint: '/products.json'
    },
    {
        name: 'CTRL Cairo',
        url: 'https://www.ctrlcairo.com',
        endpoint: '/products.json'
    },
    {
        name: 'Coddiwomple',
        url: 'https://coddiwmple.com',
        endpoint: '/products.json'
    },
    {
        name: '21 Stitches',
        url: 'https://21stitches.co',
        endpoint: '/products.json'
    }
];

// Update the PRODUCT_TYPE_MAPPING with more variations and categories
const PRODUCT_TYPE_MAPPING = {
    // T-Shirts variations
    'T-SHIRT': 'T-Shirts',
    'TSHIRT': 'T-Shirts',
    'TEE': 'T-Shirts',
    'T SHIRT': 'T-Shirts',
    'SHIRT': 'T-Shirts',
    'TEES': 'T-Shirts',
    'T-SHIRTS': 'T-Shirts',
    'GRAPHIC TEE': 'T-Shirts',
    'PRINTED TEE': 'T-Shirts',
    'TANK TOP': 'T-Shirts',
    'ORIGINALS TANK TOP': 'T-Shirts',
    '525 TEE': 'T-Shirts',
    'ROYAL WHITE TEE': 'T-Shirts',
    'TO THE WORLD TEE': 'T-Shirts',
    'DREAMS COME TRUE TEE': 'T-Shirts',
    'BUBBLEGUM TEE': 'T-Shirts',
    
    // Hoodies variations
    'HOODIE': 'Hoodies',
    'HOODY': 'Hoodies',
    'HOOD': 'Hoodies',
    'SWEAT HOODIE': 'Hoodies',
    'PULLOVER HOODIE': 'Hoodies',
    'ZIP HOODIE': 'Hoodies',
    'HOODED': 'Hoodies',
    'CREATIVE DEPT HOODIE': 'Hoodies',
    'STAMPS HOODIE': 'Hoodies',
    'THE HAND HOODIE': 'Hoodies',
    'CHROME HOODIE': 'Hoodies',
    
    // Sweatshirts/Crewnecks variations
    'SWEATSHIRT': 'Sweatshirts',
    'SWEAT SHIRT': 'Sweatshirts',
    'SWEATER': 'Sweatshirts',
    'CREW NECK': 'Sweatshirts',
    'CREWNECK': 'Sweatshirts',
    'PULLOVER': 'Sweatshirts',
    'B2R CREWNECK': 'Sweatshirts',
    'ROYAL ERA CREWNECK': 'Sweatshirts',
    'ASPHALT CREWNECK': 'Sweatshirts',
    'DIRT CREWNECK': 'Sweatshirts',
    'GANJA CREWNECK': 'Sweatshirts',
    'CORDUROY CREWNECK': 'Sweatshirts',
    
    // Pants variations
    'PANTS': 'Pants',
    'PANT': 'Pants',
    'TROUSERS': 'Pants',
    'JOGGERS': 'Pants',
    'SWEATPANTS': 'Pants',
    'TRACK PANTS': 'Pants',
    'CARGO PANTS': 'Pants',
    'JEANS': 'Pants',
    'WIDE LEG': 'Pants',
    'CARPENTER': 'Pants',
    'CHANEL JOGGERS': 'Pants',
    'MASCULINE JOGGERS': 'Pants',
    
    // Shorts variations
    'SHORTS': 'Shorts',
    'SHORT': 'Shorts',
    'BEACH SHORTS': 'Shorts',
    'SWIM SHORTS': 'Shorts',
    'ATHLETIC SHORTS': 'Shorts',
    'CARGO SHORTS': 'Shorts',
    'WATERPROOF SHORTS': 'Shorts',
    'JORTS': 'Shorts',
    'CARPENTER JORTS': 'Shorts',
    
    // Jackets variations
    'JACKET': 'Jackets',
    'WINDBREAKER': 'Jackets',
    'BOMBER': 'Jackets',
    'COAT': 'Jackets',
    'TRACK JACKET': 'Jackets',
    'DENIM JACKET': 'Jackets',
    'LEATHER JACKET': 'Jackets',
    'VINTAGE LEATHER': 'Jackets',
    'WORK JACKET': 'Jackets',
    'WORKER JACKET': 'Jackets',
    'SILVER WORKER': 'Jackets',
    'MILAN JACKET': 'Jackets',
    'ZIPUP JACKET': 'Jackets',
    
    // Polos
    'POLO': 'Polos',
    'UNIVERSITY POLO': 'Polos',
    
    // Accessories variations
    'CAP': 'Caps',
    'CAPS': 'Caps',
    'HAT': 'Caps',
    'BEANIE': 'Caps',
    'SNAPBACK': 'Caps',
    'BUCKET HAT': 'Caps',
    'STUDIO CAP': 'Caps',
    
    'BAG': 'Bags',
    'BAGS': 'Bags',
    'BACKPACK': 'Bags',
    'TOTE': 'Bags',
    'DUFFLE': 'Bags',
    'MESSENGER BAG': 'Bags',
    
    'SOCKS': 'Socks',
    'SOCK': 'Socks',
    'CREW SOCKS': 'Socks',
    'ANKLE SOCKS': 'Socks',
    
    'BELT': 'Belts',
    'BELTS': 'Belts',
    'LEATHER BELT': 'Belts',
    
    'WALLET': 'Wallets',
    'WALLETS': 'Wallets',
    'CARD HOLDER': 'Wallets',
    
    // Footwear variations
    'SNEAKERS': 'Sneakers',
    'SNEAKER': 'Sneakers',
    'SHOES': 'Sneakers',
    'TRAINERS': 'Sneakers',
    
    'SLIDES': 'Slides',
    'SLIDE': 'Slides',
    'SLIPPERS': 'Slides',
    'SANDALS': 'Slides',
    'FLIP FLOPS': 'Slides',
    
    'BOOTS': 'Boots',
    'BOOT': 'Boots',
    'WINTER BOOTS': 'Boots',
    'COMBAT BOOTS': 'Boots',
    
    // Collections and other categories
    'INITIALS': 'Basics',
    'BASICS': 'Basics',
    'WINTER': 'Winter Collection',
    'FW24': 'Winter Collection',
    'FW25': 'Winter Collection',
    'BACK2RAW': 'Back2Raw',
    'B2R': 'Back2Raw',
    
    // Stickers and accessories
    'STICKER': 'Stickers',
    'STICKERS': 'Stickers',
    'STICKER PACK': 'Stickers'
};

// Update the normalizeProductType function to be more robust
const normalizeProductType = (type) => {
    if (!type) return 'Other';
    
    // Clean the input type
    const cleanType = type.trim().toUpperCase();
    
    // Direct mapping check
    if (PRODUCT_TYPE_MAPPING[cleanType]) {
        return PRODUCT_TYPE_MAPPING[cleanType];
    }
    
    // Check for compound words (e.g., "Graphic Tee Shirt")
    const words = cleanType.split(' ');
    for (let i = 0; i < words.length; i++) {
        for (let j = i + 1; j <= words.length; j++) {
            const phrase = words.slice(i, j).join(' ');
            if (PRODUCT_TYPE_MAPPING[phrase]) {
                return PRODUCT_TYPE_MAPPING[phrase];
            }
        }
    }
    
    // Check for partial matches
    for (const [key, value] of Object.entries(PRODUCT_TYPE_MAPPING)) {
        if (cleanType.includes(key) || key.includes(cleanType)) {
            return value;
        }
    }
    
    // If no match found, try to categorize based on common keywords
    const commonKeywords = {
        'TEE': 'T-Shirts',
        'SHIRT': 'T-Shirts',
        'HOOD': 'Hoodies',
        'SWEAT': 'Sweatshirts',
        'PANT': 'Pants',
        'SHORT': 'Shorts',
        'JACK': 'Jackets',
        'BAG': 'Bags',
        'CAP': 'Caps',
        'HAT': 'Caps',
        'SOCK': 'Socks',
        'SHOE': 'Sneakers'
    };
    
    for (const [keyword, category] of Object.entries(commonKeywords)) {
        if (cleanType.includes(keyword)) {
            return category;
        }
    }
    
    // Return Other if no matches found
    return 'Other';
};

// Update the extractProductType function to be more thorough
const extractProductType = (product) => {
    let productType = null;
    
    // Try product_type field first
    if (product.product_type) {
        productType = normalizeProductType(product.product_type);
        if (productType !== 'Other') return productType;
    }
    
    // Try vendor-specific type field if it exists
    if (product.type) {
        productType = normalizeProductType(product.type);
        if (productType !== 'Other') return productType;
    }
    
    // Check tags
    if (Array.isArray(product.tags)) {
        // First try exact matches
        for (const tag of product.tags) {
            productType = normalizeProductType(tag);
            if (productType !== 'Other') return productType;
        }
        
        // Then try combining tags that might form a type (e.g., "graphic" + "tee")
        const tagString = product.tags.join(' ');
        productType = normalizeProductType(tagString);
        if (productType !== 'Other') return productType;
    }
    
    // Check title
    if (product.title) {
        productType = normalizeProductType(product.title);
        if (productType !== 'Other') return productType;
    }
    
    // Log unmatched products for debugging
    console.log(`Could not determine type for product: ${product.title}`);
    
    return 'Other';
};

const PageContainer = styled.div`
    padding-top: 100px;
  max-width: 1200px;
  margin: 0 auto;
    opacity: ${props => props.isLoading ? '0' : '1'};
    transition: opacity 0.5s ease;
`;

const ProductContainer = styled.div`
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
`;

const StoreGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2.5rem;
    margin-bottom: 3rem;
    padding: 0 1rem;
`;

const ProductCard = styled.div`
  background: white;
    border: 1px solid #e5e5e5;
  border-radius: 8px;
  overflow: hidden;
    transition: all 0.3s ease;
    position: relative;

  &:hover {
    transform: translateY(-5px);
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
`;

const StoreBadge = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
    color: #1a1a1a;
    z-index: 1;
    backdrop-filter: blur(5px);
`;

const ProductImage = styled.img`
  width: 100%;
    height: 400px;
  object-fit: cover;
    transition: transform 0.3s ease;

    ${ProductCard}:hover & {
        transform: scale(1.05);
    }
`;

const ProductInfo = styled.div`
    padding: 1.5rem;
`;

const ProductTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
    font-weight: 500;
    color: #1a1a1a;
`;

const ProductType = styled.p`
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
    color: #666;
`;

const ProductPrice = styled.p`
    color: #1a1a1a;
  font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
`;

const BuyNowButton = styled.button`
    background-color: #000;
  color: white;
  border: none;
    padding: 1rem;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
    font-size: 0.9rem;
    font-weight: 500;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
    text-transform: uppercase;

  &:hover {
        background-color: #333;
  }

  &:disabled {
        background-color: #999;
    cursor: not-allowed;
  }
`;

const ViewMoreButton = styled(BuyNowButton)`
    background-color: white;
    color: #000;
    border: 1px solid #000;
    margin-top: 0.5rem;

    &:hover {
        background-color: #f5f5f5;
    }
`;

const ErrorMessage = styled.div`
    text-align: center;
    padding: 4rem 2rem;
    color: #666;

    h3 {
        color: #1a1a1a;
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }

    p {
        max-width: 500px;
        margin: 0 auto 1rem;
    }
`;

const ShopLayout = styled.div`
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 2rem;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 1rem;

    @media (max-width: 968px) {
        grid-template-columns: 1fr;
    }
`;

// Replace the simple shuffleArray function with a more robust implementation
const generateRandomSeed = () => {
    return Math.floor(Math.random() * 1000000);
};

const seededRandom = (seed) => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
};

const shuffleArray = (array, seed = generateRandomSeed()) => {
    const shuffled = [...array];
    let currentSeed = seed;
    
    // Fisher-Yates shuffle with seeded randomization
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(seededRandom(currentSeed++) * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
};

function Shop() {
    const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [randomSeed, setRandomSeed] = useState(generateRandomSeed());
    const location = useLocation();

    // Get category from URL parameters
    const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
    const categoryFromUrl = searchParams.get('category');

    // Update filters state to include URL category
    const [filters, setFilters] = useState({
        search: '',
        stores: [],
        types: categoryFromUrl ? [categoryFromUrl] : [],
        price: {
            min: '',
            max: ''
        }
    });

    useEffect(() => {
        // Update filters when URL category changes
        if (categoryFromUrl) {
            setFilters(prev => ({
                ...prev,
                types: [categoryFromUrl]
            }));
        }
    }, [categoryFromUrl]);

    // Calculate product counts by type with proper mapping
    const productCounts = useMemo(() => {
        const counts = {};
        products.forEach(product => {
            const type = product.product_type;
            if (type) {
                counts[type] = (counts[type] || 0) + 1;
            }
        });
        return counts;
    }, [products]);

    // Extract unique product types from all products
    const productTypes = useMemo(() => {
        const types = new Set();
        products.forEach(product => {
            if (product.product_type) {
                types.add(product.product_type);
            }
        });
        return Array.from(types).sort();
    }, [products]);

    // Calculate price range from all products
    const priceRange = useMemo(() => {
        if (products.length === 0) return { min: 0, max: 0 };
        const prices = products.map(p => parseFloat(p.variants[0]?.price || 0));
        return {
            min: Math.floor(Math.min(...prices)),
            max: Math.ceil(Math.max(...prices))
        };
    }, [products]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
                setLoading(true);
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                const allProducts = [];
                for (const store of STORES) {
                    try {
                        const response = await fetch(store.url + store.endpoint);
                        if (!response.ok) {
                            console.error(`Failed to fetch from ${store.name}:`, response.statusText);
                            continue;
                        }
                        const data = await response.json();
                        
                        const products = Array.isArray(data.products) ? data.products : [];
                        const storeProducts = products.map(product => {
                            const productType = extractProductType(product);
                            return {
                                ...product,
                store: store.name,
                                storeUrl: store.url,
                                product_type: productType
                            };
                        });
                        allProducts.push(...storeProducts);
                    } catch (storeError) {
                        console.error(`Error fetching from ${store.name}:`, storeError);
                    }
                }
                
                if (allProducts.length === 0) {
                    throw new Error('No products could be fetched from any store');
                }
                
                // Randomize initial product order
                const randomizedProducts = shuffleArray(allProducts, randomSeed);
                setProducts(randomizedProducts);
                setError(null);
      } catch (err) {
                console.error('Fetch error:', err);
                setError(err.message);
            } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    }, [randomSeed]); // Add randomSeed as dependency

    // Add function to refresh randomization
    const refreshRandomization = () => {
        setRandomSeed(generateRandomSeed());
    };

    const handleBuyNow = (product) => {
        const storeUrl = product.storeUrl;
        const variantId = product.variants[0].id;
        window.location.href = `${storeUrl}/cart/${variantId}:1`;
    };

    const handleClearFilters = () => {
        setFilters({
            search: '',
            stores: [],
            types: [],
            price: {
                min: '',
                max: ''
            }
        });
    };

    // Filter products based on all criteria including URL category
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            // Search filter
            if (filters.search) {
                const searchTerm = filters.search.toLowerCase();
                const matchesTitle = product.title?.toLowerCase().includes(searchTerm);
                const matchesType = product.product_type?.toLowerCase().includes(searchTerm);
                const matchesStore = product.store?.toLowerCase().includes(searchTerm);
                const matchesDescription = product.body_html?.toLowerCase().includes(searchTerm);
                const matchesTags = Array.isArray(product.tags) && product.tags.join(' ').toLowerCase().includes(searchTerm);
                if (!matchesTitle && !matchesType && !matchesStore && !matchesDescription && !matchesTags) return false;
            }

            // Store filter
            if (filters.stores.length > 0 && !filters.stores.includes(product.store)) {
                return false;
            }

            // Type filter (including URL category)
            if (filters.types.length > 0) {
                const normalizedProductType = normalizeProductType(product.product_type);
                const matchesType = filters.types.some(type => 
                    normalizedProductType?.toLowerCase() === type.toLowerCase()
                );
                if (!matchesType) return false;
            }

            // Price filter
            if (filters.price.min || filters.price.max) {
                const price = parseFloat(product.variants?.[0]?.price || 0);
                if (filters.price.min && price < parseFloat(filters.price.min)) return false;
                if (filters.price.max && price > parseFloat(filters.price.max)) return false;
            }

            return true;
        });
    }, [products, filters]);

    // Update shuffledProducts implementation
    const shuffledProducts = useMemo(() => {
        // Only shuffle if no filters are active
        if (!filters.search && filters.stores.length === 0 && filters.types.length === 0 && 
            !filters.price.min && !filters.price.max) {
            return shuffleArray(filteredProducts, randomSeed);
        }
        // When filters are active, maintain the current order
        return filteredProducts;
    }, [filteredProducts, filters, randomSeed]);

    return (
        <>
            <LoadingScreen isLoading={loading} />
            <PageContainer isLoading={loading}>
                <ShopLayout>
                    <FilterPanel
                        filters={filters}
                        setFilters={setFilters}
                        productTypes={productTypes}
                        priceRange={priceRange}
                        onClearFilters={() => {
                            handleClearFilters();
                            refreshRandomization(); // Refresh randomization when filters are cleared
                        }}
                        productCounts={productCounts}
                    />
                    
                    <div>
                        {error ? (
                            <ErrorMessage>
                                <h3>Oops! Something went wrong</h3>
                                <p>{error}</p>
                            </ErrorMessage>
                        ) : (
                            <ProductContainer>
                                {shuffledProducts.length > 0 ? (
                                    <StoreGrid>
                                        {shuffledProducts.map((product) => (
                                            <ProductCard key={`${product.store}-${product.id}`}>
          <StoreBadge>{product.store}</StoreBadge>
          <ProductImage 
            src={product.images[0]?.src || 'placeholder.jpg'} 
            alt={product.title}
          />
          <ProductInfo>
            <ProductTitle>{product.title}</ProductTitle>
                                                    <ProductType>{product.product_type}</ProductType>
                                                    <ProductPrice>
                                                        LE {product.variants[0]?.price || 'N/A'}
                                                    </ProductPrice>
                                                    <BuyNowButton
                                                        onClick={() => handleBuyNow(product)}
                                                        disabled={!product.variants[0]?.available}
                                                    >
                                                        {product.variants[0]?.available ? 'Buy Now' : 'Sold Out'}
                                                    </BuyNowButton>
                                                    <ViewMoreButton onClick={() => setSelectedProduct(product)}>
                                                        View More
                                                    </ViewMoreButton>
          </ProductInfo>
        </ProductCard>
                                        ))}
                                    </StoreGrid>
                                ) : (
                                    <ErrorMessage>
                                        <h3>No products found</h3>
                                        <p>Try adjusting your filters or search terms</p>
                                    </ErrorMessage>
                                )}
                            </ProductContainer>
                        )}
      </div>
                </ShopLayout>

                {selectedProduct && (
                    <ProductModal
                        product={selectedProduct}
                        store={STORES.find(s => s.name === selectedProduct.store)}
                        onClose={() => setSelectedProduct(null)}
                    />
                )}
            </PageContainer>
        </>
  );
}

export default Shop; 