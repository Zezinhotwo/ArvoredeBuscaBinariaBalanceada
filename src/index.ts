// interface QueueNode {
//     node: NodeQueue;
//     range: number[];
// }
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
        //     1. Localize o nó alvo:
        //     - Percorra a árvore comparando `value` com o valor dos nós.
        //     - Mantenha uma referência ao pai do nó atual.

        //  2. Se o nó alvo não tiver filhos (é uma folha):
        //     - Vá até o pai do nó alvo.
        //     - Defina o ponteiro do pai (esquerdo ou direito) para `null`.

        //  3. Se o nó alvo tiver apenas um filho:
        //     - Obtenha o único filho (esquerdo ou direito).
        //     - Vá até o pai do nó alvo.
        //     - Substitua o nó alvo pelo seu único filho.

        //  4. Se o nó alvo tiver dois filhos:
        //     - Encontre o sucessor in-order (o menor nó da subárvore direita):
        //       - Vá até o filho direito do nó alvo.
        //       - Continue caminhando para os filhos esquerdos até encontrar o menor nó.
        //     - Substitua o valor do nó alvo pelo valor do sucessor.
        //     - Remova o sucessor da subárvore.

        //  5. Atualize os ponteiros:
        //     - Garanta que os ponteiros do pai do nó alvo sejam atualizados corretamente.
        //     - Certifique-se de manter a propriedade da árvore binária de busca.


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
    public levelOrder(callback?: (node: NodeQueue) => void): NodeQueue[] {
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