import Link from 'next/link';
import { useEffect, useState } from "react";
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

  const [pagination, setPagination] = useState<PostPagination>();
  const [loadPosts, setLoadPosts] = useState<boolean>(false)


  useEffect(() => {
    fetch(postsPagination.next_page)
      .then(response => response.json())
      .then(data => setPagination(data))
  }, [])

  function hundleLoadMorePosts(){
     setLoadPosts(true)
  }

  return (
    <>

      <Header />


      <body className={styles.bodyContainer}>

        <div className={styles.bodyContent}>


          {postsPagination.results.map(post => (
            <>
            <Link href={`/post/${post.uid}`}>
              <h1>{post.data.title}</h1>
            </Link>
              <p>{post.data.subtitle}</p>
              <h5> <FiCalendar /> {post.first_publication_date}</h5>
              <h5> <FiUser /> {post.data.author}</h5>
            </>
          ))
          }

          {loadPosts ? 
          
          pagination.results.map(post => (
            <>
              <h1>{post.data.title}</h1>
              <p>{post.data.subtitle}</p>
              <h5> <FiCalendar /> {post.first_publication_date}</h5>
              <h5> <FiUser /> {post.data.author}</h5>
            </>
          ))
            : ''
        }


        </div>

        <button type="button"
          className={loadPosts ? styles.buttonHidden : styles.button}
          onClick={hundleLoadMorePosts}
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
    pageSize: 2,
  });
  return {
    props: { postsPagination }
  }
};