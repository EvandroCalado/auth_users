import Link from 'next/link';
import * as Styled from './Menu.styles';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const Menu = () => {
  const { data: session } = useSession();
  const [redirect, setRedirect] = useState('/');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setRedirect(encodeURI(window.location.pathname));
  }, []);

  const handleClick = async (event: React.MouseEvent) => {
    event.preventDefault();
    signOut({ redirect: false });
  };

  return (
    <Styled.Wrapper>
      <Link href={'/'}>Home</Link>
      <Link href={'/posts'}>Posts</Link>
      <Link href={'/create-post'}>Create post</Link>
      {session ? (
        <Link href={'#'} onClick={handleClick}>
          Sair
        </Link>
      ) : (
        <Link
          href={{
            pathname: '/login',
            query: {
              redirect,
            },
          }}
        >
          Login
        </Link>
      )}
    </Styled.Wrapper>
  );
};

export default Menu;
