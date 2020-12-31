import Head from 'next/head'
import Layout, {siteTitle} from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import {getSortedPostsData} from '../lib/posts'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {props : {allPostsData} };
}

export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>I'm Josh Peavler and I'm learning how to use Next.js</p>
        <p>
          (This is a tutorial website I made following the {' '}
          <a href="https://nextjs.org/learn"> Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headinLg}>Blog</h2>
        <ul className= {utilStyles.list}>
          {allPostsData.map(({id, date, title}) => (
            <li className={utilStyles.listItem} key={id}>
              {title}<br/>
              {id}<br/>
              {date}<br/>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
