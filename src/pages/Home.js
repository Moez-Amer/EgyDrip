import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInBlur = keyframes`
  from {
    opacity: 0;
    filter: blur(10px);
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
  }
`;

const scrollText = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const expandLine = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100px;
  }
`;

const HeroSection = styled.section`
  background-color: #fff;
  min-height: 90vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  text-align: center;
  color: black;
  padding-top: calc(20vh);
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  position: relative;
  margin-top: -2rem;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5rem;
  gap: 0.5rem;
`;

const TitlePart = styled.span`
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: clamp(3rem, 8vw, 7rem);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  opacity: 0;
  display: inline-block;
  
  &.egy {
    animation: ${slideInLeft} 0.8s ease forwards;
    animation-delay: 0.3s;
  }
  
  &.drip {
    animation: ${slideInRight} 0.8s ease forwards;
    animation-delay: 0.6s;
  }
`;

const MainTagline = styled.div`
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: clamp(1.2rem, 2vw, 1.8rem);
  font-weight: 500;
  line-height: 1.4;
  opacity: 0;
  animation: ${slideUp} 1s ease forwards;
  animation-delay: 1s;
  margin-bottom: 0.75rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background-color: #000;
    animation: ${expandLine} 0.6s ease forwards;
    animation-delay: 1.4s;
  }
`;

const SubTagline = styled.div`
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: clamp(1rem, 1.5vw, 1.4rem);
  font-weight: 400;
  line-height: 1.4;
  opacity: 0;
  color: #333;
  animation: ${fadeInBlur} 1s ease forwards;
  animation-delay: 1.6s;
  margin-bottom: 1.5rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ShopButton = styled(Link)`
  display: inline-block;
  padding: 1.25rem 3rem;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 1.2rem;
  font-weight: 500;
  color: #fff;
  background-color: #000;
  text-decoration: none;
  border-radius: 50px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  margin-top: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  opacity: 0;
  animation: ${fadeIn} 0.8s ease forwards;
  animation-delay: 1.2s;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background-color: #fff;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    transition: width 0.6s ease, height 0.6s ease;
    z-index: 1;
  }

  span {
    position: relative;
    z-index: 2;
  }

  &:hover {
    color: #000;
    box-shadow: 0 0 0 2px #000;
    transform: translateY(-2px);

    &::before {
      width: 300px;
      height: 300px;
    }
  }
`;

const AnnouncementBelt = styled.div`
  position: relative;
  width: 100%;
  background: #000;
  color: white;
  overflow: hidden;
  padding: 0.75rem 0;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  margin-top: 56px;
`;

const ScrollingContainer = styled.div`
  display: flex;
  width: fit-content;
`;

const ScrollingText = styled.div`
  display: inline-block;
  animation: ${scrollText} 45s linear infinite;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding-right: 30px;

  span {
    margin: 0 15px;
    font-weight: 700;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

function Home() {
  return (
    <MainContainer>
      <AnnouncementBelt>
        <ScrollingContainer>
          <ScrollingText>
            <span>Brand Reveal Soon</span>
            <span>Brand Reveal Soon</span>
            <span>Brand Reveal Soon</span>
            <span>Brand Reveal Soon</span>
            <span>Brand Reveal Soon</span>
            <span>Brand Reveal Soon</span>
            <span>Brand Reveal Soon</span>
            <span>Brand Reveal Soon</span>
            <span>Brand Reveal Soon</span>
            <span>Brand Reveal Soon</span>
          </ScrollingText>
          <ScrollingText>
            <span>Brand Reveal Soon</span>
            <span>Brand Reveal Soon</span>
            <span>Brand Reveal Soon</span>
            <span>Brand Reveal Soon</span>
            <span>Brand Reveal Soon</span>
            <span>Brand Reveal Soon</span>
            <span>Brand Reveal Soon</span>
            <span>Brand Reveal Soon</span>
            <span>Brand Reveal Soon</span>
            <span>Brand Reveal Soon</span>
          </ScrollingText>
        </ScrollingContainer>
      </AnnouncementBelt>
      <HeroSection>
        <HeroContent>
          <TitleContainer>
            <TitlePart className="egy">EGY</TitlePart>
            <TitlePart className="drip">DRIP</TitlePart>
          </TitleContainer>
          <MainTagline>
            The Top Egyptian Local Brands All At A Single Platform
          </MainTagline>
          <SubTagline>
            We connect the consumer and the brand in the best way possible
          </SubTagline>
          <ShopButton to="/shop">
            <span>Shop Now</span>
          </ShopButton>
        </HeroContent>
      </HeroSection>
    </MainContainer>
  );
}

export default Home; 