import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import Jobs from "../components/Jobs";
import Fun from "../components/Fun";

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>

      {/* Intro section */}
      <section className="text-center p-6">
        <h1 className="text-6xl font-bold">Vienna Tan</h1>
        <span className="m-3 md:text-2xl text-xl">
          Seasoned Event Professional with 8+ Years of Industry Experience
        </span>
      </section>

      {/* Experience section */}
      <Jobs />

      {/* Fun section */}
      <Fun />
    </Layout>
  );
};

export default Home;
