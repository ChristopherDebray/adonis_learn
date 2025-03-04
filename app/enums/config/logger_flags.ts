/**
 * SECURITY: Security-related issues (brute force, scanning, unauthorized access)
 * BUSINESS_EVENT: Important system/business actions (user signed up, payment made)
 * SYSTEM: Internal system logs
 */

export enum LoggerFlags {
  SECURITY = 'security',
  BUSINESS_EVENT = 'business_event',
  SYSTEM = 'system',
}
