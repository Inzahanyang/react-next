import { Form, Input, Button } from "antd";
import useInput from "../hooks/useInput";
import { useCallback, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPost } from "../reducers/post";

export default () => {
  const imageInput = useRef();
  const [text, setText] = useState("");
  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  });
  const { imagePaths } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const onSubmit = useCallback(() => {
    dispatch(addPost);
    setText("");
  }, []);
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);
  return (
    <Form
      style={{ margin: "10px 0 20px" }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={30}
        placeholder={"Say something?"}
      />
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>Upload Image</Button>
        <Button htmlType="submit" type="primary" style={{ float: "right" }}>
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
