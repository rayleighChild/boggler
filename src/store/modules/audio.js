import { createAction, handleActions } from "redux-actions";
import produce from "immer";

const UPLOAD_FILE = "audio/UPLOAD_FILE";
const GET_AUDIO = "audio/GET";
const CHANGE_INPUT = "audio/CHANGE_INPUT";

export const changeInput = createAction(CHANGE_INPUT);
export const uploadFile = createAction(UPLOAD_FILE);
export const getAudio = createAction(GET_AUDIO);

const initialState = {
  id: 0,
  title: "",
  file: null,
  content: "" //문장 단위 index와 시간, 내용 등
};

export default handleActions(
  {
    [CHANGE_INPUT]: (state, action) => (
      produce(state, draft => {
        const { name, value } = action.payload;
        draft[name] = value;
      })
    ),
    [UPLOAD_FILE]: (state, action) => (
      produce(state, draft => {
        console.log("gg" + action.payload)
        const { file } = action.payload;
        draft.file = file;
      })
    ),
    [GET_AUDIO]: (state, action) => (
      produce(state, draft => {
        const { id, title, content } = action.payload;
        draft.id = id;
        draft.title = title;
        draft.content = content;
        console.log("asdasf" + action.payload);
      })
    )
  },
  initialState
);