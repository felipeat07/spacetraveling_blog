import Prismic from '@prismicio/client';
import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  return (
    <>
      
      <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <img src="/images/Logo.svg" alt="logo" />
        </div>
      </header>
    
      
      <body>
        
      </body>
    
    
    </>
  );




}





export const getStaticProps = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType([
    Prismic.predicate.at('document.type', 'posts')
  ], {
    fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
    pageSize: 4
  }
  );

  return {
    props: { postsResponse }
  }
};
