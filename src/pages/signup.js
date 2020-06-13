import AppLayout from "../components/AppLayout";
import { Form, Input, Checkbox, Button } from "antd";
import useInput from "../hooks/useInput";
import { useState, useCallback } from "react";
import styled from "styled-components";

const ErrorMessage = styled.div`
  color: red;
`;
const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

export default () => {
  const [id, onChangeId] = useInput("");
  const [nickname, onChangeNickname] = useInput("");

  const [password, onChangePassword] = useInput("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const [term, setTerm] = useState("");
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordCheck(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(id, nickname, password);
  }, [password, passwordCheck, term]);

  return (
    <AppLayout>
      <Form onFinish={onSubmit}>
        <div>
          <label htmlFor="user-id">ID</label>
          <br />
          <Input name="user-id" value={id} onChange={onChangeId} required />
        </div>
        <div>
          <label htmlFor="user-nick">Nickname</label>
          <br />
          <Input
            name="user-nick"
            value={nickname}
            onChange={onChangeNickname}
            required
          />
        </div>
        <div>
          <label htmlFor="user-password">Password</label>
          <br />
          <Input
            name="user-password"
            value={password}
            onChange={onChangePassword}
            required
          />
        </div>
        <div>
          <label htmlFor="user-password-check">Password Check</label>
          <br />
          <Input
            name="user-password-check"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
          />
          {passwordError && <ErrorMessage>Password not match</ErrorMessage>}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            Accept privacy policy and Terms
          </Checkbox>
          {termError && (
            <ErrorMessage>Need to accept Usage Policy</ErrorMessage>
          )}
        </div>
        <ButtonWrapper>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </ButtonWrapper>
      </Form>
    </AppLayout>
  );
};
