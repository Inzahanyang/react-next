import { Card, Avatar, Button } from "antd";
import styled from "styled-components";
import { useCallback } from "react";

const Bottom = styled.div`
  font-size: 10px;
`;

const CardWrapper = styled(Card)`
  margin: 10px 10px;
`;

export default ({ setIsLoggedIn }) => {
  const onLogout = useCallback(() => {
    setIsLoggedIn(false);
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
      <Card.Meta avatar={<Avatar>YW</Avatar>} title="Yang" />
      <Button onClick={onLogout}>Log Out</Button>
    </CardWrapper>
  );
};
