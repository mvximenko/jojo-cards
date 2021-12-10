import { useState, useEffect, useRef, useLayoutEffect, useMemo } from 'react';
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

  const [opened, setOpened] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);

  const [{ start, end }, setPosition] = useState(() =>
    getPosition(users[part].length)
  );

  const pairs = useMemo(
    () => shuffleArrays(users[part], stands[part], start, end),
    [part, start, end]
  );

  const counter = useRef(0);
  const imageLoaded = () => {
    counter.current += 1;
    if (counter.current >= 23) {
      setLoading(false);
    }
  };

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

  const flipCard = (index: number, id: number) => {
    if (!busy && !matched.includes(id)) {
      setOpened((opened) => [...opened, index]);
    }
  };

  const restart = () => {
    setLoading(true);
    counter.current = 0;
    setMatched([]);
    setOpened([]);
    setTimeout(() => {
      setPosition(() => getPosition(users[part].length));
    }, 300);
  };

  return (
    <>
      {matched.length === pairs.length / 2 && <YouWin restart={restart} />}

      {loading && <Spinner />}

      <Cards $loading={loading}>
        {pairs.map((pair, index) => {
          let isFlipped = false;

          if (opened.includes(index)) isFlipped = true;
          if (matched.includes(pair.id)) isFlipped = true;

          return (
            <Card
              key={index}
              isFlipped={isFlipped}
              onClick={() => flipCard(index, pair.id)}
            >
              <Front>
                <Img
                  src={`${API_IMG}${pair.image}.webp`}
                  alt={pair.name}
                  onLoad={imageLoaded}
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
