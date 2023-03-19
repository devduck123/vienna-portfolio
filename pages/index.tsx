import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import Jobs from "../components/Jobs";

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>

      {/* Intro section */}
      <section className="bg-green-200 text-center p-6">
        <h1 className="text-6xl font-bold">Vienna Tan</h1>
        <span className="m-3 text-2xl">
          An event professional with 8+ years of industry experience.
        </span>
      </section>

      {/* Experience section */}
      <Jobs />
    </Layout>
  );
};

export default Home;
