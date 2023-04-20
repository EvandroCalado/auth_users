import { GetServerSideProps } from 'next';
import FormPost from '../components/FormPost/FormPost';
import Wrapper from '../components/Wrapper/Wrapper';
import { FrontEndRedirect } from '../utils/front-end-redirect';
import { getSession, useSession } from 'next-auth/react';
import { endpoints } from '../config/endpoints';
import { serverSideRedirect } from '../utils/server-side-redirect';
import { StrapiPost } from './posts';

export type PostProps = {
  post: StrapiPost;
};

const Post = ({ post }: PostProps) => {
  const { data: session, status } = useSession();

  if (status === 'loading' && !session) {
    return FrontEndRedirect();
  }

  const handleSave = async ({ id, title, content }) => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${endpoints.updatePost}${id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${session.user.jwt}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: {
              id,
              title,
              content,
            },
          }),
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <FormPost onSave={handleSave} post={post} />
    </Wrapper>
  );
};

export default Post;

export type PostDataProps = {
  data: StrapiPost[];
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  const { id } = ctx.params;

  if (!session) {
    return serverSideRedirect(ctx);
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${endpoints.getOnePost}${id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session.user.jwt}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const post: PostDataProps = await res.json();

    return {
      props: {
        session,
        post: post.data[0],
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
