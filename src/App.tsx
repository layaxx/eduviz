import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react"

import BinaryTree from "./components/playground/BinaryTree"
import BinaryTreeTheory from "./components/theory/BinaryTree"
import BinaryTreeTraversal from "./components/theory/BinaryTreeTraversal"

import Aside from "./components/Aside"
import Main from "./components/Main"

import "./App.scss"

export const content = {
  pg_BinaryTree: null, // this is toggled differently to allow its state to be kept
  t_binaryTreeAllgemein: <BinaryTreeTheory />,
  t_binaryTreeTraversal: <BinaryTreeTraversal />,
} as const

export default function App() {
  const [activeContent, setActiveContent] =
    useState<keyof typeof content>("pg_BinaryTree")

  const [toggled, setToggled] = useState(false)

  const handleToggleSidebar = (
    value: boolean | ((prevState: boolean) => boolean)
  ) => {
    setToggled(value)
  }
  return (
    <div className="app">
      <Aside
        toggled={toggled}
        handleToggleSidebar={handleToggleSidebar}
        activeContent={activeContent}
        setActiveContent={setActiveContent}
      />
      <Main handleToggleSidebar={handleToggleSidebar}>
        <div>
          {content[activeContent]}

          <BinaryTree hidden={activeContent !== "pg_BinaryTree"}></BinaryTree>
        </div>
      </Main>
    </div>
  )
}
