import { FiCalendar, FiUser } from "react-icons/fi";
import Header from "../components/Header";
import { getPrismicClient } from '../services/prismic';
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

      <Header />


      <body className={styles.bodyContainer}>

        <div className={styles.bodyContent}>

          {postsPagination.results.map(post => (
            <>
              <h1>{post.data.title}</h1>
              <p>{post.data.subtitle}</p>
              <h5> <FiCalendar /> {post.first_publication_date}</h5>
              <h5> <FiUser /> {post.data.author}</h5>
            </>

        ))
          }

        </div>

          <button type="button"
                  className={styles.button}
          >
            Carregar mais posts
          </button>

      </body>
    </>
  );


}


export const getStaticProps = async () => {
  const prismic = getPrismicClient({});

  const postsPagination = await prismic.getByType('posts', {
    lang: 'pt-BR',
    pageSize: 4,
  });
  
  return {
    props: { postsPagination }
  }
};
