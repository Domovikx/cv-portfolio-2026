import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { site } from '@/shared/config'

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

type RespondResponse = {
  success: boolean
  message: string
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
    sendRespond: build.mutation<RespondResponse, RespondPayload>({
      query: (payload) => ({
        url: site.form.endpoint,
        method: 'POST',
        body: {
          access_key: site.form.accessKey,
          subject: site.form.subject,
          from_name: `${payload.name} ${payload.surname}`,
          email: payload.email,
          replyto: payload.email,
          message: [
            `Имя: ${payload.name} ${payload.surname}`,
            `Email: ${payload.email}`,
            `Телефон: ${payload.phone || '—'}`,
            `Ссылка на резюме: ${payload.resumeLink || '—'}`,
          ].join('\n'),
        },
      }),
    }),
  }),
})

export const { useGetReposQuery, useSendRespondMutation } = rtkApi
