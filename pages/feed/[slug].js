import router from 'next/router';
import { Toolbar } from '../../components/toolbar';
import styles from '../../styles/feed.module.css'

export const Feed = ({ pageNumber, articles }) => {

  return (
    <div className='page-container'>
      <Toolbar />
      <div className={styles.main}>
        {articles.map((article, index) => (
          <div key={index} className={styles.post}>
            <h1 onClick={() => (window.location.href = article.url)}>{article.title}</h1>
            <p>{article.description}</p>
            {!!article.urlToImage && <img src={article.urlToImage} />}
          </div>
        ))}
      </div>

      <div className={styles.paginator}>
        <div
          onClick={() => {
            if (pageNumber > 1) {
              let newPage = pageNumber - 1;
              router.push('/feed/' + `${newPage}`).then(() => window.scrollTo(0, 0));
            }
          }}
          className={pageNumber === 1 ? styles.disabled : styles.active}>
          Previous Page
        </div>

        <div>#{pageNumber}</div>

        <div
          onClick={() => {
            if (pageNumber < 5) {
              let newPage = pageNumber + 1;
              router.push('/feed/' + `${newPage}`).then(() => window.scrollTo(0, 0));
            }
          }}
          className={pageNumber === 5 ? styles.disabled : styles.active}>
          Next Page
        </div>

      </div>
    </div>
  );
}

export const getServerSideProps = async pageContext => {
  const apiKey = process.env.NEXT_PUBLIC_NEWS_KEY;

  const pageNumber = pageContext.query.slug;

  // this does not work
  // if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
  //   return {
  //     props: {
  //       articles: [],
  //       pageNumber: 1,
  //     }
  //   }
  // }

  const apiResponse = await fetch(

    // this does not work
    // `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${pageNumber}`,
    // {
    //   heaaders: {
    //     Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
    //   },
    // },

    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&pageSize=5&page=${pageNumber}`,
    {
      heaaders: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`,
      },
    },
  );

  const apiJson = await apiResponse.json();

  const { articles } = apiJson;

  return {
    props: {
      articles,
      pageNumber: Number.parseInt(pageNumber),
    }
  }
};

export default Feed;