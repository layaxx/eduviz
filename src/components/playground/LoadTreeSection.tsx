import { useState } from "react"

import { toast } from "react-toastify"
import {
  Container,
  Button,
  UncontrolledCollapse,
  Row,
  Col,
  Label,
  Input,
  InputGroup,
} from "reactstrap"

import { loadTreeFromString } from "../../lib/binaryTreeHelpers"
import { treePresets } from "../../lib/binaryTreePresets"
import { TreePreset } from "../../lib/binaryTreeTypes"
import BinaryTreeNode from "./BinaryTreeNode"

type Props = {
  updateTree: (tree: BinaryTreeNode) => void
}

export default function LoadTreeSection({ updateTree }: Props) {
  const [importString, setImportString] = useState("")
  const [preset, setPreset] = useState("")

  const handleLoadFromString = () => {
    if (importString === "") {
      toast.error("You need to paste a String first.")
    } else {
      try {
        const newTree = loadTreeFromString(importString)

        console.log(newTree)

        updateTree(newTree)
      } catch (error) {
        console.error(error)
        toast.error("Failed to Load from String")
      }
    }
  }

  const handleLoadFromPreset = () => {
    if (preset === "") {
      toast.error("Please Select a Preset first.")
    } else {
      try {
        updateTree(loadTreeFromString(preset))
      } catch (error) {
        console.error(error)
        toast.error("Failed to Load Preset")
      }
    }
  }

  return (
    <Container>
      <Container
        className="d-flex justify-content-between p-0"
        id="toggleLoadSection"
      >
        <h3>Load Tree</h3>
        <Button outline size="sm">
          Toggle
        </Button>
      </Container>
      <UncontrolledCollapse toggler="#toggleLoadSection">
        <Row>
          <Col>
            <Label for="inputStringTree">from String</Label>
            <InputGroup>
              <Input
                id="inputStringTree"
                name="tree-import"
                type="text"
                placeholder="exported tree string"
                value={importString}
                onChange={(event) => setImportString(event.target.value)}
              />
              <Button
                color="primary"
                className="d-flex"
                onClick={() => handleLoadFromString()}
              >
                Load from string
              </Button>
            </InputGroup>
          </Col>
          <Col>
            <Label for="treePresetSelect">from Preset</Label>
            <InputGroup>
              <Input
                id="treePresetSelect"
                name="select"
                type="select"
                value={preset}
                onChange={(event) => setPreset(event.target.value)}
              >
                <option value="">Select Preset</option>
                {treePresets.map((treePreset: TreePreset, index) => (
                  <option key={index} value={treePreset.string}>
                    {treePreset.name}
                  </option>
                ))}
              </Input>
              <Button color="primary" onClick={handleLoadFromPreset}>
                Load from preset
              </Button>
            </InputGroup>
          </Col>
        </Row>
      </UncontrolledCollapse>
    </Container>
  )
}
