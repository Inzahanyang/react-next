import { Card, Avatar, Button } from "antd";
import styled from "styled-components";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequestAction } from "../reducers/user";

const Bottom = styled.div`
  font-size: 10px;
`;

const CardWrapper = styled(Card)`
  margin: 10px 10px;
`;

export default () => {
  const dispatch = useDispatch();
  const { me, isLoggingOut } = useSelector((state) => state.user);
  console.log(me);
  const onLogout = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);
  return (
    <CardWrapper
      actions={[
        <Bottom key="twit">
          Twit
          <br />3
        </Bottom>,
        <Bottom key="followings">
          Followings
          <br />4
        </Bottom>,
        <Bottom key="followers">
          Followers
          <br />5
        </Bottom>,
      ]}
    >
      <Card.Meta avatar={<Avatar>{me.nickname && me.nickname[0]}</Avatar>} title={me.nickname} />
      <Button onClick={onLogout} loading={isLoggingOut}>
        Log Out
      </Button>
    </CardWrapper>
  );
};
