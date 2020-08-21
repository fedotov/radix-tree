const test = require('ava');
const RegExpNode = require('../src/RegExpNode');

test('a', (t) => {
    // const p = new RegExpNode('{asdf}');
    const res = RegExpNode.matchClass('{asdf}sadfsfnjfg');
    console.log(res);

    t.pass();
});
