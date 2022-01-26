import { FormGroup, Label, Input } from "reactstrap"

type Props = { zoomLevel: number; setZoomLevel: (n: number) => void }

const ZoomControl = ({ zoomLevel, setZoomLevel }: Props) => (
  <FormGroup>
    <Label for="zoomLevel">Zoom Level [does not work in Firefox]</Label>
    <Input
      id="zoomLevel"
      name="range"
      type="range"
      min={-2}
      max={2}
      step={0.1}
      value={zoomLevel}
      onChange={(event) => setZoomLevel(Number(event.target.value))}
    />
  </FormGroup>
)

export default ZoomControl
