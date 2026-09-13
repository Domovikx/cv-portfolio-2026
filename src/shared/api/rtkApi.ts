import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type GitHubRepo = {
  id: number
  name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  forks_count: number
  topics: string[]
  updated_at: string
}

export type RespondPayload = {
  name: string
  surname: string
  email: string
  phone?: string
  resumeLink?: string
}

export const rtkApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com' }),
  tagTypes: [],
  endpoints: (build) => ({
    getRepos: build.query<GitHubRepo[], void>({
      query: () => '/users/DomovikX/repos?sort=updated&per_page=12',
      keepUnusedDataFor: 60,
    }),
    sendRespond: build.mutation<{ id: number; echo: RespondPayload }, RespondPayload>({
      query: (payload) => ({
        url: 'https://jsonplaceholder.typicode.com/posts',
        method: 'POST',
        body: payload,
      }),
    }),
  }),
})

export const { useGetReposQuery, useSendRespondMutation } = rtkApi
