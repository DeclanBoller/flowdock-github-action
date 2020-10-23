import test from 'ava'
import flowdock from '../src/flowdock'

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', async t => {
  t.timeout(10000)

  const token = `${process.env.FLOWDOCK_TEST_TOKEN}`
  const channel = 'krakenbot-fe'
  const message = 'Just another spam test, please ignore'

  const result = await flowdock({
    channel,
    message,
    token
  })

  console.log(result)
  t.pass()
})
