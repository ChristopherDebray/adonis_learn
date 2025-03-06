import { UserRoles } from '#enums/user/user_roles'
import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const match = await db.from('users').select('id').where('email', value).first()

        return !match
      }),
    role: vine.enum(Object.values(UserRoles)),
  })
)
