export default class BaseNode {
    private children: BaseNode[];

    constructor(private str: string, private data: any = null) {
        this.children = [];
    }

    public match(substr: string) {
        if (substr.startsWith(this.str)) {
            return this.str.length;
        }
        return 0;
    }

    public addChild(childNode: BaseNode) {
        this.children.push(childNode);
    }

    // TODO: change the method name
    static matchClass(substr: string) {
        return substr.length;
    }
}
