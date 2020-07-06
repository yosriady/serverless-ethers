# serverless-ethers

## Table of Contents

|                                     | Description                                 | Stack                 |
| ----------------------------------- | ------------------------------------------- | --------------------- |
| [`contracts`](contracts)     | 🖼 Smart contract ABIs | `json`, `ethereum` |
| [`functions`](functions)                  | 🚀 Lambda functions                              | `node`, `js`          |

## Prerequisites

Install the [Serverless Framework CLI](https://www.serverless.com/framework/docs/getting-started/).

## Getting Started

```bash
git clone git@github.com:yosriady/serverless-ethers.git
cd serverless-ethers
nvm use
npm install
```

### Set your environment variables

You can find and update the function's configuration in [`serverless.yml`](https://github.com/yosriady/serverless-ethers/blob/master/serverless.yml):

```yml
service: serverless-ethers
provider:
  name: aws
  runtime: nodejs12.x
  region: ap-southeast-1
  timeout: 30
  environment:
    DEFAULT_GAS_PRICE: 60000000000
    MNEMONIC: ...
```

This example uses the following environment variables:

- `DEFAULT_GAS_PRICE`: Default gas price used when making write transactions.
- `MNEMONIC`: 12-word mnemonic used to derive an Ethereum address, make sure it's funded with Ether if you intend to write data to Ethereum!
- `SLACK_HOOK_URL`: The example sends messages to Slack using [Incoming Webhooks](https://api.slack.com/messaging/webhooks). You can get this URL from your Slack dashboard. (Optional)

> You can change your deployed function's environment variables on the fly from the AWS Lambda console.

### Triggering the function locally

```bash
serverless invoke local --function exec
```

This will execute the smart contract function from your local machine.
Great for debugging and testing.

### Deploying to AWS

```bash
serverless deploy
```

## Thanks

**serverless-ethers** 💌 2020+, Yos Riady. Released under the [MIT] License.<br>
Authored and maintained by Yos Riady with help from contributors ([list][contributors]).

> [yos.io](http://yos.io) &nbsp;&middot;&nbsp;
> GitHub [@yosriady](https://github.com/yosriady)

[MIT]: http://mit-license.org/
[contributors]: http://github.com/yosriady/serverless-ethers/contributors
