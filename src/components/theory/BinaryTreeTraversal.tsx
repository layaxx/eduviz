export default function BinaryTreeTraversal() {
  return (
    <>
      <h2>How can you traverse a Binary Tree?</h2>

      <p>
        Goal: Recursively visit every node, starting from the root.
        <br />
        {"=>"} different sequences possible:
      </p>
      <ol>
        <li>
          Preorder [Präorder]
          <p>W L R</p>
        </li>

        <li>
          Inorder
          <p>L W R</p>
        </li>

        <li>
          Postorder
          <p>L R W</p>
        </li>
      </ol>

      <p>
        W = write / process current node
        <br />L = visit left child node/subtree [Recursion]
        <br />R = visit right child node/subtree [Recursion] <hr />
        Only difference is when to write/process current node.
      </p>
    </>
  )
}
