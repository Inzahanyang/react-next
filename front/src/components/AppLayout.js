import PropTypes from "prop-types";
import Link from "next/link";
import { Menu, Input, Row, Col } from "antd";
import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";
import styled from "styled-components";
import { useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import { useCallback } from "react";
import Router from "next/router";

const TopMenu = styled(Menu).attrs((props) => ({
  mode: "horizontal",
}))`
  background-color: #f0e3ba;
  text-align: center;
`;
const InputSearch = styled(Input.Search).attrs((props) => ({
  placeholder: "Search",
}))`
  border-radius: 5px;
  height: 24px;
  vertical-align: middle;
`;
const Main = styled(Row).attrs((props) => ({
  gutter: 8,
}))`
  height: 100vh;
`;
const Left = styled(Col).attrs((props) => ({
  xs: 24,
  md: 6,
}))`
  background-color: #eaf0ba;
  text-align: center;
`;
const Middle = styled(Col).attrs((props) => ({
  xs: 24,
  md: 12,
}))`
  background-color: #baf0db;
  text-align: center;
`;
const Right = styled(Col).attrs((props) => ({
  xs: 24,
  md: 6,
}))`
  background-color: #bacff0;
  text-align: center;
`;
const ATag = styled.a.attrs((props) => ({ href: "http://banguham.com" }))``;
const H1 = styled.h1`
  color: #fff;
`;

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);
  const [searchInput, onChangeSearchInput] = useInput();

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  return (
    <>
      <TopMenu>
        <Menu.Item>
          <Link href="/">
            <a>Main</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/profile">
            <a>Profile</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <InputSearch enterButton value={searchInput} onChange={onChangeSearchInput} onSearch={onSearch} />
        </Menu.Item>
        {/* <Menu.Item>
          <Link href="/signup">
            <a>Sign Up</a>
          </Link>
        </Menu.Item> */}
      </TopMenu>
      <Main>
        <Left>{me ? <UserProfile /> : <LoginForm />}</Left>
        <Middle>{children}</Middle>
        <Right>
          <ATag>
            <H1>Made By BANGUHAM</H1>
          </ATag>
        </Right>
      </Main>
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
