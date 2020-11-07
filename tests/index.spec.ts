import { expect } from 'chai';
import RegExpNode from '../src/RegExpNode';

describe('test', () => {
    it('a', () => {
        // const p = new RegExpNode('{asdf}');
        const res = RegExpNode.matchClass('{asdf}sadfsfnjfg');
        console.log(res);
    });

    it('b', () => {
        const t = new RegExpNode('{asdf}');

        console.log('>>', t.match('asdf'));
        expect(true).to.equal(true);
    });
});
