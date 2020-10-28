import test from 'ava'
import flowdock from '../src/flowdock'

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', async t => {
  t.timeout(10000)

  if (!process.env.FLOWDOCK_TEST_TOKEN || !process.env.TEXT) {
    console.error('Missing env values')
    return
  }

  const token = `${process.env.FLOWDOCK_TEST_TOKEN}`
  const message = `${process.env.TEXT}`

  const result = await flowdock({
    message,
    token
  })

  console.log(result)
  t.pass()
})
