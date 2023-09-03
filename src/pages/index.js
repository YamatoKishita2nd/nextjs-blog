import styles from '@/styles/Home.module.css';
import Link from 'next/link';
import Layout, { siteTitle } from '../../components/Layout';
import utilStyles from "../styles/utils.module.css";
import { getPostData } from '../../lib/post';
import Head from 'next/head';

// SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostData(); // id, title, date, thumbnail
  // console.log(allPostsData);
  
  return {
    props: {
      allPostsData,
    },
  };
}

// // SSGの場合
// export async function getServerSidePops(context) {
//   return {
//     props: {
//       // コンポーネントに渡すためのprops
//     },
//   };
// }

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          こんにちは、Kishita Yamatoです。
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2>📝エンジニアブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({id, title, date, thumbnail}) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={`${thumbnail}`} className={styles.thumbnailImage} />
              </Link>
              <Link href={`/posts/${id}`} legacyBehavior>
                <a className={utilStyles.boldText}>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>{date}</small>
            </article>
          ))};
        </div>
      </section>
    </Layout>
  );
}
