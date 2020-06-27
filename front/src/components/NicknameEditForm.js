import { Form, Input } from "antd";
import styled from "styled-components";
import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import { CHANGE_NICKNAME_REQUEST } from "../reducers/user";
import useInput from "../hooks/useInput";

const FormWrapper = styled(Form)`
  margin-bottom: 20px;
  border: "1px solid #d9d9d9";
  padding: 30px;
`;

export default () => {
  const { me } = useSelector((state) => state.user);
  const [nickname, onChangeNickname] = useInput(me?.nickname || "");
  const dispatch = useDispatch();

  const onSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
  }, [nickname]);
  return (
    <FormWrapper>
      <Input.Search
        value={nickname}
        onChange={onChangeNickname}
        addonBefore="Nick"
        enterButton="Done"
        onSearch={onSubmit}
      />
    </FormWrapper>
  );
};
