import got from 'got'

const api = got.extend({prefixUrl: 'https://api.flowdock.com'})

type PostOptions = {
  token: string
  channel: string
  message: string
}

export default async function flowdock({
  channel,
  message,
  token
}: PostOptions): Promise<unknown> {
  const response = await api
    .post(`flows/blake/${channel}/messages`, {
      json: {
        event: 'message',
        flow_token: token,
        content: message
      }
    })
    .json()

  return response
}
