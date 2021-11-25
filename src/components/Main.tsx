import React from "react"

type Props = {
  handleToggleSidebar: (v: boolean) => void
  children: JSX.Element
}
const Main = ({ handleToggleSidebar, children }: Props) => {
  return (
    <main>
      <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
        <img
          alt="toggle sidebar"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAMUlEQVRIie3SoREAIADDwJT9dy6KCUAAl1dVVQF9L2u07dHjJADj5KnuZEXaZ0V6wATQzQwKQvoBVgAAAABJRU5ErkJggg=="
        />
      </div>

      <article>{children}</article>

      <footer>
        <small>
          <span className="copyleft" />
          {new Date().getFullYear()}
          <br />
          <a href="https://icons8.com/icon/82749/menu">Menu icon by Icons8</a>
        </small>
      </footer>
    </main>
  )
}

export default Main
