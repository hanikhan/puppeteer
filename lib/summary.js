const {flow, groupBy, mapValues} = require('lodash/fp');
const prettyBytes = require('pretty-bytes');

function sumSizes(requests) {
    return requests.reduce(
        ({firstParty, thirdParty, total}, {isThirdParty, size}) => ({
            firstParty: isThirdParty ? firstParty : firstParty + size,
            thirdParty: isThirdParty ? thirdParty + size : thirdParty,
            total: total + size,
        }),
        {firstParty: 0, thirdParty: 0, total: 0}
    );
}

const prettySizes = (sums) => mapValues(prettyBytes, sums)

function summarize({requests, grouping}) {
    return flow(
        groupBy(grouping),
        mapValues(sumSizes),
        mapValues(prettySizes)
    )(requests);
}

module.exports = {summarize, sumSizes, prettySizes};