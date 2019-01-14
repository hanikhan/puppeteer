const {parse} = require('url');
const {get} = require('lodash/fp');
const tldExtract = require('tld-extract');
const prettyBytes = require('pretty-bytes');

function getDomain(url) {
    if (url.startsWith('data:')) {
        return 'data';
    }
    const {hostname} = parse(url);
    if (hostname === 'localhost') {
        return hostname;
    }
    return tldExtract(url).domain;
}

function getFirstPartyDomains(url, additionalDomains = []) {
    const domain = getDomain(url);
    return [domain, ...additionalDomains];
}

function buildRequest(events, firstPartyDomains = []) {
    const url = get('requestWillBeSent.request.url', events);
    const domain = getDomain(url);
    const isThirdParty = !firstPartyDomains.includes(domain);
    const type = get('responseReceived.type', events);
    const status = get('responseReceived.response.status', events);
    const size = get('loadingFinished.encodedDataLength', events) || 0;
    const prettySize = prettyBytes(size);
    const error = get('loadingFailed.errorText', events);
    return {url, domain, type, status, isThirdParty,  size, prettySize, error};
}

function buildRequests({url, domains, events: eventsById}) {
    const firstPartyDomains = getFirstPartyDomains(url, domains);
    return Object.values(eventsById)
        .map((events) => buildRequest(events, firstPartyDomains));
}

module.exports = {buildRequests, buildRequest, getDomain, getFirstPartyDomains};