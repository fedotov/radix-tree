import chai from 'chai';
import dirtyChai from 'dirty-chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';

chai.use(dirtyChai);
chai.use(sinonChai);

const { expect } = chai;

export {
    expect,
    sinon,
};
