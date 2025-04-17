import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LogoContainer = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
    position: relative;

    &:hover {
        transform: scale(1.02);
    }
`;

const LogoImage = styled.img`
    height: ${props => props.size === 'small' ? '80px' : '120px'};
    width: auto;
    object-fit: contain;
    filter: ${props => props.inverted ? 'brightness(0) invert(1)' : 'none'};
    opacity: ${props => props.inverted ? '0.9' : '1'};
`;

function Logo({ size = 'normal', inverted = false }) {
    return (
        <LogoContainer to="/">
            <LogoImage 
                src="/egy_drip_logo.png"
                alt="EgyDrip Logo" 
                size={size}
                inverted={inverted}
            />
        </LogoContainer>
    );
}

export default Logo; 