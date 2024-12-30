interface QueueNode {
    node: NodeQueue;
    range: number[];
}

class NodeQueue {
    public data: number;
    left: NodeQueue | null = null;
    right: NodeQueue | null = null;

    constructor(data: number) {
        this.data = data
    }
}

class Tree {
    private root: NodeQueue | null;
    private array: number[];

    constructor(array: number[]) {
        this.array = array.filter((elemento,indice) => array.indexOf(elemento) === indice )
        this.root = this.buildTree(0, this.array.length - 1);
    }

    private buildTree(start:number,end:number): NodeQueue | null  {
        if (start > end) return null;

        const mid = Math.floor((start + end) / 2);
        const node = new NodeQueue(this.array[mid]);

        node.left = this.buildTree(start, mid - 1);
        node.right = this.buildTree(mid + 1, end);

        return node;
    }
    
    public getRoot() {
        return this.root;
    }

    public insert(key: number): NodeQueue | null {

        const temp: NodeQueue = new NodeQueue(key);

        if (this.root === null) {
            this.root = temp;
            return temp;
        }

        let parent: NodeQueue | null = null;
        let current: NodeQueue | null = this.root;

        while (current !== null) {
            parent = current
            if (current.data < key) {
                current = current.left;
            } else if (current.data > key) {
                current = current.left;
            } else {
                return null;
            }
        }

        if (parent !== null) {
            if (key < parent.data) {
                parent.left = temp;
            } else {
                parent.right = temp;
            }
        }

        return this.root;

    }

}

const test: number[] = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const node = new Tree(test);
node.insert(50);
node.insert(0);
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
prettyPrint(node.getRoot());
