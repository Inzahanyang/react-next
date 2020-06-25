import { Card, Avatar, Button } from "antd";
import styled from "styled-components";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequestAction, LOG_OUT_REQUEST } from "../reducers/user";

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
          {me.Posts.length}
        </Bottom>,
        <Bottom key="followings">
          Followings
          <br />
          {me.Followings.length}
        </Bottom>,
        <Bottom key="followers">
          Followers
          <br />
          {me.Followers.length}
        </Bottom>,
      ]}
    >
      <Card.Meta avatar={<Avatar>{me.nickname && me.nickname[0]}</Avatar>} title={me.nickname} />
      <Button onClick={onLogout} loading={logOutLoading}>
        Log Out
      </Button>
    </CardWrapper>
  );
};
