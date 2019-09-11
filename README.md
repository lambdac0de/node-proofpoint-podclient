# node-proofpoint-podclient

This is a client subscriber to Proofpoint On-demand's (PoD) Log API. The Log API is a websocket service (wss) awaiting connections from clients. You can subscibe to either filter (message) logs or MTA (maillog) logs.<br><br>
<i>note:</i> The PoD Log API documentation does not seem to be publicly available, so I can not reference it here. Reach out to your sales/ account team.

#### IMPORTANT!
This is my own implementation of a client subscriber for the Log API. This code is not related to the vendor or the product in any way

#### Prerequisite
`Node.Js v10.14.2` or higher version

#### Usage

1. Obtain your JWT authentication token and save it in a file with filename `jwt.token`
2. Open a command prompt/ terminal and go to the program location.<br>
   Initialize the required modules by running `npm install`
3. Run `node client.js` to start listening for logs

<i>note:</i> The scirpt is set to just output the logs in the screen. Modify the `ws.on('message')` function in `client.js` to perform your desired acttion (push to a log stream, etc.)
