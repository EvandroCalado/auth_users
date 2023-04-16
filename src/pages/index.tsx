import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import Wrapper from '../components/Wrapper/Wrapper';

const Index = () => {
  const { data: session } = useSession();

  return (
    <Wrapper>
      <h2>Olá {session?.user?.name || 'Seja bem vindo'}</h2>
    </Wrapper>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
