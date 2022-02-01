This CLI is intended for admins of the gauge vote to stage farm changes whih will then be executed by the 
MasterChef multisig.
## Installation
    npm install -g @beethovenx/stage-gauge-txs

## Usage
After installing globally

`stage-gauge-txs -f changes.json -n <network> -e <eta>`

with npx

`npx @beethovenx/stage-gauge-txs -f changes.json -n <network> -e <eta>`

### Options
```
-n, --network   rinkeby | fantom
-f, --file      json file relative to current directory
-e, --eta       Timestamp for timelock execution
```

#### Config File
The file has to follow this structure 
```json
[
  {
    "type": "add",
    "lpToken": "0xbdc8483c96864a00910d2f16f003823cdf688604",
    "allocationPoints": 10,
    "rewarder": "0x1238483c96864a00910d2f16f003823cdf68ab03"
  },
  {
    "type": "edit",
    "pid": 0,
    "allocationPoints": 5
  }
]
```

Where the `rewarder` is optional for both types. 

ATTENTION:

For adding of farms: rewarder defaults to zero address
For editing of farms: **If you provide the rewarder it will be overwritten**!
