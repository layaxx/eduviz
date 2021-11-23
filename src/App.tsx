import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from "react"
import { Button, Nav, NavItem, NavLink } from "reactstrap"

import "./App.css"
import BinaryTree from "./components/playground/BinaryTree"

export default function App() {
  const content = {
    pg_BinaryTree: null,
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
              <h1 className="h4">Title</h1>
              <h2 className="lead mb-0 ">Lorem Ipsum</h2>
            </div>
          </div>
        </div>

        <h3 className="text-muted font-weight-bold text-uppercase px-3 small pb-4 mb-0">
          Theory
        </h3>

        <Nav vertical>
          <h4 className="mx-3 ">Binary Trees:</h4>
          <Nav vertical>
            <NavItem>
              <NavLink>
                <Button
                  onClick={() => setActiveContent("t_binaryTreeAllgemein")}
                  outline
                  color="secondary"
                  block
                  active={activeContent === "t_binaryTreeAllgemein"}
                >
                  Allgemeines
                </Button>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink>
                <Button
                  onClick={() => setActiveContent("t_binaryTreeTraversal")}
                  outline
                  color="secondary"
                  block
                  active={activeContent === "t_binaryTreeTraversal"}
                >
                  Traversal
                </Button>
              </NavLink>
            </NavItem>
          </Nav>

          <h3 className="text-muted font-weight-bold text-uppercase px-3 small py-4 mb-0">
            Playground
          </h3>

          <NavItem>
            <NavLink>
              <Button
                onClick={() => setActiveContent("pg_BinaryTree")}
                outline
                color="secondary"
                block
                active={activeContent === "pg_BinaryTree"}
              >
                Binary Tree
              </Button>
            </NavLink>
          </NavItem>
        </Nav>

        <footer className="p-2 w-100 text-light bg-secondary text-center position-absolute bottom-0 start-0 ">
          open alpha. contribute on{" "}
          <a href="https://github.com/layaxx/eduviz" className="link-light">
            Github
          </a>
        </footer>
      </div>

      <div className="page-content p-5" id="content">
        {content[activeContent]}

        <BinaryTree hidden={activeContent !== "pg_BinaryTree"}></BinaryTree>
      </div>
    </div>
  )
}
