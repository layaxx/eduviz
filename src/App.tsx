import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react"
import { Button } from "reactstrap"

import "./App.css"
import BinaryTree from "./components/playground/BinaryTree"

export default function App() {
  const content = {
    pg_BinaryTree: <BinaryTree />,
    t_binaryTreeAllgemein: null,
    t_binaryTreeTraversal: null,
  } as const

  const [activeContent, setActiveContent] =
    useState<keyof typeof content>("pg_BinaryTree")

  return (
    <div className="App">
      <div className="vertical-nav bg-white" id="sidebar">
        <div className="py-4 px-3 mb-4 bg-light">
          <div className="media d-flex align-items-center">
            <div className="media-body">
              <h4 className="m-0">Title</h4>
              <p className="font-weight-light text-muted mb-0">Lorem Ipsum</p>
            </div>
          </div>
        </div>

        <p className="text-gray font-weight-bold text-uppercase px-3 small pb-4 mb-0">
          Theory
        </p>

        <ul className="nav flex-column bg-white mb-0">
          <li className="nav-item">
            <Button
              onClick={() => setActiveContent("t_binaryTreeAllgemein")}
              className="nav-link text-dark font-italic bg-light"
            >
              Binary Tree
            </Button>
          </li>
          <ul>
            <li>
              <Button
                onClick={() => setActiveContent("t_binaryTreeAllgemein")}
                className="nav-link text-dark font-italic bg-light"
              >
                Allgemeines
              </Button>
            </li>
            <li>
              <Button
                onClick={() => setActiveContent("t_binaryTreeTraversal")}
                className="nav-link text-dark font-italic bg-light"
              >
                Traversal
              </Button>
            </li>
          </ul>
        </ul>

        <p className="text-gray font-weight-bold text-uppercase px-3 small py-4 mb-0">
          Playground
        </p>

        <ul className="nav flex-column bg-white mb-0">
          <li className="nav-item">
            <Button
              onClick={() => setActiveContent("pg_BinaryTree")}
              className="nav-link text-dark font-italic bg-light"
            >
              Binary Tree
            </Button>
          </li>
        </ul>
      </div>

      <div className="page-content p-5" id="content">
        {content[activeContent]}
      </div>

      {/* <footer className="bt-4 bg-white text-center">open beta</footer> */}
    </div>
  )
}
