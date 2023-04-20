import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Wrapper from '../components/Wrapper/Wrapper';
import { FrontEndRedirect } from '../utils/front-end-redirect';
import { serverSideRedirect } from '../utils/server-side-redirect';
import { endpoints } from '../config/endpoints';
import Link from 'next/link';
import Button from '../components/Button/Button';
import { Delete } from '@styled-icons/material-outlined';
import { useEffect, useState } from 'react';

export type StrapiPost = {
  id?: string;
  attributes: {
    title: string;
    content: string;
  };
};

export type StrapiData = {
  data: StrapiPost[];
};

export type PostsProps = {
  posts?: StrapiData;
};

const Posts = ({ posts: { data = [] } }: PostsProps) => {
  const { data: session, status } = useSession();
  const [statePosts, setStatePosts] = useState(data);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setStatePosts(data);
  }, [data]);

  if (status === 'loading' && !session) {
    return FrontEndRedirect();
  }

  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${endpoints.deletePost}${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${session.user.jwt}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const deletedPost = await res.json();

      setStatePosts((data) => data.filter((post) => post.id !== id));

      console.log(deletedPost);
    } catch (error) {
      console.log(error);
    }

    setDeleting(false);
  };

  return (
    <Wrapper>
      <h2>Olá {session?.user?.name || 'Seja bem vindo'}</h2>

      {session &&
        statePosts.map((post) => {
          return (
            <p
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              key={post.id}
            >
              <Link href={`/${post.id}`}>{post.attributes.title}</Link>
              <Button
                onClick={() => handleDelete(post.id)}
                color="secondary"
                icon={<Delete />}
                disabled={deleting}
              >
                Excluir
              </Button>
            </p>
          );
        })}
    </Wrapper>
  );
};

export default Posts;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return serverSideRedirect(ctx);
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${endpoints.getPosts}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session.user.jwt}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const posts = await res.json();

    return {
      props: {
        session,
        posts,
      },
    };
  } catch (error) {
    console.log(error);
    serverSideRedirect(ctx);
  }

  return {
    props: {},
  };
};
