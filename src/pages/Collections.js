import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CollectionsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem;
`;

const CollectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const CollectionCard = styled(Link)`
  position: relative;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;
  color: white;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const CollectionImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const CollectionOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
`;

const CollectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const CollectionDescription = styled.p`
  font-size: 1.1rem;
  max-width: 300px;
  opacity: 0.9;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #1a1a1a;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: #1a1a1a;
  }
`;

function Collections() {
  const collections = [
    {
      id: 1,
      title: "Summer Collection",
      description: "Light and breezy pieces for the hot season",
      image: "/images/summer-collection.jpg",
      link: "/shop?category=summer"
    },
    {
      id: 2,
      title: "Winter Collection",
      description: "Stay warm and stylish with our winter essentials",
      image: "/images/winter-collection.jpg",
      link: "/shop?category=winter"
    },
    {
      id: 3,
      title: "Street Style",
      description: "Urban fashion for the bold and authentic",
      image: "/images/street-collection.jpg",
      link: "/shop?category=street"
    },
    {
      id: 4,
      title: "Basics",
      description: "Essential pieces for your everyday wardrobe",
      image: "/images/basics-collection.jpg",
      link: "/shop?category=basics"
    }
  ];

  return (
    <CollectionsContainer>
      <PageTitle>Our Collections</PageTitle>
      <CollectionGrid>
        {collections.map(collection => (
          <CollectionCard key={collection.id} to={collection.link}>
            <CollectionImage src={collection.image} alt={collection.title} />
            <CollectionOverlay>
              <CollectionTitle>{collection.title}</CollectionTitle>
              <CollectionDescription>{collection.description}</CollectionDescription>
            </CollectionOverlay>
          </CollectionCard>
        ))}
      </CollectionGrid>
    </CollectionsContainer>
  );
}

export default Collections; 