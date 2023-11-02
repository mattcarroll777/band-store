import Head from 'next/head';
import Image from 'next/image';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import styles from './index.module.css';
import { getSortedProductsData } from '../lib/products';
import Link from 'next/link';
import Date from '../components/date';
import React, { useState, useEffect } from 'react';

export default function Home({ allProductsData }) {
  const [pageNum, setPageNum] = useState(1);
  const [prodPerPage, setProdPerPage] = useState(4);

  const indexOfLastProd = pageNum * prodPerPage;
  const indexOfFirstProd = indexOfLastProd - prodPerPage;

  const currentProds = allProductsData.slice(indexOfFirstProd, indexOfLastProd);

  const pageUp = () => {
    if (pageNum * prodPerPage < allProductsData.length) {
      setPageNum(pageNum + 1);
    }
  };
  const pageDown = () => {
    if (pageNum > 1) {
      setPageNum(pageNum - 1);
    }
  };
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Products</h2>
        <div className={utilStyles.optionCont}>
          <div id={utilStyles.pageNum}>
            Page Num {pageNum}
            <button onClick={pageUp}> Up </button>
            <button onClick={pageDown}> Down </button>
          </div>
          <div id={utilStyles.prodsPer}>Products per Page {prodPerPage}</div>
          <select
            name="prodsPerPage"
            value={prodPerPage}
            onChange={(e) => setProdPerPage(e.target.value)}
          >
            <option value="4">4</option>
            <option value="6">6</option>
            <option value="10">10</option>
          </select>
        </div>
        <ul className={styles.productList}>
          {currentProds.map(({ id, price, title, image }) => (
            <li className={styles.listItem} key={id}>
              <Image
                priority
                src={image}
                className={styles.productImg}
                height={144}
                width={144}
              />
              <Link href={`/products/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>{price}</small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allProductsData = getSortedProductsData();
  // const pageNums = [0, 2];

  return {
    props: {
      allProductsData,
      // pageNums,
    },
  };
}
