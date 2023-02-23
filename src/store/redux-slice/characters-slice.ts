import { createSlice } from "@reduxjs/toolkit";
import { pagesInterface } from "../../utility/interfaces";

const initialState = {
  status: 0,
  text: "",
  data: [],
  total: 0,
  offsetPage: 0,
  scrollPosition: 0,
  
} as pagesInterface;

export const characterSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    characterReducer(state, action) {
      const existingId = state.data.map((ele: any) => ele.id);
      const incomingData = action?.payload?.apiData?.data;
      const filteredData = incomingData?.filter((ele: any) => {
        return !existingId.includes(ele.id) && ele;
      });
      const newapiData = [...state.data, ...filteredData];
      return {
        ...state,
        text: action?.payload?.apiData?.text,
        status: action?.payload?.apiData?.status,
        data: newapiData,
        total: action?.payload?.apiData?.total,
        offsetPage: action?.payload?.offsetPage,
        scrollPosition: action?.payload?.scrollPosition,
      };
    },
  },
});
export const charactersActions = characterSlice.actions;
