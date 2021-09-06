import { Overlay, Container, Title, StyledLink, Wrapper } from './styles';

interface Props {
  restart: () => void;
}

export default function YouWin({ restart }: Props) {
  return (
    <Overlay>
      <Container>
        <Title>YOU WIN</Title>
        <StyledLink to='/'>Select Part</StyledLink>
        <Wrapper onClick={restart}>Play Again</Wrapper>
      </Container>
    </Overlay>
  );
}
