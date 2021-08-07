import { useState, useEffect, useMemo } from 'react';
import stands from './data/stands';
import users from './data/users';
import { API_IMG } from './config';
import { GlobalStyle } from './GlobalStyles';
import { Cards, Card, Front, Back, Img } from './AppStyles';
import { getPosition, shuffleArrays } from './helpers';

export default function App() {
  const [{ start, end }] = useState(() => getPosition(users[0].length));
  const [openedCard, setOpenedCard] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [isBusy, setIsBusy] = useState(false);

  const pairs = useMemo(
    () => shuffleArrays(users[0], stands[0], start, end),
    [start, end]
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

  return (
    <>
      <GlobalStyle />
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
  );
}
