import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
  snackBar: {
    state: false,
    message: "",
    type: "",
  },
};

export const actionSlice = createSlice({
  name: "officeState",
  initialState,
  reducers: {
    changeLoadingState: (state) => {
      state.loading = !state.loading;
    },
    openSnackbar: (state, action) => {
      state.snackBar = action.payload;
    },
    resetSnackBar: (state, action) => {
      state.snackBar = { message: "", type: "", state: false };
    },
  },
});

export const changeLoadState = (data) => async (dispatch) => {
  dispatch(changeLoadingState());
};
export const openSnack = (data) => async (dispatch) => {
  dispatch(openSnackbar(data));
};
export const resetSnack = (data) => async (dispatch) => {
  dispatch(resetSnack(data));
};

export const { changeLoadingState, openSnackbar, resetSnackBar } =
  actionSlice.actions;
export default actionSlice.reducer;
