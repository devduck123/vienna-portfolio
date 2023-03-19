import Head from "next/head";
import Header from "./Header";

type Props = {
  children?: any;
  home?: any;
};

const name = "Vienna Tan";
const siteTitle = "Vienna Tan Portfolio";

export default function Layout(props: Props) {
  return (
    <>
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
        <meta name="description" content="Portfolio for Vienna Tan" />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            `${siteTitle} ${name}}`
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={`${siteTitle} ${name}`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Header />
      <main className="mb-12">{props.children}</main>
      <footer className="w-full mb-0 h-6 text-center bg-red-200">
        &copy; 2023 Vienna Tan
      </footer>
    </>
  );
}
