import { GetServerSideProps } from 'next';
// import { useSession } from 'next-auth/react';

const Index = () => {
  // const { data: session } = useSession();

  return (
    <div>
      <h2>Index</h2>
      {/* <pre>{JSON.stringify(session)}</pre> */}
    </div>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
