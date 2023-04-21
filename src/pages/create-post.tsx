import { GetServerSideProps } from 'next';
import FormPost from '../components/FormPost/FormPost';
import Wrapper from '../components/Wrapper/Wrapper';
import { FrontEndRedirect } from '../utils/front-end-redirect';
import { getSession, useSession } from 'next-auth/react';
import { endpoints } from '../config/endpoints';
import { serverSideRedirect } from '../utils/server-side-redirect';
import { StrapiPost } from './posts';
import { useRouter } from 'next/router';

const CreatePost = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading' && !session) {
    return FrontEndRedirect();
  }

  const handleSave = async ({ title, content }) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${endpoints.createPost}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session.user.jwt}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: {
              title,
              content,
            },
          }),
        },
      );

      const createdPost = await res.json();

      if (createdPost) {
        router.push(`/posts`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <FormPost onSave={handleSave} />
    </Wrapper>
  );
};

export default CreatePost;

export type PostDataProps = {
  data: StrapiPost[];
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return serverSideRedirect(ctx);
  }

  return {
    props: { session },
  };
};
