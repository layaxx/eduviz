import React from "react"
import { Button, Container, Input, InputGroup } from "reactstrap"
import BinaryTreeNode from "./BinaryTreeNode"
import confirm from "reactstrap-confirm"
import { CopyToClipboard } from "react-copy-to-clipboard"
import "./BinaryTree.css"
import { exportTreeAsString } from "../../lib/binaryTreeHelpers"
import LoadTreeSection from "./LoadTreeSection"

export default function BinaryTree() {
  const rootID = "0"

  const [activeID, setActiveID] = React.useState<string | undefined>(rootID)

  const callback = (id: string) => {
    setActiveID(id)
  }

  const [tree, setTree] = React.useState(
    new BinaryTreeNode(rootID, "", callback)
  )
  const [JSX, setJSX] = React.useState(tree.render())

  const [newValue, setNewValue] = React.useState("")
  const [newStatus, setNewStatus] = React.useState("")

  React.useEffect(() => {
    if (activeID) {
      console.debug("changed activeID to ", activeID)
      tree.clearHighlights()
      tree.setIsHighlighted(activeID, true)
      setTree(tree)
      setJSX(tree.render())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeID])

  return (
    <>
      <LoadTreeSection
        setTree={(tree) => {
          setJSX(tree.render())
          setTree(tree)
        }}
        callback={callback}
      />

      <Container>
        <h2>Tree controls</h2>
        <InputGroup>
          <Input
            value={newValue}
            onChange={(event) => setNewValue(event.target.value)}
            type="text"
            placeholder="value for node"
          ></Input>

          <Button
            onClick={() => {
              if (activeID && newValue) {
                tree.setValueOfNode(activeID, newValue)
                setTree(tree)
                setJSX(tree.render())
              } else {
                alert("no active Node found or no/empty new value")
              }
            }}
          >
            Set active Node´s value
          </Button>
        </InputGroup>

        <InputGroup>
          <Input
            value={newStatus}
            onChange={(event) => setNewStatus(event.target.value)}
          ></Input>
          <Button
            onClick={() => {
              if (activeID) {
                tree.setStatus(activeID, newStatus)
                setTree(tree)
                setJSX(tree.render())
              } else {
                alert("no active Node found")
              }
            }}
          >
            Set active Node´s status
          </Button>
        </InputGroup>

        <Button
          color="danger"
          onClick={() => {
            confirm({
              title: "Do you want to delete the Tree?",
              message: "This action cannot be undone",
              confirmText: "reset/delete Tree",
              confirmColor: "danger",
            }).then((isConfirmed: boolean) => {
              if (isConfirmed) {
                const newTree = new BinaryTreeNode(rootID, "", callback)
                setTree(newTree)
                setJSX(newTree.render())
                setActiveID(rootID)
              }
            })
          }}
        >
          reset Tree
        </Button>

        <CopyToClipboard text={exportTreeAsString(tree)}>
          <Button>Copy serialized Tree to Clipboard</Button>
        </CopyToClipboard>
      </Container>

      <hr />

      <div id="react-tree-vis">
        <ul>{JSX}</ul>
      </div>
    </>
  )
}
