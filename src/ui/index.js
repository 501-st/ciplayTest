import styled from "styled-components";

export const Box = styled.div`
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 2px 17px 8px rgba(34, 60, 80, 0.21);
  width: 400px;
  text-align: center;
  position: relative;
`;

export const Input = styled.input`
  border-radius: 10px;
  padding: 5px 10px;
  width: calc(100% - 20px);
  margin-bottom: 20px;
`;

export const Title = styled.div`
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 30px;
`;

export const Button = styled.button`
  background-color: #00FA9A;
  font-size: 20px;
  border-radius: 10px;
  cursor: pointer;
  padding: 10px 15px;
  margin-top: 30px;
`;