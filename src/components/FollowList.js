import { List, Card, Button } from "antd";
import styled from "styled-components";
import { ControlFilled } from "@ant-design/icons";

const ListWrapper = styled(List)`
  margin-bottom: 20px;
`;

const LoadMore = styled.div`
  text-align: center;
  margin: 10px 0;
`;

export default ({ header, data }) => {
  return (
    <ListWrapper
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size="small"
      header={<div>{header}</div>}
      loadMore={
        <LoadMore>
          <Button>더보기</Button>
        </LoadMore>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Card actions={[<ControlFilled key="stop" />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
};
