import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: white;
    padding: 0;
    border-radius: 0;
    max-width: 1200px;
    width: 95%;
    max-height: 95vh;
    overflow-y: auto;
    position: relative;
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
        width: 100%;
        height: 100%;
        max-height: 100vh;
    }
`;

const CloseButton = styled.span`
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 2rem;
    cursor: pointer;
    color: #000;
    transition: color 0.3s ease;
    z-index: 1002;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);

    &:hover {
        color: #666;
    }
`;

const ModalGrid = styled.div`
    display: grid;
    grid-template-columns: 60% 40%;
    min-height: 600px;

    @media (max-width: 968px) {
        grid-template-columns: 1fr;
    }
`;

const ImageSection = styled.div`
    background: #fff;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const ImageGallery = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.5rem;
    margin-top: 1rem;
    padding: 0 2rem;
`;

const GalleryImage = styled.img`
    width: 100%;
    aspect-ratio: 1;
    object-fit: contain;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid ${props => props.selected ? '#000' : 'transparent'};
    opacity: ${props => props.selected ? '1' : '0.7'};
    background: #fff;
    image-rendering: -webkit-optimize-contrast;
    transform: translateZ(0);
    backface-visibility: hidden;
    -webkit-font-smoothing: subpixel-antialiased;

    &:hover {
        opacity: 1;
        transform: scale(1.05) translateZ(0);
    }
`;

const MainImage = styled.div`
    position: relative;
    width: 100%;
    height: 600px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        cursor: zoom-in;
        image-rendering: -webkit-optimize-contrast;
        transform: translateZ(0);
        backface-visibility: hidden;
        -webkit-font-smoothing: subpixel-antialiased;
    }
`;

const FullScreenImage = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1001;

    img {
        max-width: 95vw;
        max-height: 95vh;
        object-fit: contain;
        image-rendering: -webkit-optimize-contrast;
        transform: translateZ(0);
        backface-visibility: hidden;
        -webkit-font-smoothing: subpixel-antialiased;
    }
`;

const ProductDetails = styled.div`
    padding: 3rem 2rem;
    border-left: 1px solid #eee;
    height: 100%;
    overflow-y: auto;

    @media (max-width: 968px) {
        border-left: none;
        border-top: 1px solid #eee;
    }
`;

const ProductTitle = styled.h2`
    font-size: 1.8rem;
    font-weight: 500;
    margin-bottom: 1rem;
    color: #1a1a1a;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const Price = styled.div`
    font-size: 1.5rem;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const Description = styled.div`
    color: #666;
    line-height: 1.8;
    margin-bottom: 2rem;
    font-size: 1rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

    ul {
        list-style-position: inside;
        margin: 1rem 0;
    }

    li {
        margin: 0.5rem 0;
    }

    p {
        margin-bottom: 1rem;
    }
`;

const Variants = styled.div`
    margin-bottom: 2rem;

    h3 {
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
        color: #666;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    select {
        width: 100%;
        padding: 1rem;
        border: 1px solid #ddd;
        border-radius: 0;
        font-size: 1rem;
        color: #1a1a1a;
        background-color: white;
        appearance: none;
        background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right 1rem center;
        background-size: 1em;

        &:focus {
            outline: none;
            border-color: #000;
        }
    }
`;

const BuyNowButton = styled.button`
    background-color: #000;
    color: white;
    border: none;
    padding: 1.2rem 2rem;
    width: 100%;
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    text-transform: uppercase;
    margin-top: 1rem;

    &:hover {
        background-color: #333;
    }

    &:disabled {
        background-color: #999;
        cursor: not-allowed;
    }
`;

function ProductModal({ product, store, onClose }) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [showFullScreen, setShowFullScreen] = useState(false);

    if (!product) return null;

    const handleBuyNow = () => {
        const storeUrl = store === 'Juvenile' ? 'https://juvenileeg.com' : 'https://twentysevenegy.myshopify.com';
        window.location.href = `${storeUrl}/cart/${product.variants[0].id}:1`;
    };

    const createMarkup = (html) => {
        return { __html: html };
    };

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <CloseButton onClick={onClose}>×</CloseButton>
                <ModalGrid>
                    <ImageSection>
                        <MainImage>
                            <img
                                src={product.images[selectedImage]?.src || 'placeholder.jpg'} 
                                alt={product.title}
                                onClick={() => setShowFullScreen(true)}
                            />
                        </MainImage>
                        <ImageGallery>
                            {product.images.map((image, index) => (
                                <GalleryImage
                                    key={index}
                                    src={image.src}
                                    alt={`${product.title} - ${index + 1}`}
                                    selected={selectedImage === index}
                                    onClick={() => setSelectedImage(index)}
                                />
                            ))}
                        </ImageGallery>
                    </ImageSection>
                    <ProductDetails>
                        <ProductTitle>{product.title}</ProductTitle>
                        <Price>LE {product.variants[0].price}</Price>
                        <Description 
                            dangerouslySetInnerHTML={createMarkup(product.body_html || 'No description available')}
                        />
                        
                        {product.variants.length > 1 && (
                            <Variants>
                                <h3>Size</h3>
                                <select>
                                    {product.variants.map(variant => (
                                        <option key={variant.id} value={variant.id}>
                                            {variant.title} - LE {variant.price}
                                        </option>
                                    ))}
                                </select>
                            </Variants>
                        )}

                        <BuyNowButton
                            onClick={handleBuyNow}
                            disabled={!product.variants[0].available}
                        >
                            {product.variants[0].available ? 'Buy Now' : 'Sold Out'}
                        </BuyNowButton>
                    </ProductDetails>
                </ModalGrid>
            </ModalContent>

            {showFullScreen && (
                <FullScreenImage onClick={() => setShowFullScreen(false)}>
                    <img 
                        src={product.images[selectedImage]?.src} 
                        alt={product.title} 
                    />
                    <CloseButton onClick={() => setShowFullScreen(false)}>×</CloseButton>
                </FullScreenImage>
            )}
        </ModalOverlay>
    );
}

export default ProductModal; 