interface QueueNode {
    node: NodeQueue;
    range: number[];
}

class NodeQueue {
    public data: number;
    public left: NodeQueue | null;
    public right: NodeQueue | null;

    constructor(data: number) {
        this.data = data
        this.right = null;
        this.left = null;
    }
}

class Tree {
     root: NodeQueue | null;
    private array: number[];

    constructor(array: number[]) {
        this.array = array
        this.root = this.buildTree();
    }

    private buildTree(): NodeQueue | null {
        let arrayLength = this.array.length;

        if (arrayLength === 0)
            return null;

        let mid: number = Math.floor((arrayLength - 1) / 2);
        let root: NodeQueue = new NodeQueue(this.array[mid]);
        let queue: QueueNode[] = [{ node: root, range: [0, arrayLength] }]
        let frontIndex: number = 0;
        while (frontIndex < queue.length) {
            let aux: QueueNode = queue[frontIndex];
            let curr: NodeQueue = aux.node;
            let [s, e]: number[] = aux.range;

            let index: number = s + Math.floor((e - s) / 2);

            if (s < index) {
                let midLeft = s + Math.floor((index - 1 - s) / 2);
                curr.left = new NodeQueue(this.array[midLeft]);
                queue.push({ node: curr.left, range: [s, index - 1] })
            }
            if (e > index) {
                let midRight = s + Math.floor((index - 1 - s) / 2);
                curr.right = new NodeQueue(this.array[midRight]);
                queue.push({ node: curr.right, range: [index + 1, e] })
            }
            frontIndex++;

        }

        return root;
    }
}
//AKi(4)
const test: number[] = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const node = new Tree(test);

// Print Tree
const prettyPrint = (node: NodeQueue | null, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

// Imprimir a árvore
prettyPrint(node.root);