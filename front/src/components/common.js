import React from 'react';
import styled from 'styled-components';

export const Separator = styled.div`
  width: 100%;
  height: 0;
  border-top: 4px dashed ${props => props.theme.accent};
  margin-bottom: ${props => props.m || '50px'};
`;

export const Filler = styled.div`
  min-height: ${props => props.h}px;
`;

export const FluidContent = styled.div`
  max-width: ${props => props.w || '1100'}px;
  margin: 0 auto;
  padding: ${props => props.p || '50px'};
  position: relative;
`;

export const Header = styled.header`
  background: url(${props => props.url});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding: 20px;
  text-align: center;
`;

export const SearchBar = styled.input`
  width: 100%;
  border: 0;
  outline: none;
  font-size: 20px;
  border-radius: 20px;
  padding: 8px 25px;
  font-family: 'Roboto';
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

export const Banner = styled.div`
  background: rgba(27, 56, 142, 0.7);
  text-align: center;
  padding: 30px;
  margin: 0 -20px;
  margin-bottom: 50px;
  > h1 {
    font-size: 2em;
    font-weight: normal;
    margin: 0;
    margin-bottom: 10px;
    color: white;
  }
  > p {
    color: ${props => props.theme.accent};
    font-size: 1em;
    margin-bottom: 0;
  }
`;
