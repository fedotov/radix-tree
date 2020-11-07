import BaseNode from './BaseNode';

export default class RadixTree {
    readonly root: BaseNode;

    constructor() {
        this.root = new BaseNode('');
    }

    public add(str: string, data: any) {
        console.log('add', str, data);
    }

    public find(str: string) {
        const queue = [{ substr: str, children: this.root.getChildren(), index: -1 }];

        function next() {
            if (queue.length === 0) {
                return null;
            }
            let scope = queue[queue.length - 1];
            while (scope && (!scope.children || scope.index + 1 === scope.children.length)) {
                queue.splice(queue.length - 1, 1);
                scope = queue[queue.length - 1];
            }

            if (!scope || !scope.children) {
                return null;
            }

            return { child: scope.children[++scope.index], substr: scope.substr };
        }

        for (let scope = next(); scope; scope = next()) {
            const { child, substr } = scope;
            const matchLength = child.match(substr);

            if (matchLength === substr.length && child.isLeaf()) {
                return child;
            }
            if (matchLength > 0 && matchLength < substr.length) {
                queue.push({
                    substr: substr.substring(matchLength),
                    children: child.getChildren(),
                    index: -1,
                });
            }
        }

        return null;
    }

    print(stream: { write: (str: string) => void }) {
        // remove offset for root node
        this.root.print(stream, -BaseNode.PATH_SIZE);
        stream.write('\n');
    }
}
