import { Overlay, Container, StyledLink } from './styles';

export default function Menu() {
  return (
    <Overlay menu>
      <Container menu>
        <StyledLink to='/game/0'>Stardust Crusaders</StyledLink>
        <StyledLink to='/game/1'>Diamond Is Unbreakable</StyledLink>
        <StyledLink to='/game/2'>Golden Wind</StyledLink>
        <StyledLink to='/game/3'>Stone Ocean</StyledLink>
        <StyledLink to='/game/4'>Steel Ball Run</StyledLink>
        <StyledLink to='/game/5'>JoJolion</StyledLink>
      </Container>
    </Overlay>
  );
}
