const WebSocket = require('ws');
const HttpsProxyAgent = require('https-proxy-agent');
const fs = require('fs');
const url = require('url');

const {logMessage} = require('./log');

var settings = JSON.parse(fs.readFileSync("settings.json"));

var proxy = url.parse(`http://${settings.proxy.host}:${settings.proxy.port.toString()}`);
var agent = new HttpsProxyAgent(proxy);

var uri = `${settings.uri.base}${settings.uri.stream}?cid=${settings.cluster_id}&type=${settings.type}`;
var auth_token = fs.readFileSync(settings.token_file);
var customer_id = settings.customer_id;
var messages = [];

const ws = new WebSocket(uri, {
    perMessageDeflate: {
        serverNoContextTakeover: true,
        clientNoContextTakeover: true
    },
    protocolVersion: 13,
    headers: {
        // Settings 'Sec-WebSocket-Key' as defined in the documentation does not seem to work. On the contrary, not setting it at all works fine
        // 'Sec-WebSocket-Key': "",
        Host: settings.host,
        Authorization: `Bearer ${auth_token}`
    },
    agent // Remove this line if you are not using a proxy
});

ws.on('open', function open() {
    logMessage(`Connection to ${settings.uri.base} established`);
});

ws.on('message', function incoming(data) {
    messages.push(data);
    if (messages.length >= settings.batchSize) {
        // Do what you need to do with the obtained events (push to a database, log stream, etc.)
        console.log(messages); // this is just an example/ test; replace with the actual task you need to do with the events
        logMessage(`Retrieved ${current_messages.length.toString()} ${settings.type} events`);
        messages = [];
    }
});

ws.on('error', function incoming(err) {
    logMessage(`ERROR: Unable to connect to ${settings.host}; ${err.message}`);
    process.exit();
});