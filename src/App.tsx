import { useState } from "react"

import { Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import Aside from "./components/Aside"
import Main from "./components/Main"
import Overview from "./components/Overview"
import BinaryTree from "./components/playground/BinaryTree"
import RouteNotFound from "./components/RouteNotFound"
import BinaryTreeTheory from "./components/theory/BinaryTree"
import BinaryTreeTraversal from "./components/theory/BinaryTreeTraversal"

import "./App.scss"
import "react-toastify/dist/ReactToastify.css"

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

          <ToastContainer limit={2} />
        </div>
      </Main>
    </div>
  )
}
