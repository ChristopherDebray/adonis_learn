import vine from '@vinejs/vine'

const password = vine.string().minLength(8)

export const registerValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const match = await db.from('users').select('id').where('email', value).first()

        return !match
      }),
    firstName: vine.string(),
    lastName: vine.string(),
    password,
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password,
  })
)
