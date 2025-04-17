import React from 'react';
import styled, { keyframes } from 'styled-components';
import Logo from './Logo';

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
`;

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: ${fadeOut} 0.5s ease forwards;
  animation-delay: ${props => props.isLoading ? '9999s' : '0.5s'};
`;

const LogoWrapper = styled.div`
  transform: scale(1.5);
  filter: brightness(0) invert(1);
  animation: ${props => props.isLoading ? 'none' : fadeOut} 0.5s ease forwards;
  animation-delay: ${props => props.isLoading ? '9999s' : '0.3s'};
`;

function LoadingScreen({ isLoading }) {
  return (
    <LoadingContainer isLoading={isLoading}>
      <LogoWrapper isLoading={isLoading}>
        <Logo size="small" />
      </LogoWrapper>
    </LoadingContainer>
  );
}

export default LoadingScreen; 