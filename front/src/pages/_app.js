import "antd/dist/antd.css";
import Head from "next/head";
import wrapper from "../store/configureStore";
import withReduxSaga from "next-redux-saga";

export default wrapper.withRedux(
  withReduxSaga(({ Component }) => (
    <>
      <Head>
        <meta charSet="utf-8"></meta>
        <title>My App</title>
      </Head>
      <Component />
    </>
  ))
);
