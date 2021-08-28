import { useState, useEffect, useMemo } from 'react';
import stands from './data/stands';
import users from './data/users';
import { API_IMG } from './config';
import { getPosition, shuffleArrays } from './helpers';
import { GlobalStyle } from './GlobalStyles';
import {
  Cards,
  Card,
  Front,
  Back,
  Img,
  Overlay,
  Container,
  YouWin,
  Wrapper,
} from './AppStyles';

export default function App() {
  const [part, setPart] = useState(0);
  const [menu, setMenu] = useState(true);
  const [openedCard, setOpenedCard] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [isBusy, setIsBusy] = useState(false);

  const [{ start, end }, setPosition] = useState(() =>
    getPosition(users[part].length)
  );

  const pairs = useMemo(
    () => shuffleArrays(users[part], stands[part], start, end),
    [part, start, end]
  );

  useEffect(() => {
    if (openedCard.length < 2) return;

    const first = pairs[openedCard[0]];
    const second = pairs[openedCard[1]];

    const isNewMatch =
      first.id === second.id &&
      first.name !== second.name &&
      !matched.includes(first.id);

    if (isNewMatch) setMatched([...matched, first.id]);

    if (openedCard.length === 2) {
      setIsBusy(true);
      setTimeout(() => {
        setOpenedCard([]);
        setIsBusy(false);
      }, 1000);
    }
  }, [openedCard, pairs, matched]);

  const flipCard = (index: number) => {
    if (!isBusy) setOpenedCard((opened) => [...opened, index]);
  };

  const restart = () => {
    setMatched([]);
    setOpenedCard([]);
    setTimeout(() => {
      setPart(part);
      setPosition(() => getPosition(users[part].length));
    }, 500);
  };

  const startGame = (part: number) => {
    setPart(part);
    setPosition(() => getPosition(users[part].length));
    setMenu(false);
    setMatched([]);
    setOpenedCard([]);
  };

  return (
    <>
      <GlobalStyle />

      {menu ? (
        <Overlay menu>
          <Container menu>
            <Wrapper onClick={() => startGame(0)}>Stardust Crusaders</Wrapper>
            <Wrapper onClick={() => startGame(1)}>
              Diamond Is Unbreakable
            </Wrapper>
            <Wrapper onClick={() => startGame(2)}>Golden Wind</Wrapper>
            <Wrapper onClick={() => startGame(3)}>Stone Ocean</Wrapper>
            <Wrapper onClick={() => startGame(4)}>Steel Ball Run</Wrapper>
            {/* 
              <Wrapper onClick={() => startGame(5)}>JoJolion</Wrapper> 
            */}
          </Container>
        </Overlay>
      ) : (
        <>
          {matched.length === 14 && (
            <Overlay>
              <Container>
                <YouWin>YOU WIN</YouWin>
                <Wrapper onClick={() => setMenu(true)}>Select Part</Wrapper>
                <Wrapper onClick={restart}>Again</Wrapper>
              </Container>
            </Overlay>
          )}

          <Cards>
            {pairs.map((pair, index) => {
              let isFlipped = false;

              if (openedCard.includes(index)) isFlipped = true;
              if (matched.includes(pair.id)) isFlipped = true;

              return (
                <Card
                  key={index}
                  isFlipped={isFlipped}
                  onClick={() => flipCard(index)}
                >
                  <Front>
                    <Img src={`${API_IMG}${pair.image}.webp`} alt={pair.name} />
                  </Front>
                  <Back></Back>
                </Card>
              );
            })}
          </Cards>
        </>
      )}
    </>
  );
}
