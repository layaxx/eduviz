import React, { useRef, useState } from "react"
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
import BinaryTreeNode from "./BinaryTreeNode"
import confirm from "reactstrap-confirm"
import { CopyToClipboard } from "react-copy-to-clipboard"
import "./BinaryTree.css"
import { exportTreeAsString } from "../../lib/binaryTreeHelpers"
import LoadTreeSection from "./LoadTreeSection"
import { TraversalOption } from "../../lib/binaryTreeTypes"

type Props = {
  hidden: boolean
}

export default function BinaryTree({ hidden }: Props) {
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

  React.useEffect(() => {
    if (activeID) {
      console.debug("changed activeID to ", activeID)
      tree.clearHighlights()
      tree.setIsHighlighted(activeID, true)
      setTree(tree)
      setJSX(tree.render(hideEmptyNodes))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeID])

  if (hidden) {
    return null
  }

  return (
    <>
      <LoadTreeSection
        setTree={(tree) => {
          setJSX(tree.render(hideEmptyNodes))
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
            ref={textInput}
          ></Input>

          <Button
            onClick={() => {
              if (activeID && newValue) {
                tree.setValueOfNode(activeID, newValue)
                setTree(tree)
                setJSX(tree.render(hideEmptyNodes))
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
                setJSX(tree.render(hideEmptyNodes))
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
                setJSX(newTree.render(hideEmptyNodes))
                setActiveID(rootID)
              }
            })
          }}
        >
          reset Tree
        </Button>

        <Button
          color="danger"
          onClick={() => {
            if (!activeID) {
              return
            }
            const newTree =
              tree.remove(activeID) ?? new BinaryTreeNode(rootID, "", callback)
            setTree(newTree)
            setJSX(newTree.render(hideEmptyNodes))
            setActiveID(rootID)
          }}
        >
          remove active Node
        </Button>

        <CopyToClipboard text={exportTreeAsString(tree)}>
          <Button>Copy serialized Tree to Clipboard</Button>
        </CopyToClipboard>

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
            <Button
              close
              onClick={() => setTraversalOutput("")}
              size="sm"
            ></Button>
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
                max={10}
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
              <Label check>Hide empty nodes</Label>
            </FormGroup>
          </Col>
        </Row>
      </Container>

      <hr />

      <div id="react-tree-vis" style={{ zoom: zoomLevel }}>
        <ul>{JSX}</ul>
      </div>
    </>
  )
}
