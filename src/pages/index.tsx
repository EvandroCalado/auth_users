import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';

const Index = () => {
  const { data: session } = useSession();

  return (
    <h3>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </h3>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
