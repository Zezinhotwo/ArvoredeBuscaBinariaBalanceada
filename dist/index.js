"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Queue_nodes;
class NodeQueue {
    constructor(data) {
        this.left = null;
        this.right = null;
        this.data = data;
    }
}
class Tree {
    constructor(array) {
        this.array = array.filter((elemento, indice) => array.indexOf(elemento) === indice);
        this.root = this.buildTree(0, this.array.length - 1);
    }
    buildTree(start, end) {
        if (start > end)
            return null;
        const mid = Math.floor((start + end) / 2);
        const node = new NodeQueue(this.array[mid]);
        node.left = this.buildTree(start, mid - 1);
        node.right = this.buildTree(mid + 1, end);
        return node;
    }
    getRoot() {
        return this.root;
    }
    insert(key) {
        const temp = new NodeQueue(key);
        if (this.root === null) {
            this.root = temp;
            return temp;
        }
        let parent = null;
        let current = this.root;
        while (current !== null) {
            parent = current;
            if (current.data < key) {
                current = current.left;
            }
            else if (current.data > key) {
                current = current.left;
            }
            else {
                return null;
            }
        }
        if (parent !== null) {
            if (key < parent.data) {
                parent.left = temp;
            }
            else {
                parent.right = temp;
            }
        }
        return this.root;
    }
    deleteItem(value) {
        let current = this.root;
        let parent = null;
        while (current !== null && current.data !== value) {
            parent = current;
            if (value < current.data) {
                current = current.left;
            }
            else {
                current = current.right;
            }
        }
        if (current === null) {
            return;
        }
        if (current.left === null && current.right === null) {
            if (parent == null) {
                this.root = null;
            }
            else if (parent.left == current) {
                parent.left = null;
            }
            else if (parent.right == current) {
                parent.right = null;
            }
        }
        else if (current.left === null || current.right === null) {
            const child = current.left !== null ? current.left : current.right;
            if (parent == null) {
                this.root = child;
            }
            else if (parent.left === current) {
                parent.left = child;
            }
            else {
                parent.right = child;
            }
        }
        else {
            let successor = current.right;
            let successorParent = current;
            while (successor.left !== null) {
                successorParent = successor;
                successor = successor.left;
            }
            current.data = successor.data;
            if (successorParent.left === successor) {
                successorParent.left = successor.right;
            }
            else {
                successorParent.right = successor.right;
            }
        }
    }
    find(value) {
        let current = this.root;
        while (current !== null && current.data !== value) {
            if (value < current.data) {
                current = current.left;
            }
            else if (value > current.data) {
                current = current.right;
            }
        }
        return current;
    }
}
class Queue {
    constructor(initialNode = null) {
        _Queue_nodes.set(this, []);
        if (initialNode !== null && initialNode !== undefined) {
            __classPrivateFieldGet(this, _Queue_nodes, "f").push(initialNode);
        }
        else if (initialNode !== null) {
            console.log("Can't set Null Element in the Queue");
        }
    }
    enQueue(value) {
        __classPrivateFieldGet(this, _Queue_nodes, "f").push(value);
    }
    deQueue(value) {
        const index = __classPrivateFieldGet(this, _Queue_nodes, "f").findIndex(node => node.data === value.data);
        if (index !== -1) {
            return __classPrivateFieldGet(this, _Queue_nodes, "f").splice(index, 1)[0];
        }
        else {
            console.log("This item isn’t in the Queue");
            return null;
        }
    }
    isEmpty() {
        return __classPrivateFieldGet(this, _Queue_nodes, "f").length === 0;
    }
    printQueue() {
        console.log(__classPrivateFieldGet(this, _Queue_nodes, "f").map(node => node.data));
    }
}
_Queue_nodes = new WeakMap();
const prettyPrint = (node, prefix = "", isLeft = true) => {
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
const test = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const node = new Tree(test);
node.insert(50);
node.insert(0);
prettyPrint(node.getRoot());
node.deleteItem(4);
prettyPrint(node.getRoot());
console.log(node.find(1));
