import { expect } from './helper';
import RegExpNode from '../src/RegExpNode';

describe('RegExpNode', () => {
    it('should create RegExpNode instance with string pattern', () => {
        const aaORbb = new RegExpNode('^aa|bb', true, 'data');

        expect(aaORbb).to.have.property('str', '^aa|bb');
        expect(aaORbb).to.have.property('regExp');
        // @ts-ignore
        expect(aaORbb.regExp.toString()).to.equal('/^aa|bb/');
        expect(aaORbb).to.have.property('children', null);
        expect(aaORbb).to.have.property('leaf', true);
        expect(aaORbb).to.have.property('data', 'data');

        expect(aaORbb.isLeaf()).to.equal(true);
        expect(aaORbb.getData()).to.equal('data');
        expect(aaORbb.getChildren()).to.equal(null);
    });

    it('should create RegExpNode instance with string pattern and add ^ for RegExp', () => {
        const aaORbb = new RegExpNode('aa|bb', true, 'data');

        expect(aaORbb).to.have.property('str', 'aa|bb');
        expect(aaORbb).to.have.property('regExp');
        // @ts-ignore
        expect(aaORbb.regExp.toString()).to.equal('/^aa|bb/');
    });

    it('should create RegExpNode instance with RegExp', () => {
        const acdc = new RegExpNode(/^([A|D]C\/?){2}/, true, 'data');

        expect(acdc).to.have.property('str', '/^([A|D]C\\/?){2}/');
        expect(acdc).to.have.property('regExp');
        // @ts-ignore
        expect(acdc.regExp.toString()).to.equal('/^([A|D]C\\/?){2}/');
    });

    it('should match RegExp and return matched count', () => {
        const acdc = new RegExpNode(new RegExp(/^[abcdef]+/i), true, 'data');

        expect(acdc.match('ab-cd')).to.equal(2);
        expect(acdc.match('cafBCjkl')).to.equal(5);
    });

    it('should match pattern and return matched count', () => {
        const phoneNumber = new RegExpNode('\\d{3}-\\d{2}-\\d{2}');

        expect(phoneNumber.match('123-45-67')).to.equal(9);
    });

    it('should not match pattern and return 0', () => {
        const aaa = new RegExpNode('a{3,5}');

        expect(aaa.match('aabbcc')).to.equal(0);
        expect(aaa.match('aa')).to.equal(0);
        expect(aaa.match('xaaaa')).to.equal(0);
    });
});
