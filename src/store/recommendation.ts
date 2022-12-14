/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  AcademicHistory,
  OptionalCourse,
  RecommendationStore,
  Recommendation,
  RootState,
} from '@/types'

const initialState: RecommendationStore = {
  academicHistory: null,
  options: {
    selectedOptionalCourses: [],
  },
  recommendation: null,
}

export const recommendationSlice = createSlice({
  name: 'recommendation',
  initialState,
  reducers: {
    setAcademicHistoryData: (state, action: PayloadAction<AcademicHistory>) => {
      state.academicHistory = action.payload
    },
    setSelectedOptionalCourses: (
      state,
      action: PayloadAction<OptionalCourse[]>
    ) => {
      state.options.selectedOptionalCourses = action.payload
    },
    setRecommendation: (state, action) => {
      state.recommendation = action.payload
    },
    getRecommendation: (state, action) => {
      state.recommendation = action.payload
    },
    resetRecommendation: () => initialState,
  },
})

export const {
  setAcademicHistoryData,
  setSelectedOptionalCourses,
  setRecommendation,
  resetRecommendation,
} = recommendationSlice.actions

export default recommendationSlice.reducer

export const selectAcademicHistory = (state: RootState) =>
  state.recommendation.academicHistory

export const selectSelectedOptionalCourses = (state: RootState) =>
  state.recommendation.options.selectedOptionalCourses

export const selectRecommendationOptions = (state: RootState) =>
  state.recommendation.options

export const selectRecommendation = (state: RootState) =>
  state.recommendation.recommendation
