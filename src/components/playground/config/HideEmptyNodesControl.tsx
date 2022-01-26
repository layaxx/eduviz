import { Col, FormGroup, Input, Label } from "reactstrap"

type Props = {
  hideEmptyNodes: boolean
  callback: () => void
}

const HideEmptyNodesControl = ({ hideEmptyNodes, callback }: Props) => (
  <Col style={{ alignSelf: "center" }}>
    <FormGroup check>
      <Input type="checkbox" checked={hideEmptyNodes} onChange={callback} />
      <Label check onClick={callback}>
        Hide empty nodes
      </Label>
    </FormGroup>
  </Col>
)

export default HideEmptyNodesControl
