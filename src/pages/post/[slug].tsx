import { GetStaticPaths, GetStaticProps } from 'next';


import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import { RichText } from 'prismic-dom';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  return <h1>{post.data.content}</h1>
}


// export const getStaticPaths: GetStaticPaths  = async () => {
//   const prismic = getPrismicClient({});
//   const posts = await prismic.getByType('posts');

//   return {
//     paths: [
      
//     ],
//     fallback: false
//   }

// };

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const prismic = getPrismicClient({});

  const response = await prismic.getByUID('posts', String(params.slug), {})

  const post = {
    slug: params.slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    })
}

  return {
    props: {
      response: {post}
    }
};
}
