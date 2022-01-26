import { useState } from "react"

import { InputGroup, Input, Button, Container } from "reactstrap"

import { TraversalOption } from "../../../lib/binaryTreeTypes"
import BinaryTreeNode from "../BinaryTreeNode"

type Props = { tree: BinaryTreeNode }

const TraversalControl = ({ tree }: Props) => {
  const [traversalOption, setTraversalOption] = useState<TraversalOption>(
    TraversalOption.PREORDER
  )

  const [traversalOutput, setTraversalOutput] = useState("")

  const traversalOptions = Object.values(TraversalOption)

  return (
    <>
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
    </>
  )
}

export default TraversalControl
