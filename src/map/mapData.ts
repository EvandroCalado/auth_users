export const mapData = (posts) => {
  const PostsData = posts.data.map((post) => {
    return {
      id: post.id,
      title: post.attributes.title,
      content: post.attributes.title,
    };
  });

  return PostsData;
};
