export default function BinaryTree() {
  return (
    <>
      <h2>What is a (Binary) Tree?</h2>
      <ul>
        <li>
          can be used to describe hierarchical structures, eg. arithmetic
          expressions, file systems, etc.
        </li>
        <li>
          consists of single node (Knoten) or one node directly connected to up
          to k more nodes
        </li>
        <li>no circles: a node cannot be a child of any of it`s descendants</li>
        <li>binary Tree: for k = 2, i.e. up to 2 children per node</li>
      </ul>
    </>
  )
}
