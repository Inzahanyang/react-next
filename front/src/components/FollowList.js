import { List, Card, Button } from "antd";
import styled from "styled-components";
import { StopOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { UNFOLLOW_REQUEST, REMOVE_FOLLOWER_REQUEST } from "../reducers/user";

const ListWrapper = styled(List)`
  margin-bottom: 20px;
`;

const LoadMore = styled.div`
  text-align: center;
  margin: 10px 0;
`;

export default ({ header, data }) => {
  const dispatch = useDispatch();
  const onCancel = (id) => () => {
    if (header === "Followings") {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: id,
      });
    }
    dispatch({
      type: REMOVE_FOLLOWER_REQUEST,
      data: id,
    });
  };

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
          <Card actions={[<StopOutlined key="stop" onClick={onCancel(item.id)} />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
};
