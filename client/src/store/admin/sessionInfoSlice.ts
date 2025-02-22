import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCurrentSessionInfo } from "./sessionInfoActions";

export interface SessionInfo {
  loading: boolean;
  error: string | null;
  gameCompletion: number;
  livePlayers: number;
  sessionId: string | null;
  trustScore: number | null;
  choicesDistribution: {
    optimal: number;
    suboptimal: number;
    acceptable: number;
  };
  timeUsed: number;
  colleguesTime: number;
  feedbackAnalysis: {
    question: string;
    options: { option: string; percentage: number }[];
  }[];
  scenariosAnalysis: {
    question: string;
    optimal: number;
    suboptimal: number;
    acceptable: number;
  }[];
}

const initialState: SessionInfo = {
  loading: false,
  error: null,
  gameCompletion: 0,
  livePlayers: 0,
  sessionId: null,
  trustScore: null,
  choicesDistribution: {
    optimal: 0,
    suboptimal: 0,
    acceptable: 0,
  },
  timeUsed: 0,
  colleguesTime: 0,
  feedbackAnalysis: [],
  scenariosAnalysis: [],
};

const sessionInfoSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentSessionInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCurrentSessionInfo.fulfilled,
        (
          state,
          action: PayloadAction<{
            livePlayers: number;
            gameCompletion: number;
            trustScore: number | null;
            timeUsed: number;
            colleguesTime: number;
            choicesDistribution: {
              optimal: number;
              suboptimal: number;
              acceptable: number;
            };
            feedbackAnalysis: {
              question: string;
              options: { option: string; percentage: number }[];
            }[];
            scenariosAnalysis: {
              question: string;
              optimal: number;
              acceptable: number;
              suboptimal: number;
            }[];
          }>
        ) => {
          (state.loading = false),
            (state.error = null),
            (state.livePlayers =
              action.payload.livePlayers ?? state.livePlayers);
          state.gameCompletion =
            action.payload.gameCompletion ?? state.gameCompletion;
          state.trustScore = action.payload.trustScore ?? state.trustScore;
          state.timeUsed = action.payload.timeUsed ?? state.timeUsed;
          state.colleguesTime =
            action.payload.colleguesTime ?? state.colleguesTime;
          state.feedbackAnalysis =
            action.payload.feedbackAnalysis ?? state.feedbackAnalysis;
          state.choicesDistribution =
            action.payload.choicesDistribution ?? state.choicesDistribution;
          state.scenariosAnalysis =
            action.payload.scenariosAnalysis ?? state.scenariosAnalysis;
        }
      )
      .addCase(fetchCurrentSessionInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
      });
  },
});

// export const { setUser, setError } = sessionInfoSlice.actions;

export default sessionInfoSlice.reducer;
