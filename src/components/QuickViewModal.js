import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 4px;
    max-width: 800px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        padding: 1rem;
    }
`;

const CloseButton = styled.span`
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.5rem;
    cursor: pointer;
    color: #1a1a1a;
    background: none;
    border: none;
`;

const ModalImage = styled.div`
    img {
        width: 100%;
        height: auto;
        object-fit: cover;
    }
`;

const ModalInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const ModalTitle = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #1a1a1a;
`;

const ModalPrice = styled.p`
    font-size: 1.2rem;
    font-weight: 500;
    color: #1a1a1a;
`;

const ModalDescription = styled.p`
    color: #666;
    line-height: 1.6;
`;

const BuyNowButton = styled.button`
    background-color: #000;
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
    text-transform: uppercase;
    width: 100%;

    &:hover {
        background-color: #1a1a1a;
    }

    &:disabled {
        background-color: #999;
        cursor: not-allowed;
    }
`;

function QuickViewModal({ product, store, onClose }) {
    if (!product) return null;

    const handleBuyNow = () => {
        const storeUrl = store === 'Juvenile' ? 'https://juvenileeg.com' : 'https://twentysevenegy.myshopify.com';
        window.location.href = `${storeUrl}/cart/${product.variants[0].id}:1`;
    };

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <ModalImage>
                    <img src={product.images[0]?.src || 'placeholder.jpg'} alt={product.title} />
                </ModalImage>
                <ModalInfo>
                    <ModalTitle>{product.title}</ModalTitle>
                    <ModalPrice>LE {product.variants[0].price}</ModalPrice>
                    <ModalDescription>
                        {product.description || 'No description available'}
                    </ModalDescription>
                    <BuyNowButton
                        onClick={handleBuyNow}
                        disabled={!product.variants[0].available}
                    >
                        {product.variants[0].available ? 'Buy Now' : 'Sold Out'}
                    </BuyNowButton>
                </ModalInfo>
            </ModalContent>
        </ModalOverlay>
    );
}

export default QuickViewModal; 