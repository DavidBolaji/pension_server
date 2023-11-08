export interface IAuthDb {
  id?: number
  email: string
  password: string
  created_at: string
  token: Itoken
}
export type Itoken = { token: string }[]
