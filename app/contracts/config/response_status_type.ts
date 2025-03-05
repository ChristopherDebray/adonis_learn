import { ResponseStatus } from '@adonisjs/core/http'

/**
 * Type for response statuses.
 * This type represents the valid status codes from the `ResponseStatus` constant.
 */
export type ResponseStatusType = (typeof ResponseStatus)[keyof typeof ResponseStatus]
