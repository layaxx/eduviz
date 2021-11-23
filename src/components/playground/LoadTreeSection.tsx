import { useState } from "react"
import {
  Container,
  Button,
  UncontrolledCollapse,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
} from "reactstrap"
import { loadTreeFromString } from "../../lib/binaryTreeHelpers"
import { treePresets } from "../../lib/binaryTreePresets"
import { TreePreset } from "../../lib/binaryTreeTypes"
import BinaryTreeNode from "./BinaryTreeNode"

export default function LoadTreeSection({
  setTree,
  callback,
}: {
  setTree: (tree: BinaryTreeNode) => void
  callback: any
}) {
  const [importString, setImportString] = useState("")
  const [preset, setPreset] = useState("")

  const handleLoadFromString = () => {
    if (importString === "") {
      alert("You need to paste a String first.")
    } else {
      try {
        const { id, value, status, left, right } =
          loadTreeFromString(importString)
        setTree(new BinaryTreeNode(id, value, callback, status, left, right))
      } catch (error) {
        console.error(error)
        alert("Failed to Load from String")
      }
    }
  }

  const handleLoadFromPreset = () => {
    if (preset === "") {
      alert("Please Select a Preset first.")
    } else {
      try {
        const { id, value, status, left, right } = loadTreeFromString(preset)
        setTree(new BinaryTreeNode(id, value, callback, status, left, right))
      } catch (error) {
        console.error(error)
        alert("Failed to Load Preset")
      }
    }
  }

  return (
    <Container>
      <Container className="d-flex justify-content-between p-0">
        <h2>Load Tree</h2>
        <Button outline id="toggleLoadSection" size="sm">
          Toggle
        </Button>
      </Container>
      <UncontrolledCollapse toggler="#toggleLoadSection">
        <Row>
          <Col>
            <FormGroup>
              <Label for="inputStringTree">Load Tree from String</Label>
              <Input
                id="inputStringTree"
                name="text"
                type="textarea"
                value={importString}
                onChange={(event) => setImportString(event.target.value)}
              />
              <Button color="primary" onClick={() => handleLoadFromString()}>
                Load from string
              </Button>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="treePresetSelect">Load Tree from Preset</Label>
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
            </FormGroup>
          </Col>
        </Row>
      </UncontrolledCollapse>
    </Container>
  )
}
