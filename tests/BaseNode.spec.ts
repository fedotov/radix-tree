import { expect, sinon } from './helper';
import BaseNode from '../src/BaseNode';

describe('BaseNode', () => {
    it('should create BaseNode instance', () => {
        const aa = new BaseNode('aa', true, 'data');

        expect(aa).to.have.property('str', 'aa');
        expect(aa).to.have.property('children', null);
        expect(aa).to.have.property('leaf', true);
        expect(aa).to.have.property('data', 'data');

        expect(aa.isLeaf()).to.equal(true);
        expect(aa.getData()).to.equal('data');
        expect(aa.getChildren()).to.equal(null);
    });

    it('should match and return length of match', () => {
        const ab = new BaseNode('ab');

        expect(ab.match('abcd')).to.equal(2);
        expect(ab.match('ab')).to.equal(2);
    });

    it('should not match and return 0', () => {
        const ab = new BaseNode('ab');

        expect(ab.match('acd')).to.equal(0);
        expect(ab.match('a')).to.equal(0);
    });

    it('should add child', () => {
        const ab = new BaseNode('ab');
        const cd = new BaseNode('cd');
        ab.addChild(cd);

        expect(ab.getChildren()).to.deep.include(cd);
    });

    it('should print node without children', () => {
        const ab = new BaseNode('ab');
        const stream = { write: sinon.stub() };

        ab.print(stream, '');

        expect(stream.write).have.been.calledOnceWith('ab');
    });

    it('should print node with children', () => {
        const ab = new BaseNode('ab');
        const cd = new BaseNode('cd', true);
        const ef = new BaseNode('ef');
        ab.addChild(cd);
        ab.addChild(ef);

        const buf: string[] = ['\n'];
        const stream = { write: sinon.stub().callsFake(buf.push.bind(buf)) };

        ab.print(stream, '');

        expect(stream.write.callCount).to.equal(7);
        expect(buf.join('')).to.equal(`
ab ┬─￭cd
   └─ ef`);
    });
});
