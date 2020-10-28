import got from 'got'

const api = got.extend({prefixUrl: 'https://api.flowdock.com/messages'})

type PostOptions = {
  token: string
  message: string
}

export default async function flowdock({
  message,
  token
}: PostOptions): Promise<unknown> {
  const response = await api
    .post({
      json: {
        event: 'message',
        flow_token: token,
        content: message
      }
    })
    .json()

  return response
}
