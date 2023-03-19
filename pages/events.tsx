import Head from "next/head";
import Layout from "../components/Layout";

export default function Events() {
  return (
    <Layout>
      <Head>
        <title>Events</title>
      </Head>

      <section className="text-center p-6">
        <h1 className="text-6xl font-bold">This is the Events page.</h1>
        <span className="mt-3 mb-3 text-2xl">
          Here you will find details about my past events. Currently a work in
          progress!
        </span>
      </section>
    </Layout>
  );
}
