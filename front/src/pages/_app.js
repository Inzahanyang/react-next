import "antd/dist/antd.css";
import Head from "next/head";
import wrapper from "../store/configureStore";

export default wrapper.withRedux(({ Component }) => (
  <>
    <Head>
      <meta charSet="utf-8"></meta>
      <title>My App</title>
    </Head>
    <Component />
  </>
));
