import { useState } from "react"

import BinaryTree from "./components/playground/BinaryTree"
import BinaryTreeTheory from "./components/theory/BinaryTree"
import BinaryTreeTraversal from "./components/theory/BinaryTreeTraversal"

import Aside from "./components/Aside"
import Main from "./components/Main"

import "./App.scss"
import { Route, Routes } from "react-router-dom"
import Overview from "./components/Overview"
import RouteNotFound from "./components/RouteNotFound"

export default function App() {
  const [toggled, setToggled] = useState(false)

  const handleToggleSidebar = (
    value: boolean | ((prevState: boolean) => boolean)
  ) => {
    setToggled(value)
  }

  return (
    <div className="app">
      <Aside toggled={toggled} handleToggleSidebar={handleToggleSidebar} />
      <Main handleToggleSidebar={handleToggleSidebar}>
        <div>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/btree/theory" element={<BinaryTreeTheory />} />
            <Route path="/btree/traversal" element={<BinaryTreeTraversal />} />
            <Route path="/playground/btree" element={<BinaryTree />} />
            <Route path="*" element={<RouteNotFound />} />
          </Routes>
        </div>
      </Main>
    </div>
  )
}
