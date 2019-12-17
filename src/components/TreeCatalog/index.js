import React from 'react'
import { Tree } from 'antd'

const { DirectoryTree } = Tree

const TreeCatalog = props => {
    return <DirectoryTree treeData={props.data} />
}

export default TreeCatalog
