
const NET = require('../tools/net')

async function ping_me(param) {
    return ({
        greeting: 'Welcome to Ethioflix! This is admin!'
    })
}

async function ping_moviedb(params) {
    let result;
    result = await NET.run({ data: '/moviedb/pingme' }, 'http://127.0.0.1:21000/v1/gateway/', '');
    return {
        result: result
    };
}

const HOA = {
    ping_moviedb: ping_moviedb,
    ping_me: ping_me
}

export default HOA;
