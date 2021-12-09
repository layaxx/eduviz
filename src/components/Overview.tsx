import { Link } from "react-router-dom"

export default function Overview() {
  return (
    <>
      <h2>Currently implemented Modules</h2>
      <ol>
        <li>
          Binary Trees
          <ul>
            <li>
              <Link to="/btree/theory">Theory</Link>
            </li>
            <li>
              <Link to="/playground/btree">Visual Playground</Link>
            </li>
          </ul>
        </li>
      </ol>
    </>
  )
}
