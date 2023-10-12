import Layout from '../../components/layout';
import { getAllProductIds, getProductData } from '../../lib/products';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import Image from 'next/image';

export default function Product({ productData }) {
  return (
    <Layout>
      <Head>
        <title>{productData.title}</title>
      </Head>
      <Image
        priority
        src={productData.image}
        className={utilStyles.prodImage}
        height={400}
        width={400}
      />
      <article>
        <h1 className={utilStyles.headingXl}>{productData.title}</h1>
        <div className={utilStyles.lightText}>{productData.price}</div>
        <div dangerouslySetInnerHTML={{ __html: productData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllProductIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const productData = await getProductData(params.id);
  return {
    props: {
      productData,
    },
  };
}
