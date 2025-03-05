import { BaseResponseContent } from '#contracts/config/base_response_content_type'

type ResponseError = {
  code: string
  details: Record<string, any>
}

export type ErrorResponseContent = BaseResponseContent & {
  errors?: ResponseError
}
