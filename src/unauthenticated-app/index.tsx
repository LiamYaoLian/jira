/**
 * Screen before authentication
 */
import {useState} from 'react';
import {RegisterScreen} from './register';
import {LoginScreen} from './login';
import {Button, Card, Divider} from 'antd';
import styled from '@emotion/styled';
import logo from 'assets/logo.svg';
import left from 'assets/left.svg';
import right from 'assets/right.svg';
import {useDocumentTitle} from '../utils';
import {ErrorBox} from "../components/lib";

export default () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useDocumentTitle('Please Log In or Register to Continue', false);

  return (
    <Container>
      <Header/>
      <Background/>
      <ShadowCard>
        <Title>{isRegister ? 'Register' : 'Login'}</Title>
        <ErrorBox error={error}/>
        {isRegister ? (
          <RegisterScreen onError={setError}/>
        ) : (
          <LoginScreen onError={setError}/>
        )}
        <Divider/>

        <Button type={'link'} onClick={() => setIsRegister(!isRegister)}>{isRegister ? 'Login' : 'Register'}</Button>
      </ShadowCard>
    </Container>
  );
};

export const LongButton = styled(Button)`
  width: 100%;
`;

export const ShortButton = styled(Button)`
  width: 45%;
  margin: 2.5%;
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  // The background is fixed relative to the viewport.
  background-attachment: fixed;
  // The background-position CSS property sets the initial position for each background image.
  background-position: left bottom, right bottom;
  background-size: calc((100vw - 40rem) / 2 - 3.2rem), calc((100vw - 40rem) / 2 - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  /* offset-x | offset-y | blur-radius | color */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;
