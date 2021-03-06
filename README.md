# clickmeeting-headless-registration

The script allows you to create accounts in the Clickmeeting service without using a long form, just in one click.

## Installation

1. The first and most important step is to [install NodeJS](https://nodejs.org/en/).
![Click on button to download on NodeJS](https://i.imgur.com/htWXVO1.png)
2. Clone this repository or just use «Download ZIP».
![Github clone repository using](https://i.imgur.com/G30nOXG.png)
3. We check that NodeJS is installed correctly, for this we execute the command in the console: `node -v`. If all is well, then we will see the current, downloaded version.
![Run node -v in console](https://i.imgur.com/98SBIvK.png)
4. Go to the project folder and run the `npm install` (or `yarn install`) command.

## Using

1. Go from the console to the downloaded folder.
2. We execute the following command: `node registration.js ACCOUNT_ID ACCOUNT_NAME CUSTOM_EMAIL`

* `ACCOUNT_ID`: unique ID, number, required.
* `ACCOUNT_NAME`: non unique account name, required.
* `CUSTOM_EMAIL`: unique email, not required (using default value).

![Successfull request](https://i.imgur.com/7dglOa5.png)

## Features

- [x] Basic account registration
- [x] Use custom account ID and name
- [x] Use custom email
- [x] Validate values
- [x] Error message and interruption if the script is incorrect
- [x] Display last registered accounts in a file
