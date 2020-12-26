import { expect } from './helper';
import RegExpNode from '../src/RegExpNode';
import BaseNode from '../src/BaseNode';
import RadixTree from '../src/RadixTree';

describe('RadixTree', () => {
    let radixTree: RadixTree;
    let bbb: BaseNode;
    let cc: BaseNode;
    let def: BaseNode;
    let bbbccc: BaseNode;
    let bbbee: BaseNode;
    let cceee: BaseNode;
    let ccfff: BaseNode;
    let eeeORddd: BaseNode;
    let twoDigits: BaseNode;
    let digits: BaseNode;
    let cceeeggg: BaseNode;
    let cceeehhhh: BaseNode;
    let jjj: BaseNode;

    beforeEach(() => {
        radixTree = new RadixTree();

        bbb = new BaseNode('bbb');
        cc = new BaseNode('cc');
        def = new BaseNode('def', true);
        radixTree.root.addChild(bbb);
        radixTree.root.addChild(cc);
        radixTree.root.addChild(def);

        bbbccc = new BaseNode('ccc', true);
        bbbee = new BaseNode('ee', true);
        bbb.addChild(bbbccc);
        bbb.addChild(bbbee);

        cceee = new BaseNode('eee');
        ccfff = new BaseNode('fff', true);
        eeeORddd = new RegExpNode('eee|ddd', true, 'eee or ddd');
        twoDigits = new RegExpNode(/^\d\d/, true, 'two digits');
        digits = new RegExpNode(/^\d+/, false, 'digits');
        cc.addChild(cceee);
        cc.addChild(eeeORddd);
        cc.addChild(ccfff);
        cc.addChild(twoDigits);
        cc.addChild(digits);

        cceeeggg = new BaseNode('ggg', true);
        cceeehhhh = new BaseNode('hhhh', true);
        cceee.addChild(cceeeggg);
        cceee.addChild(cceeehhhh);

        jjj = new BaseNode('jjj');
        def.addChild(jjj);

        // radixTree.print(fs.createWriteStream('./print-output'));
    });

    it('should print RadixTree', () => {
        const buf: string[] = ['\n'];
        const stream = { write: buf.push.bind(buf) };

        radixTree.print(stream);

        expect(buf.join('')).to.equal(`
* ┬─ bbb ┬─￭ccc
  │      └─￭ee
  ├─ cc ┬─ eee ┬─￭ggg
  │     │      └─￭hhhh
  │     ├─￭eee|ddd
  │     ├─￭fff
  │     ├─￭/^\\d\\d/
  │     └─ /^\\d+/
  └─￭def ── jjj
`);
    });

    describe('find', () => {
        it('should find "bbbee"', () => {
            const matched = radixTree.find('bbbee');
            expect(matched).to.equal(bbbee);
        });

        it('should find "ccfff"', () => {
            const matched = radixTree.find('ccfff');
            expect(matched).to.equal(ccfff);
        });

        it('should not find "cc13455" as not marked as leaf', () => {
            const matched = radixTree.find('cc13455');
            expect(matched).to.equal(null);
        });

        it('should find "cceee" from regex', () => {
            const matched = radixTree.find('cceee');
            expect(matched).to.equal(eeeORddd);
        });

        it('should find "def", leaf with children', () => {
            const matched = radixTree.find('def');
            expect(matched).to.equal(def);
        });
    });
});
