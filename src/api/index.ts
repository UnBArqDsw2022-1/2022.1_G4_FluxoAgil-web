import {
  AcademicHistory,
  OptionalCourse,
  Recommendation,
  RecommendationOptions,
} from '@/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import camelcaseKeys from 'camelcase-keys'

const BASE_URL = 'http://localhost:5000'

export const recommendationApi = createApi({
  reducerPath: 'recommendationApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Recommendation'],
  endpoints: builder => ({
    fetchAcademicHistoryData: builder.mutation<AcademicHistory, File>({
      query: (academicHistory: File) => {
        const formData = new FormData()
        formData.append('file', academicHistory)

        return {
          url: '/academic-history',
          method: 'POST',
          body: formData,
        }
      },
      transformResponse: (response: AcademicHistory) => camelcaseKeys(response),
    }),
    fetchOptionalCourses: builder.query<OptionalCourse[], string>({
      query: (curriculumId: string) => ({
        url: `/courses?curriculumId=${curriculumId}&type=optional`,
        method: 'GET',
      }),
    }),
    fetchRecommendation: builder.mutation({
      query: (options: any) => ({
        url: '/recommendation',
        method: 'POST',
        body: options,
      }),
    }),
  }),
})

export const {
  useFetchAcademicHistoryDataMutation,
  useFetchOptionalCoursesQuery,
  useFetchRecommendationMutation,
} = recommendationApi
