export type BaseResponseContent = {
  message: string
  data?: Record<string, any>
  code: string | null | undefined
}
