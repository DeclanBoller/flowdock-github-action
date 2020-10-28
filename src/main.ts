import * as core from '@actions/core'
import flowdock from './flowdock'

async function run(): Promise<void> {
  try {
    // get the token and message from inputs
    const token: string = core.getInput('flowdock-bot-user-oauth-access-token')
    const message: string = core.getInput('text')

    // post a message in flowdock
    const response = await flowdock({token, message})
    const responseAsJson = JSON.stringify(response, null, 2)

    core.setOutput('flowdock-result', responseAsJson)

    core.debug(JSON.stringify(response, null, 2))
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
