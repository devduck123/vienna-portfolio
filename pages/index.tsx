import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>

      <section className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">Portfolio Title</h1>
        <p className="mt-3 mb-3 text-2xl">Content</p>
      </section>
    </Layout>
  );
};

export default Home;
