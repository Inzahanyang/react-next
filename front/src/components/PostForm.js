import { Form, Input, Button } from "antd";
import useInput from "../hooks/useInput";
import { useCallback, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ADD_POST_REQUEST } from "../reducers/post";

export default () => {
  const dispatch = useDispatch();
  const [text, onChangeText, setText] = useInput("");

  const { imagePaths, addPostDone, addPostLoading } = useSelector((state) => state.post);

  useEffect(() => {
    if (addPostDone) {
      setText("");
    }
  }, [addPostDone]);

  const onSubmit = useCallback(() => {
    dispatch({
      type: ADD_POST_REQUEST,
      data: {
        content: text,
      },
    });
  }, [text]);

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  return (
    <Form style={{ margin: "10px 0 20px" }} encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea value={text} onChange={onChangeText} maxLength={30} placeholder={"Say something?"} />
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>Upload Image</Button>
        <Button htmlType="submit" type="primary" style={{ float: "right" }} loading={addPostLoading}>
          TwitTwit
        </Button>
      </div>
      <div>
        {imagePaths.map((v) => (
          <div key={v} style={{ display: "inline-block" }}>
            <img src={v} style={{ width: "200px" }} alt={v} />
            <div>
              <Button>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};
