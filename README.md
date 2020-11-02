# Github Action for sending message to Flowdock

This Action allows you to send messages to Flowdock from your Github Actions.

## Requirements

1. Flowdock Channel
2. A Flowdock App - Which will be used to send messages to your channel.
3. A Github Action - the place where you want to send Flowdock messages
4. Github Secret - the Flowdock App auth token, used when posting messages to Flowdock API.

## Setup

**Required: Github Repository Secret:**

- `TEAM_FLOW_ACCESS_TOKEN` - This is the Flowdock App token, the credentials for allowing you to send messages from Github to Flowdock.

**Required: Github Action Parameters:**

- `flowdock-bot-access-token` - `TEAM_FLOW_ACCESS_TOKEN` secret

- `text` - The text of the message

## Sample Action file with Flowdock Channel and Text

This will send a Flowdock message every time someone creates pull request.

```yml
name: flowdock-notification

on:
  pull_request:
    branches:
      - master

jobs:
  flowdock-notifications:
    runs-on: ubuntu-latest
    name: Sends a message to Flowdock when a pull request is made
    steps:
      - name: Send message to Flowdock API
        uses: DeclanBoller/flowdock-github-action@main
        with:
          flowdock-bot-access-token: ${{ secrets.TEAM_FLOW_ACCESS_TOKEN }}
          text: "@team, ${{ github.event.pull_request.title }}\n${{ github.event.pull_request.html_url }}"
```

## How to setup your first Github Action in your repository that will call this Action

### 1. Create a Flowdock Application

Follow this guide on how to create a Flowdock App and Bot:

- https://www.flowdock.com/api/integration-getting-started#/getting-started

Quick Setup Guide:

1. Create a Flowdock application, https://www.flowdock.com/oauth/applications/new
1. Check the `Shortcut Application` box. This skips OAuth setup because for the purposes of an automated post, the auth method we want is Source Token Authentication.
1. Give your app a name and avatar, these will be shown when it posts to the flow.
1. Save your Application, job complete.

### 2. Save Bot Access Token on Github

1. Within the Flowdock application, select your target flow, click the three dots to the right of the flow name, and click Integrations.
   1. Find your Flowdock Developer Application in the list of integrations, click `+ Connect`
   1. You will be shown a Source Token, which you can then copy and store.
1. Go to your Github Repo
1. Go to "Settings" > "Secrets" for the repo
1. Create a new secret called `<YOUR FLOW NAME HERE>_FLOW_ACCESS_TOKEN` with the value from the Source Token.
   1. E.g. if you have a flow called `Pull Requests` your token should be `PULL_REQUESTS_FLOW_ACCESS_TOKEN`
1. Save, and you're done.

### 3. Create a new Github Action

1. Go to your github repo
1. Go to actions
1. Create a new one, you can use the sample above

## Other Possibly Useful Information

Since this was made for my team to be able to post Github Pull Requests automatically, we need some github context information. Here is some info that you might care about:

Further reading for Github Context and Syntax here:

- https://docs.github.com/en/free-pro-team@latest/actions/reference/context-and-expression-syntax-for-github-actions

Further reading on Webhook events and payloads (Pull Requests)

- https://docs.github.com/en/free-pro-team@latest/developers/webhooks-and-events/webhook-events-and-payloads#pull_request

| Syntax                                 | Description                                                                                                |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `github.event.pull_request.title`      | The title of the pull request                                                                              |
| `github.event.pull_request.html_url`   | The URL that links to the pull request                                                                     |
| `github.event.pull_request.user.login` | The username of the person who created the PR                                                              |
| `github.head_ref`                      | The source branch of the pull request in a workflow run (only available if workflow run is `pull_request`) |
| `github.base_ref`                      | The target branch of the pull request in a workflow run (only available if workflow run is `pull_request`) |
| `github.repository`                    | The owner and repository name.                                                                             |

## Development and Testing

Look in the `package.json` for the commands you can run, there are scripts for prettier, linting, building and testing.

If you are forking this or contributing don't forget to run `yarn all` before merging your work.

To run the main test:

```
env FLOWDOCK_TEST_TOKEN=<YOUR TOKEN> TEXT="Test" yarn ava __tests__/main.test.ts
```

To debug action and see what payload is being sent to slack, enable debugging:

https://docs.github.com/en/actions/configuring-and-managing-workflows/managing-a-workflow-run#enabling-debug-logging
