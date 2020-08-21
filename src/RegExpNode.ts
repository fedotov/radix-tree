import * as assert from 'assert';
import BaseNode from './BaseNode';

export default class RegExpNode extends BaseNode {
    private static regexParam = /^{[a-zA-Z0-9-]+}$/;

    private static regexNodeType = /^({[a-zA-Z0-9-]+}).*/;

    constructor(str: string, data: any = null) {
        RegExpNode.validate(str);
        super(str, data);
    }

    static validate(substr: string) {
        assert.ok(RegExpNode.regexParam.test(substr), 'RegExpNode constructor accetps only "{paramName}" strings');
    }

    // eslint-disable-next-line class-methods-use-this
    public match(substr: string) {
        return RegExpNode.matchClass(substr);
    }

    // TODO: change the method name
    static matchClass(substr: string) {
        const res = substr.match(RegExpNode.regexNodeType);
        return res && res?.length >= 2 ? res[1].length : 0;
    }
}
