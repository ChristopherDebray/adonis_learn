import TestMiddleware from '#middleware/test_middleware'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Middleware test', () => {
  test('example test', async ({ assert }) => {
    const middleware = new TestMiddleware()
    const ctx = await testUtils.createHttpContext()

    await middleware.handle(ctx)

    // Middleware does not return a response directly. Instead, it modifies ctx.response
    const responseBody = ctx.response.getBody()

    console.log(responseBody)

    // .equal cannot work since this would be js object comparison ({} === {})
    assert.deepEqual(responseBody, { status: 401, message: 'Ending request' })
  })
})
