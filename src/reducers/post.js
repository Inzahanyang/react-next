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
  postAdded: false,
};

const ADD_POST = "ADD_POST";
export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  id: 2,
  content: "just dummy",
  User: {
    id: 1,
    nickname: "inzahan",
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
      };
    default:
      return state;
  }
};

export default reducer;
