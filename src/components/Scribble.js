import React from 'react';
import styled, { keyframes } from 'styled-components';

const draw = keyframes`
    0% {
        stroke-dashoffset: 2000;
    }
    100% {
        stroke-dashoffset: 0;
    }
`;

const ScribbleContainer = styled.div`
    width: 180px;
    height: 50px;
    opacity: 0.7;
    transform: ${props => props.flip ? 'scaleX(-1)' : 'none'};
`;

const ScribbleSVG = styled.svg`
    width: 100%;
    height: 100%;

    path {
        fill: none;
        stroke: #fff;
        stroke-width: 2.5;
        stroke-linecap: round;
        stroke-linejoin: miter;
        stroke-dasharray: 2000;
        stroke-dashoffset: 0;
        animation: ${draw} 3s ease-in-out infinite alternate;
    }
`;

function Scribble({ flip }) {
    return (
        <ScribbleContainer flip={flip}>
            <ScribbleSVG viewBox="0 0 300 80">
                {/* Main wavy line */}
                <path d="M10 40 Q 40 10, 70 40 T 130 40 T 190 40 T 250 40" />
                
                {/* Additional decorative lines */}
                <path d="M20 20 Q 50 0, 80 30 T 140 30 T 200 30" 
                    style={{ opacity: 0.8, animationDelay: '0.2s', strokeWidth: '2.2' }} />
                    
                <path d="M15 60 Q 45 30, 75 50 T 135 50 T 195 50 T 255 50" 
                    style={{ opacity: 0.6, animationDelay: '0.4s', strokeWidth: '2.8' }} />
                    
                <path d="M5 35 Q 35 5, 65 35 T 125 35 T 185 35 T 245 35" 
                    style={{ opacity: 0.7, animationDelay: '0.6s', strokeWidth: '2.3' }} />
                    
                <path d="M25 45 Q 55 15, 85 45 T 145 45 T 205 45" 
                    style={{ opacity: 0.5, animationDelay: '0.8s', strokeWidth: '2.6' }} />
            </ScribbleSVG>
        </ScribbleContainer>
    );
}

export default Scribble; 