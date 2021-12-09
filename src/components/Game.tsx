import { useState, useEffect, useLayoutEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from './Spinner';
import YouWin from './YouWin';
import stands from '../data/stands';
import users from '../data/users';
import { API_IMG } from '../config';
import { getPosition, shuffleArrays } from '../helpers';
import { Cards, Card, Front, Back, Img } from './styles';

interface Props {
  setPalette: React.Dispatch<React.SetStateAction<number>>;
}

export default function Game({ setPalette }: Props) {
  const { id } = useParams<{ id: string }>();
  const part = +id;

  useLayoutEffect(() => {
    setPalette(part);
  }, [setPalette, part]);

  const [loaded, setLoaded] = useState(0);
  const [opened, setOpened] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [busy, setBusy] = useState(false);

  const [{ start, end }, setPosition] = useState(() =>
    getPosition(users[part].length)
  );

  const pairs = useMemo(
    () => shuffleArrays(users[part], stands[part], start, end),
    [part, start, end]
  );

  useEffect(() => {
    if (opened.length < 2) return;

    const first = pairs[opened[0]];
    const second = pairs[opened[1]];

    const isNewMatch =
      first.id === second.id &&
      first.image !== second.image &&
      !matched.includes(first.id);

    if (isNewMatch) setMatched([...matched, first.id]);

    if (opened.length === 2) {
      setBusy(true);
      setTimeout(() => {
        setOpened([]);
        setBusy(false);
      }, 1000);
    }
  }, [opened, pairs, matched]);

  const flipCard = (index: number) => {
    if (!busy) setOpened((opened) => [...opened, index]);
  };

  const restart = () => {
    setMatched([]);
    setOpened([]);
    setTimeout(() => {
      setPosition(() => getPosition(users[part].length));
    }, 500);
  };

  return (
    <>
      {matched.length === 14 && <YouWin restart={restart} />}

      {loaded !== 28 && <Spinner />}

      <Cards loaded={loaded}>
        {pairs.map((pair, index) => {
          let isFlipped = false;

          if (opened.includes(index)) isFlipped = true;
          if (matched.includes(pair.id)) isFlipped = true;

          return (
            <Card
              key={index}
              isFlipped={isFlipped}
              onClick={() => flipCard(index)}
            >
              <Front>
                <Img
                  src={`${API_IMG}${pair.image}.webp`}
                  alt={pair.name}
                  onLoad={() => setLoaded(loaded + 1)}
                />
              </Front>
              <Back />
            </Card>
          );
        })}
      </Cards>
    </>
  );
}
