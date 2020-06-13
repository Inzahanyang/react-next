import "antd/dist/antd.css";
import Head from "next/head";
export default ({ Component }) => (
  <>
    <Head>
      <meta charSet="utf-8"></meta>
      <title>My App</title>
    </Head>
    <Component />
  </>
);
