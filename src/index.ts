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
        this.array = array.filter((elemento, indice) => array.indexOf(elemento) === indice)
        this.root = this.buildTree(0, this.array.length - 1);
    }

    private buildTree(start: number, end: number): NodeQueue | null {
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
    public deleteItem(value: number): void {
        let current: NodeQueue | null = this.root;
        let parent: NodeQueue | null = null;
        while (current !== null && current.data !== value) {
            parent = current;
            if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        // se nao for encontrado 
        if (current === null) {
            return;
        }
        // se for uma folha
        if (current.left === null && current.right === null) {
            if (parent == null) {
                this.root = null;
            } else if (parent.left == current) {
                parent.left = null
            }
            else if (parent.right == current) {
                parent.right = null
            }
        } else if (current.left === null || current.right === null) {
            const child = current.left !== null ? current.left : current.right;

            if (parent == null) {
                this.root = child;
            } else if (parent.left === current) {
                parent.left = child;
            } else {
                parent.right = child;
            }
        } else {
            // Encontrar o sucessor in-order (menor nó da subárvore direita)
            let successor = current.right;
            let successorParent = current;

            while (successor.left !== null) {
                successorParent = successor;
                successor = successor.left;
            }

            // Substituir o valor do nó atual pelo valor do sucessor
            current.data = successor.data;

            // Remover o sucessor
            if (successorParent.left === successor) {
                successorParent.left = successor.right;
            } else {
                successorParent.right = successor.right;
            }
        }
    }
    public find(value: number): NodeQueue | null {

        let current = this.root;
        while (current !== null && current.data !== value) {
            if (value < current.data) {
                current = current.left
            } else if (value > current.data) {
                current = current.right;
            }
        }
        return current;
    }
    public levelOrder(callback: (node: NodeQueue) => void): NodeQueue[] {
        const result: NodeQueue[] = [];
        const queue: (NodeQueue | null)[] = [];

        if (this.root === null) {
            return result;
        }

        queue.push(this.root);

        while (queue.length > 0) {
            const current = queue.shift();
            if (current != undefined)
                if (current !== null) {
                    result.push(current);
                    if (callback && typeof callback === "function") {
                        callback(current);
                    } else if (!callback || typeof callback !== "function") {
                        throw new Error("Precisa de um callback para este método");
                    }
                    if (current.left) {
                        queue.push(current.left);
                    }
                    if (current.right) {
                        queue.push(current.right);
                    }
                }
        }

        return result;
    }

    public inOrder(callback: (node: NodeQueue) => void, node: NodeQueue | null = this.root): void {

        if (node === null) {
            return;
        }
        // Visita o filho da esquerda primeiro
        this.inOrder(callback, node.left);

        // Executa o callback no nó atual
        callback(node);

        // Visita o filho da direita por último
        this.inOrder(callback, node.right);

    }

    public preOrder(callback: (node: NodeQueue) => void, node: NodeQueue | null = this.root): void {

        if (node == null) {
            return;
        }

        callback(node);
        this.preOrder(callback, node.left);
        this.preOrder(callback, node.right);
    }

    public postOrder(callback: (node: NodeQueue) => void, node: NodeQueue | null = this.root) {

        if (node == null) {
            return;
        }

        this.postOrder(callback, node.left);
        this.postOrder(callback, node.right);
        callback(node);

    }

    height(node: NodeQueue | null): number {
        if (node === null) return 0;
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(data: NodeQueue, node: NodeQueue): number {
        if (node === null) return -1; // Retorno para caso a árvore esteja vazia

        if (node.data === data.data) return 0;

        if (data.data < node.data && node.left !== null) {
            return this.depth(data, node.left) + 1;
        }

        if (data.data > node.data && node.right !== null) {
            return this.depth(data, node.right) + 1;
        }

        return -1; // Retorno para caso o nó não seja encontrado
    }

    public isBalanced(): boolean {
        return this.checkBalanced(this.root);
    }

    private checkBalanced(node: NodeQueue | null): boolean {
        if (node === null) return true;

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        if (Math.abs(leftHeight - rightHeight) > 1) return false;

        return this.checkBalanced(node.left) && this.checkBalanced(node.right);
    }

    public rebalance(): void {
        const sortedArray: number[] = [];

        this.inOrder((node: NodeQueue) => sortedArray.push(node.data));

        this.root = this.buildTree(0, sortedArray.length - 1);
    }

}

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

const test: number[] = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const node = new Tree(test);
node.levelOrder(nodes => console.log("visieted Nodes: " + nodes.data));
node.insert(50);
node.insert(0);

// Imprimir a árvore
prettyPrint(node.getRoot());
node.deleteItem(4);
prettyPrint(node.getRoot());

console.log(node.find(1));