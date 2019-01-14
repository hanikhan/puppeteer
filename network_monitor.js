const yargs = require('yargs');
const {pick} = require('lodash/fp');
const {captureEventsById} = require('./lib/events');
const {buildRequests} = require('./lib/requests');
const {summarize} = require('./lib/summary');

function parseArgs(args) {
    const { _: [url], device, firstPartyDomains = '', v} =
        yargs
            .alias('d', 'device')
            .alias('f', 'firstPartyDomains')
            .count('v')
            .help()
            .parse(args);

    const domains = firstPartyDomains.split(',');

    const output = ['url', 'summary'];

    if (v > 0) {
        output.push('device');
        output.push('requests');
    }

    if (v > 1) {
        output.push('events');
    }

    return ({url, device, domains, output});
}

async function run({url, device: deviceName, domains, output}) {
    const {events, device} = await captureEventsById({url, deviceName});
    const requests = buildRequests({url, domains, events});
    const summary = summarize({requests, grouping: 'type'});
    return pick(output, {url, summary, device, requests, events});
}

if (require.main === module) {
    (async () => {
        const options = parseArgs(process.argv.slice(2));
        console.log(JSON.stringify(await run(options), null, 2));
    })();
}

module.exports = {parseArgs, run};