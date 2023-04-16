import { signIn } from 'next-auth/react';
import FormLogin from '../components/FormLogin/FormLogin';
import Wrapper from '../components/Wrapper/Wrapper';
import { useState } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleLogin = async (identifier: string, password: string) => {
    if (!identifier || !password) {
      setError('Email e senha obrigatórios');
      return;
    }

    const response = await signIn('credentials', {
      identifier,
      password,
      redirect: false,
    });

    if (!response.ok) {
      setError('Usuário ou senha inválidos');
      return;
    }

    const redirect = router?.query.redirect || '/';
    router.push(redirect as string);
  };

  return (
    <Wrapper>
      <FormLogin onLogin={handleLogin} errorMessage={error} />
    </Wrapper>
  );
};

export default Login;
