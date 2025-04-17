import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

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

const underlineAnimation = keyframes`
  0% {
    width: 0;
    left: 0;
  }
  50% {
    width: 100%;
    left: 0;
  }
  100% {
    width: 0;
    left: 100%;
  }
`;

const AboutContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 4rem 2rem;
  font-family: 'Inter', sans-serif;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  overflow: hidden;
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: 900;
  font-family: 'Archivo Black', sans-serif;
  letter-spacing: -0.02em;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    height: 3px;
    background: #000;
    animation: ${underlineAnimation} 2s ease-in-out infinite;
    animation-delay: 1.2s;
  }
`;

const TitlePart = styled.span`
  display: inline-block;
  opacity: 0;
  position: relative;
  
  &.about {
    animation: ${slideInLeft} 0.8s ease forwards;
    animation-delay: 0.3s;
  }
  
  &.egydrip {
    animation: ${slideInRight} 0.8s ease forwards;
    animation-delay: 0.6s;
  }

  &:hover {
    transform: translateY(-2px);
    transition: transform 0.3s ease;
  }
`;

const ContentSection = styled.section`
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TextBlock = styled.div`
  background: #fff;
  padding: 2.5rem;
  border-radius: 24px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.04);
  margin-bottom: 2rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.08);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #000, transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const Paragraph = styled.p`
  font-size: clamp(1.1rem, 2vw, 1.25rem);
  line-height: 1.8;
  color: #333;
  margin-bottom: 1.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }

  strong {
    background: linear-gradient(120deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.1) 100%);
    background-repeat: no-repeat;
    background-size: 100% 0.4em;
    background-position: 0 88%;
    transition: background-size 0.25s ease-in;
    font-weight: 600;
    
    &:hover {
      background-size: 100% 100%;
    }
  }
`;

const Emoji = styled.span`
  font-size: 1.3em;
  vertical-align: middle;
  line-height: 1;
  margin: 0 0.2em;
`;

function About() {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    sectionRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <AboutContainer>
      <Header>
        <Title>
          <TitlePart className="about">ABOUT</TitlePart>
          <TitlePart className="egydrip">EGYDRIP</TitlePart>
        </Title>
      </Header>

      <ContentSection ref={addToRefs}>
        <TextBlock>
          <Paragraph>
            Let's be real — finding local apparel brands shouldn't feel like a full-time job. I was tired of bouncing between <strong>Instagram</strong>, <strong>TikTok</strong>, and random websites just to find a decent fit. Way too much effort. <Emoji>😤</Emoji>
          </Paragraph>
        </TextBlock>
      </ContentSection>

      <ContentSection ref={addToRefs}>
        <TextBlock>
          <Paragraph>
            That's why I built EgyDrip. It's your go-to spot for discovering all the local drip in one place. No more endless scrolling, just straight-up style — quick, easy, and actually organized. <Emoji>💯</Emoji>
          </Paragraph>
        </TextBlock>
      </ContentSection>

      <ContentSection ref={addToRefs}>
        <TextBlock>
          <Paragraph>
            I'm just an engineer-in-the-making who got sick of the mess and decided to fix it. EgyDrip is built by one of us, for all of us. <Emoji>🛠️</Emoji>
          </Paragraph>
        </TextBlock>
      </ContentSection>

      <ContentSection ref={addToRefs}>
        <TextBlock style={{ marginBottom: 0 }}>
          <Paragraph>
            If you're into repping local and keeping it efficient, you're in the right place. Tap in — this is from the people, to the people. <Emoji>🔥</Emoji>
          </Paragraph>
        </TextBlock>
      </ContentSection>
    </AboutContainer>
  );
}

export default About; 