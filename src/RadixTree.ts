import BaseNode from './BaseNode';

export default class RadixTree {
    private roots: BaseNode[];

    constructor() {
        this.roots = [];
    }

    public add(str: string, data: any) {
        console.log('add', str, data);
    }

    find() {

    }

    print() {

    }
}
