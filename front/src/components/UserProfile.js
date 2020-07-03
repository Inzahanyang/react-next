import { Card, Avatar, Button } from "antd";
import styled from "styled-components";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequestAction, LOG_OUT_REQUEST } from "../reducers/user";
import Link from "next/link";

const Bottom = styled.div`
  font-size: 10px;
`;

const CardWrapper = styled(Card)`
  margin: 10px 10px;
`;

export default () => {
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);
  const onLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
  }, []);
  return (
    <CardWrapper
      actions={[
        <Bottom key="twit">
          Twit
          <br />
          <Link href={`/user/${me.id}`}>
            <a>{me.Posts.length}</a>
          </Link>
        </Bottom>,
        <Bottom key="followings">
          Followings
          <br />
          <Link href="/profile">
            <a>{me.Followings.length}</a>
          </Link>
        </Bottom>,
        <Bottom key="followers">
          Followers
          <br />
          <Link href="/profile">
            <a>{me.Followers.length}</a>
          </Link>
        </Bottom>,
      ]}
    >
      <Card.Meta
        avatar={
          <Link href={`/user/${me.id}`}>
            <a>
              <Avatar>{me.nickname && me.nickname[0]}</Avatar>
            </a>
          </Link>
        }
        title={me.nickname}
      />
      <Button onClick={onLogout} loading={logOutLoading}>
        Log Out
      </Button>
    </CardWrapper>
  );
};
