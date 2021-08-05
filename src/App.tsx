import stands from './data/stands';
import users from './data/users';
import { API_IMG } from './config';
import { GlobalStyle } from './GlobalStyles';
import { Cards, Card, Front, Back, Img } from './AppStyles';

function App() {
  return (
    <>
      <GlobalStyle />
      <Cards>
        {stands[0].slice(0, 28).map((stand, index) => (
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

export default App;
