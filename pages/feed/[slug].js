import router from 'next/router';
import { Toolbar } from '../../components/toolbar';
import styles from '../../styles/feed.module.css'
import Image from 'next/image'

export const Feed = ({ pageNumber, articles }) => {

  console.log("articles: " + JSON.stringify(articles, null, 2));

  return (
    <div className='page-container'>
      <Toolbar />
      <div className={styles.main}>
        {articles.map((article, index) => (
          <div key={index} className={styles.post}>
            <h1 onClick={() => (window.location.href = article.url)}>{article.title}</h1>
            <p>{article.description}</p>
            {/* {!!article.urlToImage && <img src={article.urlToImage} alt={article.title} />} */}
            {!!article.urlToImage && <Image className={styles.img} src={article.urlToImage} alt={article.title} width={500} height={350} />}
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

  const apiResponse = await fetch(

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