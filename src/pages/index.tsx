import Prismic from '@prismicio/client';
import { GetStaticProps } from 'next';
import { FiCalendar, FiUser } from "react-icons/fi";
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
    
      
      <body className={styles.bodyContainer}>
        
        <div className={styles.bodyContent}>
          <h1>Como uilizar Hooks</h1>
          <p>Pensando em sincronização ao invés de ciclos de vida</p>
          <h5> <FiCalendar /> 15 Mar 2021</h5>
          <h5> <FiUser /> Joseph Oliveira</h5>
        </div>

        <div className={styles.bodyContent}>
          <h1>Como uilizar Hooks</h1>
          <p>Pensando em sincronização ao invés de ciclos de vida</p>
          <h5> <FiCalendar /> 15 Mar 2021</h5>
          <h5> <FiUser /> Joseph Oliveira</h5>
        </div>

        <div className={styles.bodyContent}>
          <h1>Como uilizar Hooks</h1>
          <p>Pensando em sincronização ao invés de ciclos de vida</p>
          <h5> <FiCalendar /> 15 Mar 2021</h5>
          <h5> <FiUser /> Joseph Oliveira</h5>
        </div>

       



      </body>
    
    
    </>
  );


}



export const getStaticProps = async () => {
  const prismic = getPrismicClient({});

  const posts = await prismic.getByType('posts', {
    lang: 'pt-BR',
    pageSize: 4,
  });

  return {
    props: { posts }
  }
};
