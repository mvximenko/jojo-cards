import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Game from './components/Game';
import { GlobalStyle } from './GlobalStyles';

export default function App() {
  const [palette, setPalette] = useState(1);

  return (
    <>
      <GlobalStyle palette={palette} />
      <Switch>
        <Route path='/game/:id'>
          <Game setPalette={setPalette} />
        </Route>
        <Route path='/' component={Menu} />
      </Switch>
    </>
  );
}
