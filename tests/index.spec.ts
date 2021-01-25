import NamedRegExpNode from '../src/NamedRegExpNode';

describe('test', () => {
    it('a', () => {
        const p = new NamedRegExpNode('{asdf}');
        const res = p.match('12345-qwerty');
        console.log(res);
    });
});
