import { useState, useCallback } from "react";
import { Input, Form, Button } from "antd";
import Link from "next/link";
import styled from "styled-components";
import useInput from "../hooks/useInput";

const ButtonWrapper = styled.div`
  margin: 20px 0;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

export default ({ setIsLoggedIn }) => {
  const [id, onChangeID] = useInput("");
  const [password, onChangePassword] = useInput("");

  const onsubmitForm = useCallback(() => {
    console.log(id, password);
    setIsLoggedIn(true);
  }, [id, password]);

  return (
    <FormWrapper onFinish={onsubmitForm}>
      <div>
        <label htmlFor="user-id">ID</label>
        <br />
        <Input name="user-id" value={id} onChange={onChangeID} required />
      </div>
      <div>
        <label htmlFor="user-password">PASSWORD</label>
        <br />
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={false}>
          Log In
        </Button>
        <Link href="/signup">
          <a>
            <Button>Sign Up</Button>
          </a>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};
