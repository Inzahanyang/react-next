import shortId from "shortid";
export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "yangwoo",
      },
      content: "First twit #Express #Nodejs",
      Images: [
        {
          src:
            "https://mediapool.bmwgroup.com/cache/P9/201905/P90349553/P90349553-the-all-new-bmw-1-series-bmw-m135i-xdrive-misano-blue-metallic-rim-19-styling-557-m-05-2019-600px.jpg",
        },
        {
          src:
            "https://mediapool.bmwgroup.com/cache/P9/202002/P90382902/P90382902-the-first-ever-bmw-220d-model-m-sport-gran-coupe-storm-bay-metallic-02-2020-600px.jpg",
        },
        {
          src:
            "https://mediapool.bmwgroup.com/cache/P9/201904/P90345185/P90345185-the-all-new-bmw-3-series-sedan-04-2019-599px.jpg",
        },
      ],
      Comments: [
        {
          User: {
            nickname: "inzahan",
          },
          content: "Wow nice Car",
        },
        {
          User: {
            nickname: "jiny",
          },
          content: "What a car!!",
        },
      ],
    },
  ],
  imagePaths: [],
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const addPost = (data) => ({ type: ADD_POST_REQUEST, data });
export const addComment = (data) => ({ type: ADD_COMMENT_REQUEST, data });

const dummyPost = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: "inzahan",
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: shortId.generate(),
  content: data,
  User: {
    id: 1,
    nickname: "YangYang",
  },
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return { ...state, addPostLoading: true, addPostDone: false, addPostError: null };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        addPostLoading: false,
        addPostDone: true,
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
      };
    case ADD_POST_FAILURE:
      return { ...state, addPostLoading: false, addPostError: action.e };
    case ADD_COMMENT_REQUEST:
      return { ...state, addCommentLoading: true, addCommentDone: false, addCommentError: null };
    case ADD_COMMENT_SUCCESS:
      const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
      console.log("postIndex: ", postIndex);
      const post = { ...state.mainPosts[postIndex] };
      console.log("post: ", post);
      post.Comments = [dummyComment(action.data.content), ...post.Comments];
      const mainPosts = [...state.mainPosts];
      console.log("mainPosts: ", mainPosts);
      mainPosts[postIndex] = post;

      return { ...state, mainPosts, addCommentLoading: false, addCommentDone: true };
    case ADD_COMMENT_FAILURE:
      return { ...state, addCommentLoading: false, addCommentError: action.e };
    default:
      return state;
  }
};

export default reducer;
