import { useState } from 'react';
import TextInput from '../TextInput/TextInput';
import * as Styled from './FormLogin.styles';
import { Email, Password, Login } from '@styled-icons/material-outlined';
import Button from '../Button/Button';

export type FormLoginProps = {
  errorMessage?: string;
  onLogin?: (email: string, password: string) => Promise<void>;
};

const FormLogin = ({ errorMessage, onLogin }: FormLoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    setLoading(true);
    event.preventDefault();

    if (onLogin) {
      await onLogin(email, password);
    }

    setLoading(false);
  };

  return (
    <Styled.Wrapper onSubmit={handleSubmit}>
      <TextInput
        name="user-identifier"
        label="Seu email"
        onInputChange={(value) => setEmail(value)}
        value={email}
        icon={<Email />}
        type="email"
      />
      <TextInput
        name="user-password"
        label="Sua senha"
        onInputChange={(value) => setPassword(value)}
        value={password}
        icon={<Password />}
        type="password"
      />

      {!!errorMessage && (
        <Styled.ErrorMessage>{errorMessage}</Styled.ErrorMessage>
      )}

      <Styled.ButtonWrapper>
        <Button
          color={'primary'}
          icon={loading ? '' : <Login />}
          disabled={loading}
        >
          {loading ? 'Logando...' : 'Login'}
        </Button>
      </Styled.ButtonWrapper>
    </Styled.Wrapper>
  );
};

export default FormLogin;
