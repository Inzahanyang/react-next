import { Form, Input } from "antd";
import styled from "styled-components";

const FormWrapper = styled(Form)`
  margin-bottom: 20px;
  border: "1px solid #d9d9d9";
  padding: 30px;
`;

export default () => {
  return (
    <FormWrapper>
      <Input.Search addonBefore="Nick" enterButton="Done" />
    </FormWrapper>
  );
};
