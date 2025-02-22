import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createUser, fetchUser, reset } from "./userActions";

export interface User {
  name: string;
  loading: boolean;
  loan: number;
  cash: number;
  investments:number;
  answered:number;
  avgResponseTime:number;
  totalQuestions:number;
  totalPlayers:number;
  archeType:string;
  rank:number;
  status:"IDLE"|"LOGGED_IN";
  error: string | null;
}

const initialState: User = {
  name: "",
  loading: true,
  loan: 0,
  cash: 0,
  investments:0,
  avgResponseTime:0,
  answered:0,
  totalQuestions:0,
  totalPlayers:0,
  rank:0,
  archeType:"",
  error: null,
  status:"IDLE"
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name ?? state.name;
      state.loading=action.payload.loading??state.loading;
      state.loan=action.payload.loan??state.loan;
      state.cash=action.payload.cash??state.cash;
      state.investments=action.payload.investments??state.investments;
      state.status=action.payload.status??state.status
      state.archeType=action.payload.archeType??state.archeType
      state.answered=action.payload.answered??state.answered
      state.avgResponseTime=action.payload.avgResponseTime??state.avgResponseTime
      state.rank=action.payload.rank??state.rank
      state.totalPlayers=action.payload.totalPlayers??state.totalPlayers
      state.totalQuestions=action.payload.totalQuestions??state.totalQuestions
    },
    setError:(state,action)=>{
      state.error=action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createUser.fulfilled,
        (
          state,
          action: PayloadAction<{
            name: string;
          }>
        ) => {
          state.loading=false,
          state.error=null,
          state.name = action.payload.name ?? state.name;
          state.status="LOGGED_IN"
        }
      )
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
        state.status="IDLE"

      })
      .addCase(reset.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        reset.fulfilled,
        (
          state,
          action: PayloadAction<{
            name: string;
          }>
        ) => {
          state.loading=false,
          state.error=null,
          state.name = action.payload.name ?? state.name;
          state.status="IDLE"
        }
      )
      .addCase(reset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
        state.status="IDLE"

      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUser.fulfilled,
        (
          state,
          action: PayloadAction<{
            name: string;
            cash:number;
            loan:number;
            investments:number
            userRank:number;
            archeType:string
            avgResponseTime:number
          }>
        ) => {
          state.loading=false,
          state.error=null,
          state.name = action.payload.name ?? state.name;
          state.cash=action.payload.cash??state.cash;
          state.loan=action.payload.loan??state.loan;
          state.investments=action.payload.investments??state.investments;
          state.rank=action.payload.userRank??state.rank;
          state.archeType=action.payload.archeType??state.archeType;
          state.avgResponseTime=action.payload.avgResponseTime??state.avgResponseTime;
          state.status="LOGGED_IN"
        }
      )
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
        state.status="IDLE"

      })
  },
});

export const { setUser,setError } = userSlice.actions;

export default userSlice.reducer;
