import BaseNode from './BaseNode';

export default class RegExpNode extends BaseNode {
    private readonly regExp: RegExp;

    constructor(regExp: string | RegExp, leaf: boolean = false, data: any = null) {
        super(`${regExp}`, leaf, data);

        if (typeof regExp === 'string') {
            this.regExp = new RegExp(regExp[0] === '^' ? regExp : `^${regExp}`);
        } else {
            this.regExp = regExp;
        }
    }

    public match(substr: string) {
        const res = substr.match(this.regExp);

        return res && res.length > 0 ? res[0].length : 0;
    }

    static validate(substr: string) {
        // if (!RegExpNode.regexParam.test(substr)) {
        //     throw new Error('RegExpNode constructor accepts only "{paramName}" strings');
        // }
    }

    // TODO: change the method name
    static matchClass(substr: string) {
        // const res = substr.match(RegExpNode.regexNodeType);
        // return res && res?.length >= 2 ? res[1].length : 0;
        return 0;
    }
}
