import { Link, useNavigate } from "react-router-dom"

export default function RouteNotFound() {
  const navigate = useNavigate()
  return (
    <>
      <h2>Nothing to see here!</h2>
      <p>
        This page does not exist. You can go{" "}
        <Link to="/">back to the Overview page</Link> or{" "}
        <button
          role="link"
          className="btn btn-link btn-link-custom"
          color="light"
          onClick={() => navigate(-1)}
        >
          back to where you came from.
        </button>
      </p>
    </>
  )
}
