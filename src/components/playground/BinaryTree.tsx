import React, { useRef, useState } from "react"

import { CopyToClipboard } from "react-copy-to-clipboard"
import { toast } from "react-toastify"
import {
  Button,
  Col,
  Container,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Row,
} from "reactstrap"
import confirm from "reactstrap-confirm"

import {
  exportTreeAsString,
  loadTreeFromString,
} from "../../lib/binaryTreeHelpers"
import { NavDirection, TraversalOption } from "../../lib/binaryTreeTypes"
import BinaryTreeNode from "./BinaryTreeNode"
import "./BinaryTree.css"
import LoadTreeSection from "./LoadTreeSection"

export default function BinaryTree() {
  const rootID = "0"

  const [activeID, setActiveID] = React.useState<string | undefined>(rootID)

  const textInput = useRef<null | any>(null)

  const callback = (id: string) => {
    setActiveID(id)
    textInput.current?.focus()
  }

  const [hideEmptyNodes, setHideEmptyNodes] = useState(false)

  const [tree, setTree] = React.useState(
    new BinaryTreeNode(rootID, "", callback)
  )
  const [JSX, setJSX] = React.useState(tree.render(hideEmptyNodes))

  const [newValue, setNewValue] = React.useState("")
  const [newStatus, setNewStatus] = React.useState("")

  const [zoomLevel, setZoomLevel] = useState(1)

  const [traversalOption, setTraversalOption] = useState<TraversalOption>(
    TraversalOption.PREORDER
  )

  const [traversalOutput, setTraversalOutput] = useState("")

  const traversalOptions = Object.values(TraversalOption)

  const updateTree = (newTree: BinaryTreeNode) => {
    if (!newTree.render) {
      const { id, value, status, left, right } = newTree
      newTree = new BinaryTreeNode(id, value, callback, status, left, right)
      newTree.setIsHighlighted(id, true)
      setActiveID(id)
    }
    setTree(newTree)
    setJSX(newTree.render(hideEmptyNodes))
  }

  React.useEffect(() => {
    if (activeID) {
      console.debug("changed activeID to ", activeID)
      tree.clearHighlights()
      tree.setIsHighlighted(activeID, true)
      updateTree(tree)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeID])

  React.useEffect(() => {
    const treeStringFromLocalStorage =
      window.localStorage.getItem("stored-tree")
    if (treeStringFromLocalStorage) {
      updateTree(loadTreeFromString(treeStringFromLocalStorage))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    window.localStorage.setItem("stored-tree", exportTreeAsString(tree))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exportTreeAsString(tree)])

  const handleNodeValueChange = () => {
    if (activeID && newValue) {
      tree.setValueOfNode(activeID, newValue)
      updateTree(tree)
    } else {
      singleAlert("no active Node found or no/empty new value")
    }
  }

  const singleAlert = (
    msg: string,
    mode?: "error" | "warning" | "info" | "success"
  ) => {
    toast.dismiss()
    toast.clearWaitingQueue()
    toast[mode ?? "error"](msg)
  }

  return (
    <div
      tabIndex={0} /* required to listen for keydown events */
      style={{ outline: "none" }}
      onKeyDown={(event) => {
        if (!tree || !activeID) return

        try {
          switch (event.key) {
            case "ArrowLeft":
              tree.navigate(activeID, NavDirection.LEFT)
              event.preventDefault()
              break
            case "ArrowRight":
              tree.navigate(activeID, NavDirection.RIGHT)
              event.preventDefault()
              break
            case "ArrowUp":
              tree.navigate(activeID, NavDirection.UP)
              event.preventDefault()
              break
          }
        } catch (error) {
          if (
            new Set(["Node has no left child", "Node has no right child"]).has(
              (error as Error).message
            )
          ) {
            return singleAlert("You have reached the end of the Tree.", "info")
          }
          console.error(error)
          singleAlert(
            "Error occurred during Navigation. See Console for additional Information."
          )
        }
      }}
    >
      <h2>Binary Tree Playground</h2>
      <LoadTreeSection updateTree={updateTree} />

      <Container className="border-bottom">
        <h3>Tree controls</h3>

        <Row className="pb-2 mb-2 border-bottom">
          <Col className="d-grid">
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
                    updateTree(newTree)
                    setActiveID(rootID)

                    // Refocus on Value input
                    textInput.current?.focus()
                  }
                })
              }}
            >
              reset Tree
            </Button>
          </Col>
          <Col className="d-grid">
            <Button
              color="danger"
              onClick={() => {
                if (!activeID) {
                  return
                }
                const newTree =
                  tree.remove(activeID) ??
                  new BinaryTreeNode(rootID, "", callback)
                updateTree(newTree)
                setActiveID(newTree.id || rootID)
              }}
            >
              remove active Node
            </Button>
          </Col>
          <Col className="d-grid">
            <CopyToClipboard
              text={exportTreeAsString(tree)}
              onCopy={() =>
                toast("Successfully copied stringified tree to clipboard")
              }
            >
              <Button>Copy to Clipboard</Button>
            </CopyToClipboard>
          </Col>
        </Row>

        <Row className="pb-2 mb-2 border-bottom">
          <Col>
            <InputGroup>
              <Input
                value={newValue}
                onChange={(event) => setNewValue(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleNodeValueChange()
                  }
                }}
                type="text"
                placeholder="value for node"
                innerRef={textInput}
              />

              <Button onClick={handleNodeValueChange}>
                Set active Node´s value
              </Button>
            </InputGroup>
          </Col>
          <Col>
            <InputGroup>
              <Input
                value={newStatus}
                onChange={(event) => setNewStatus(event.target.value)}
                type="text"
                placeholder="status for node"
              />
              <Button
                onClick={() => {
                  if (activeID) {
                    tree.setStatus(activeID, newStatus)
                    updateTree(tree)
                  } else {
                    singleAlert("no active Node found")
                  }
                }}
              >
                Set active Node´s status
              </Button>
            </InputGroup>
          </Col>
        </Row>

        <InputGroup>
          <Input
            name="select"
            type="select"
            value={traversalOption}
            onChange={(event) =>
              setTraversalOption(event.target.value as TraversalOption)
            }
          >
            {traversalOptions.map((option, index) => (
              <option key={index}>{option}</option>
            ))}
          </Input>
          <Button
            onClick={() => setTraversalOutput(tree.traverse(traversalOption))}
          >
            Traverse Tree
          </Button>
        </InputGroup>
        {!!traversalOutput && (
          <Container className="d-flex">
            <Button close onClick={() => setTraversalOutput("")} size="sm" />
            <p>
              <span className="fw-bold">Output:</span> {traversalOutput}
            </p>
          </Container>
        )}

        <Row>
          <Col>
            <FormGroup>
              <Label for="zoomLevel">
                Zoom Level [does not work in Firefox]
              </Label>
              <Input
                id="zoomLevel"
                name="range"
                type="range"
                min={0.1}
                max={4}
                step={0.1}
                value={zoomLevel}
                onChange={(event) => setZoomLevel(Number(event.target.value))}
              />
            </FormGroup>
          </Col>
          <Col style={{ alignSelf: "center" }}>
            <FormGroup check>
              <Input
                type="checkbox"
                checked={hideEmptyNodes}
                onChange={() => {
                  setJSX(tree.render(!hideEmptyNodes))
                  setHideEmptyNodes(!hideEmptyNodes)
                }}
              />
              <Label
                check
                onClick={() => {
                  setJSX(tree.render(!hideEmptyNodes))
                  setHideEmptyNodes(!hideEmptyNodes)
                }}
              >
                Hide empty nodes
              </Label>
            </FormGroup>
          </Col>
        </Row>
      </Container>

      <Container>
        <small>
          Hint: You can use <kbd>UP</kbd>, <kbd>RIGHT</kbd> and <kbd>LEFT</kbd>{" "}
          Arrow-Keys to navigate between Nodes
        </small>
      </Container>

      <div id="react-tree-vis" style={{ zoom: zoomLevel }}>
        <ul>{JSX}</ul>
      </div>
    </div>
  )
}
