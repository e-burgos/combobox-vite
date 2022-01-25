import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 300px;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

export const Input = styled.input`
  color: #4192f1;
  padding-left: 20px;
  font-size: 16px;
  border: 2px solid #555;
  background-color: black;
  border-radius: 6px;
  height: 40px;
  caret-color: transparent;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
    border: 2px solid #4192f1;
  }
`;

export const SearchInput = styled.input`
  color: #4192f1;
  padding-left: 20px;
  font-size: 16px;
  border: 2px solid #555;
  background-color: black;
  border-radius: 6px;
  height: 40px;
  &:focus {
    outline: none;
    border: 2px solid #4192f1;
  }
`;

export const ArrowIcon = styled.img`
  width: 12px;
  height: 12px;
  position: absolute;
  top: 18px;
  left: 270px;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 768px) {
    left: 90%;
  }
`;

export const Options = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: #555;
  padding: 5px 0 5px;
  border-radius: 6px;
  width: 100%;
  top: 55px;
  max-height: 200px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const Item = styled.p`
  color: white;
  font-size: 16px;
  padding: 8px 20px 8px 20px;
  margin: 0;
  &:hover {
    background-color: #333;
  }
`;

export const Helper = styled.p`
  color: white;
  font-size: 16px;
  padding: 8px 20px 8px 20px;
  margin: 0;
  text-align: center;
`;

export const CloseIcon = styled.img`
  width: 12px;
  height: 12px;
  position: absolute;
  top: 18px;
  left: 240px;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 768px) {
    left: 82%;
  }
`;
