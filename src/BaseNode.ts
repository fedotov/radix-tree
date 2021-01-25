export default class BaseNode {
    private children: BaseNode[] | null = null;

    constructor(private str: string, private leaf: boolean = false, private data: any = null) {
    }

    // TODO: change the method name
    static matchClass(substr: string) {
        return substr.length;
    }

    public get value(): string {
        return this.str;
    }

    public match(substr: string): number {
        if (substr.startsWith(this.str)) {
            return this.str.length;
        }
        return 0;
    }

    public addChild(childNode: BaseNode): void {
        this.children = this.children || [];
        this.children.push(childNode);
    }

    public isLeaf(): boolean {
        return this.leaf;
    }

    public getChildren() {
        return this.children;
    }

    public getData() {
        return this.data;
    }

    print(stream: { write: (str: string) => void }, offset: string): void {
        stream.write(this.str);

        const prefix = `${offset}${' '.repeat(this.str.length)}`;
        (this.children || []).forEach((child, index, children) => {
            if (index > 0) {
                stream.write(prefix);
            }
            stream.write(BaseNode.getPathSign(index, children.length) + (child.leaf ? '￭' : ' '));
            child.print(stream, `${prefix} │  `);

            if (children.length !== index + 1) {
                stream.write('\n');
            }
        });
    }

    private static getPathSign(index: number, total: number) {
        if (index === 0) {
            return total === 1 ? ' ──' : ' ┬─';
        }
        if (index + 1 < total) {
            return ' ├─';
        }
        return ' └─';
    }
}
