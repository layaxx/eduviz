import React, { useRef, useState } from "react"

import { CopyToClipboard } from "react-copy-to-clipboard"
import { toast } from "react-toastify"
import { Button, Col, Container, Input, InputGroup, Row } from "reactstrap"
import confirm from "reactstrap-confirm"

import {
  exportTreeAsString,
  loadTreeFromString,
} from "../../lib/binaryTreeHelpers"
import { NavDirection } from "../../lib/binaryTreeTypes"
import BinaryTreeNode from "./BinaryTreeNode"
import "./BinaryTree.css"
import HideEmptyNodesControl from "./config/HideEmptyNodesControl"
import TraversalControl from "./config/TraversalControl"
import ZoomControl from "./config/ZoomControl"
import LoadTreeSection from "./LoadTreeSection"

export default function BinaryTree() {
  const rootID = "0"
  const textInput = useRef<null | any>(null)
  const callback = (id: string) => {
    setActiveID(id)
    textInput.current?.focus()
  }

  const [activeID, setActiveID] = React.useState<string | undefined>(rootID)
  const [hideEmptyNodes, setHideEmptyNodes] = useState(false)
  const [tree, setTree] = React.useState(
    new BinaryTreeNode(rootID, "", callback)
  )
  const [JSX, setJSX] = React.useState(tree.render(hideEmptyNodes))
  const [newValue, setNewValue] = React.useState("")
  const [newStatus, setNewStatus] = React.useState("")
  const [zoomLevel, setZoomLevel] = useState(0)

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
    const options = {
      progress: 0,
      type: mode ?? "error",
      render: msg,
      autoClose: 3000,
    }
    if (!toast.isActive("singleToast")) {
      toast(msg, options)
    } else {
      toast.update("singleToast", options)
    }
  }

  const navigationHandler: React.KeyboardEventHandler<HTMLDivElement> = (
    event
  ) => {
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
          if (activeID === tree.id) {
            singleAlert("Cannot move UP from Root", "info")
          } else {
            tree.navigate(activeID, NavDirection.UP)
          }
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
  }

  return (
    <div
      tabIndex={0} /* required to listen for keydown events */
      style={{ outline: "none" }}
      onKeyDown={navigationHandler}
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
                    updateTree(new BinaryTreeNode(rootID, "", callback))
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
                if (!activeID) return
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
                autoFocus
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

        <TraversalControl tree={tree} />

        <Row>
          <Col>
            <ZoomControl zoomLevel={zoomLevel} setZoomLevel={setZoomLevel} />
          </Col>
          <Col>
            <HideEmptyNodesControl
              callback={() => {
                setJSX(tree.render(!hideEmptyNodes))
                setHideEmptyNodes(!hideEmptyNodes)
              }}
              hideEmptyNodes={hideEmptyNodes}
            />
          </Col>
        </Row>
      </Container>

      <Container>
        <small>
          Hint: You can use <kbd>UP</kbd>, <kbd>RIGHT</kbd> and <kbd>LEFT</kbd>{" "}
          Arrow-Keys to navigate between Nodes. <br />
          [Focus must be on one Node or the Value Text field]
        </small>
      </Container>

      <div id="react-tree-vis" style={{ zoom: Math.exp(zoomLevel) }}>
        <ul>{JSX}</ul>
      </div>
    </div>
  )
}
