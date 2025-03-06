import { BaseResponseContent } from '#contracts/configs/base_response_content_type'

type ResponseError = {
  code: string
  details: Record<string, any>
}

export type ErrorResponseContent = BaseResponseContent & {
  errors?: ResponseError
}
