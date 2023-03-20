import Head from "next/head";
import Layout from "../components/Layout";
import EventsComponent from "../components/Events";

export default function Events() {
  return (
    <Layout>
      <Head>
        <title>Events</title>
      </Head>

      <section className="text-center p-6">
        <h1 className="text-6xl font-bold">Events</h1>
        <span className="m-3 text-2xl">
          Here you will find details about my past events. Currently a work in
          progress!
        </span>
      </section>

      <EventsComponent />
    </Layout>
  );
}
