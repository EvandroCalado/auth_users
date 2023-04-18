import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Wrapper from '../components/Wrapper/Wrapper';
import { FrontEndRedirect } from '../utils/front-end-redirect';
import { serverSideRedirect } from '../utils/server-side-redirect';
import { endpoints } from '../config/endpoints';
import { mapData } from '../map/mapData';
import Link from 'next/link';

export type StrapiPost = {
  id?: string;
  title: string;
  content: string;
};

export type PostsProps = {
  posts?: StrapiPost[];
};

const Posts = ({ posts = [] }: PostsProps) => {
  const { data: session, status } = useSession();

  if (status === 'loading' && !session) {
    return FrontEndRedirect();
  }

  const postsData = mapData(posts);

  return (
    <Wrapper>
      <h2>Olá {session?.user?.name || 'Seja bem vindo'}</h2>

      {session &&
        postsData.map((post) => {
          return (
            <p key={post.id}>
              <Link href={`/${post.id}`}>{post.title}</Link>
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
