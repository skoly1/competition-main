import { createSlice } from "@reduxjs/toolkit";
import { pagesInterface } from "../../utility/interfaces";

const initialState = {
  status: 0,
  text: "search",
  data: [],
  total: 0,
  offsetPage: 0,
  scrollPosition: 0,
} as pagesInterface;

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    SearchReducer(state, action) {
      const existingId = state.data.map((ele: any) => ele.id);
      const incomingData = action?.payload?.apiData?.data;
      const filteredData = incomingData.filter((ele: any) => {
        return !existingId.includes(ele.id) && ele;
      });
      const newEventData = [...state.data, ...filteredData];

      return {
        ...state,
        text: action?.payload?.apiData?.text,
        status: action?.payload?.apiData?.status,
        data: newEventData,
        total: action?.payload?.apiData?.total,
        offsetPage: action?.payload?.offsetPage,
        scrollPosition: action?.payload?.scrollPosition,
      };
    },
  },
});
export const searchActions = searchSlice.actions;
