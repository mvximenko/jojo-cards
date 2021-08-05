import { useState, useMemo } from 'react';
import stands from './data/stands';
import users from './data/users';
import { API_IMG } from './config';
import { GlobalStyle } from './GlobalStyles';
import { Cards, Card, Front, Back, Img } from './AppStyles';
import { getPosition, shuffleArrays } from './helpers';

export default function App() {
  const [{ start, end }] = useState(() => getPosition(users[0].length));

  const pairs = useMemo(
    () => shuffleArrays(users[0], stands[0], start, end),
    [start, end]
  );

  return (
    <>
      <GlobalStyle />
      <Cards>
        {pairs.map((stand, index) => (
          <Card key={index} isFlipped={true}>
            <Front>
              <Img src={`${API_IMG}${stand.image}.webp`} alt={stand.name} />
            </Front>
            <Back></Back>
          </Card>
        ))}
      </Cards>
    </>
  );
}
