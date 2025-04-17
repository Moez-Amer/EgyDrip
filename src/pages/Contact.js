import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const ContactContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem 2rem;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90vh;
`;

const TitleSection = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
  max-width: 700px;
`;

const MainTitle = styled.h1`
  font-size: 3.2rem;
  font-family: 'Archivo Black', 'Impact', sans-serif;
  font-weight: 900;
  letter-spacing: -0.5px;
  color: #000;
  margin: 0;
  padding: 0;
  line-height: 1;
  opacity: 0;
  animation: ${fadeIn} 0.8s ease-out forwards;
`;

const SubTitle = styled.h2`
  font-size: 1.8rem;
  font-family: 'Archivo', sans-serif;
  font-weight: 500;
  color: #000;
  margin: 1rem 0;
  line-height: 1.3;
  opacity: 0;
  animation: ${fadeIn} 0.8s ease-out forwards;
  animation-delay: 0.3s;
  
  &:after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background: #000;
    margin: 1.5rem auto;
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
  max-width: 600px;
  opacity: 0;
  animation: ${fadeIn} 0.8s ease-out forwards;
  animation-delay: 0.6s;
`;

const FormInput = styled.input`
  padding: 0.8rem;
  border: 2px solid #000;
  border-radius: 0;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #fff;
  width: 100%;
  opacity: 0;
  animation: ${slideIn} 0.5s ease-out forwards;
  animation-delay: ${props => props.delay || '0s'};
  
  &:focus {
    outline: none;
    border-color: #000;
    box-shadow: 4px 4px 0 #000;
    transform: translate(-4px, -4px);
  }
  
  &::placeholder {
    color: #666;
    font-weight: 500;
    font-family: 'Archivo', sans-serif;
  }
`;

const FormTextarea = styled.textarea`
  padding: 0.8rem;
  border: 2px solid #000;
  border-radius: 0;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: all 0.3s ease;
  background: #fff;
  width: 100%;
  opacity: 0;
  animation: ${slideIn} 0.5s ease-out forwards;
  animation-delay: 0.6s;
  
  &:focus {
    outline: none;
    border-color: #000;
    box-shadow: 4px 4px 0 #000;
    transform: translate(-4px, -4px);
  }
  
  &::placeholder {
    color: #666;
    font-weight: 500;
    font-family: 'Archivo', sans-serif;
  }
`;

const SubmitButton = styled.button`
  padding: 0.8rem;
  background: #000;
  color: white;
  border: 2px solid #000;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 2px;
  width: 100%;
  margin-top: 0.5rem;
  font-family: 'Archivo', sans-serif;
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-out forwards;
  animation-delay: 0.8s;
  
  &:hover {
    background: #fff;
    color: #000;
    box-shadow: 4px 4px 0 #000;
    transform: translate(-4px, -4px);
  }
  
  &:active {
    transform: translate(0, 0);
    box-shadow: none;
  }
`;

function Contact() {
  const [formData, setFormData] = useState({
    brandName: '',
    phoneNumber: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <ContactContainer>
      <TitleSection>
        <MainTitle>ARE YOU A BRAND OWNER?</MainTitle>
        <SubTitle>Get in touch with us and make sure you don't miss out!</SubTitle>
      </TitleSection>
      <ContactForm onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="brandName"
          placeholder="Brand Name"
          value={formData.brandName}
          onChange={handleChange}
          required
          delay="0.3s"
        />
        <FormInput
          type="tel"
          name="phoneNumber"
          placeholder="Representative Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          delay="0.4s"
        />
        <FormInput
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          required
          delay="0.5s"
        />
        <FormTextarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <SubmitButton type="submit">Send Message</SubmitButton>
      </ContactForm>
    </ContactContainer>
  );
}

export default Contact; 