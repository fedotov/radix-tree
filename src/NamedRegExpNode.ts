import RegExpNode from './RegExpNode';

export default class NamedRegExpNode extends RegExpNode {
    private static regexParamName = /^{([a-zA-Z0-9_-]+):?(.+)?}$/;

    private static regexDefaultValue = /^[a-zA-Z0-9-]+/;

    private name: string;

    constructor(str: string, leaf: boolean = false, data: any = null) {
        const res = str.match(NamedRegExpNode.regexParamName);

        if (!res || res.length < 2) {
            throw new Error(`Argument "${str}" does not match ${NamedRegExpNode.regexParamName}`);
        }

        const [, name, regStr = NamedRegExpNode.regexDefaultValue] = res;

        super(regStr, leaf, data);
        this.name = name;
    }

    static validate(substr: string) {
        if (!NamedRegExpNode.regexParamName.test(substr)) {
            throw new Error('RegExpNode constructor accepts only "{paramName}" strings');
        }
    }

    // TODO: change the method name
    static matchClass(substr: string) {
        const res = substr.match(NamedRegExpNode.regexDefaultValue);
        return res && res?.length >= 2 ? res[1].length : 0;
    }
}
