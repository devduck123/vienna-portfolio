import Head from "next/head";
import Link from "next/link";

type Props = {
  children?: any;
  home?: any;
};

const name = "Vienna Tan";
const siteTitle = "Portfolio";

export default function Layout(props: Props) {
  return (
    <section className="layout flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="icon" href="/favicon/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            `${siteTitle} ${name}}`
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={`${siteTitle} ${name}`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header>
        <h1>Header</h1>
        <nav>
          <h1>Navigation</h1>
          <Link href="/">Home</Link>
        </nav>
      </header>
      <main>{props.children}</main>
      <footer className="flex h-24 w-full items-center justify-center border-t">
        &copy; 2022 Vienna Tan
      </footer>
    </section>
  );
}
