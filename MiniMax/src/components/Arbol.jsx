import React from 'react'
import { useState } from 'react'
import Nodo from './Nodo'

const Arbol = () => {

    const [arbol, setArbol] = useState({
        value: "raiz",
        children: []
    })

    const addChild = (nodo) => {
        nodo.children.push({ value: "", children: [] })
        setArbol({ ...arbol })
    }

    const handleAddChild = (indexPath) => {
        const findNode = (path, currentNode) => {
            if (path.length === 0) return currentNode;
            const [head, ...tail] = path;
            return findNode(tail, currentNode.children[head]);
        };

        const node = findNode(indexPath, arbol);
        addChild(node);
    };

    const renderNode = (node, path = []) => {
        return (
            <Nodo
                value={node.value}
                children={node.children}
                onAddChild={() => handleAddChild(path)}
            />
        );
    };

    return (
        <div>
            {renderNode(arbol)}
        </div>
    )
}

export default Arbol
