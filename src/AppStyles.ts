import styled, { css } from 'styled-components';

const card = css`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75vw;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  backface-visibility: hidden;

  @media only screen and (max-width: 960px) {
    border-radius: 1.5vw;
  }
`;

export const Cards = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1.4vw;
  padding: 0 10%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  -webkit-tap-highlight-color: transparent;

  @media only screen and (max-width: 960px) {
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 3vw;
    padding: 0 15%;
  }

  @media only screen and (max-width: 600px) {
    padding: 0 5%;
  }
`;

export const Card = styled.div<{ isFlipped: boolean }>`
  height: 0;
  padding-top: 100%;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: 0.6s cubic-bezier(0.38, 0.02, 0.09, 1.66) all;
  ${({ isFlipped }) => isFlipped && `transform: rotateY(180deg);`}
`;

export const Front = styled.div`
  ${card}
  transform: rotateY(180deg);
  border: 0.4vw solid white;
  background: white;

  @media only screen and (max-width: 960px) {
    border: 1vw solid white;
  }
`;

export const Back = styled.div`
  ${card}
  transition: 0.3s ease all;
  background: rgba(0, 0, 0, 0.6);
  border: 0.4vw solid rgba(255, 255, 255, 0.4);
  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: scale3d(1.1, 1.1, 1);
  }

  @media only screen and (max-width: 960px) {
    border: 1vw solid rgba(255, 255, 255, 0.4);
  }
`;

export const Img = styled.img`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 0.75vw;
  position: absolute;
  user-select: none;
  user-drag: none;
`;

export const Overlay = styled.div<{ menu?: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  z-index: 999;
  user-select: none;
  background: rgba(0, 0, 0, 0.6);
  animation: fadein 0.5s 0.5s forwards;
  ${({ menu }) => menu && `animation: fadein 0.5s forwards;`}

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const Container = styled.div<{ menu?: boolean }>`
  width: 70%;
  margin-left: 15%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-weight: bold;
  text-align: center;
  ${({ menu }) => menu && `width: 80%; margin-left: 10%;`}
`;

export const YouWin = styled.div`
  width: 50%;
  margin: 42px 25%;
  font-size: 5vw;
  color: black;
  background: white;

  @media only screen and (max-width: 1920px) {
    margin: 30px 25%;
  }

  @media only screen and (max-width: 960px) {
    width: 100%;
    margin: 15px 0;
    font-size: 12vw;
    border: 0.4vw solid white;
  }
`;

export const Wrapper = styled.div`
  width: 50%;
  padding: 1%;
  margin: 30px 25%;
  font-size: 2.5vw;
  border: 0.25vw solid white;
  cursor: pointer;
  color: white;
  background: rgba(0, 0, 0, 0.6);
  transition: 0.3s ease all;
  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }

  @media only screen and (max-width: 1920px) {
    margin: 20px 25%;
  }

  @media only screen and (max-width: 960px) {
    width: 100%;
    padding: 5%;
    margin: 15px 0;
    font-size: 5vw;
    border: 0.4vw solid white;
  }
`;
