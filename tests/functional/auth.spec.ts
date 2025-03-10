import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import { ResponseStatus } from '@adonisjs/core/http'
import User from '#models/user/user'

test.group('Auth controller', (group) => {
  group.each.setup(() => {
    testUtils.db().withGlobalTransaction()
  })

  test('Register success', async ({ client, assert }) => {
    const response = await client.post('/api/register').json({
      firstName: 'test',
      lastName: 'ing',
      email: 'testing@gmail.com',
      password: 'password',
    })

    response.assertStatus(ResponseStatus.Created)
    const user = await User.query().where('email', 'testing@gmail.com').first()
    assert.isNotNull(user)
    assert.equal(user?.email, 'testing@gmail.com')
  })

  test('Register fail, already used email', async ({ client, assert }) => {
    const response = await client.post('/api/register').json({
      firstName: 'admin',
      lastName: 'admin',
      email: 'admin@gmail.com',
      password: 'password',
    })

    response.assertStatus(ResponseStatus.BadRequest)
    assert.deepEqual(response.body(), {
      isSuccess: false,
      status: 400,
      data: null,
      errors: [
        {
          message: 'The email has already been taken',
          rule: 'database.unique',
          field: 'email',
        },
      ],
      message: 'Validation failure',
      code: 'E_VALIDATION_ERROR',
    })
  })

  test('Register fail, field validation error - "{title}"')
    .with(async () => {
      return getRegisterDataset()
    })
    .run(async ({ client, assert }, { payload, expected }) => {
      const response = await client.post('/api/register').json({
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: payload.password,
      })

      response.assertStatus(ResponseStatus.BadRequest)
      assert.deepEqual(response.body(), expected)
    })

  function getRegisterDataset(): Array<{ title: string; payload: any; expected: any }> {
    return [
      {
        title: 'Missing first name',
        payload: {
          firstName: '',
          lastName: 'ing',
          email: 'amail@gmail.com',
          password: 'password',
        },
        expected: {
          isSuccess: false,
          status: 400,
          data: null,
          errors: [
            {
              message: 'The firstName field must be defined',
              rule: 'required',
              field: 'firstName',
            },
          ],
          message: 'Validation failure',
          code: 'E_VALIDATION_ERROR',
        },
      },
      {
        title: 'Missing last name',
        payload: {
          firstName: 'miaou',
          lastName: '',
          email: 'miaou@gmail.com',
          password: 'password',
        },
        expected: {
          isSuccess: false,
          status: 400,
          data: null,
          errors: [
            {
              message: 'The lastName field must be defined',
              rule: 'required',
              field: 'lastName',
            },
          ],
          message: 'Validation failure',
          code: 'E_VALIDATION_ERROR',
        },
      },
      {
        title: 'Password with less than 8 characters',
        payload: {
          firstName: 'john',
          lastName: 'doe',
          email: 'johndoe@gmail.com',
          password: 'pass',
        },
        expected: {
          isSuccess: false,
          status: 400,
          data: null,
          errors: [
            {
              message: 'The password field must have at least 8 characters',
              rule: 'minLength',
              field: 'password',
              meta: {
                min: 8,
              },
            },
          ],
          message: 'Validation failure',
          code: 'E_VALIDATION_ERROR',
        },
      },
    ]
  }
})