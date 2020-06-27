import { Form, Input, Button } from "antd";
import { useCallback, useEffect } from "react";
import useInput from "../hooks/useInput";
import { useSelector, useDispatch } from "react-redux";
import { ADD_COMMENT_REQUEST } from "../reducers/post";

export default ({ post }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const { addCommentDone, addCommentLoading } = useSelector((state) => state.post);
  const [commentText, onChangeCommentText, setCommnetText] = useInput("");

  useEffect(() => {
    if (addCommentDone) {
      setCommnetText("");
    }
  }, [addCommentDone]);

  const onSubmitComment = useCallback(() => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, postId: post.id, userId: id },
    });
  }, [commentText, id]);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{ position: "relative", margin: 0 }}>
        <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
        <Button
          style={{ position: "absolute", right: 0, bottom: -40, zIndex: 1 }}
          type="primary"
          htmlType="submit"
          loading={addCommentLoading}
        >
          Twit
        </Button>
      </Form.Item>
    </Form>
  );
};
