import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar"
import { content } from "../App"

type Props = {
  toggled: boolean
  handleToggleSidebar: (value: boolean) => void
  activeContent: keyof typeof content
  setActiveContent: (value: keyof typeof content) => void
}

const Aside = ({
  toggled,
  handleToggleSidebar,
  activeContent,
  setActiveContent,
}: Props) => (
  <ProSidebar toggled={toggled} breakPoint="md" onToggle={handleToggleSidebar}>
    <SidebarHeader className="py-4 px-3">
      <h1 className="h4">Title</h1>
      <h2 className="lead mb-0 ">Lorem Ipsum</h2>
    </SidebarHeader>

    <SidebarContent>
      <Menu iconShape="circle">
        <h3 className="text-muted font-weight-bold text-uppercase px-3 small">
          Theory
        </h3>
        <SubMenu
          title={"Binary Tree"}
          className={
            ["t_binaryTreeAllgemein", "t_binaryTreeTraversal"].indexOf(
              activeContent
            ) !== -1
              ? "active"
              : ""
          }
        >
          <MenuItem
            onClick={() => setActiveContent("t_binaryTreeAllgemein")}
            active={activeContent === "t_binaryTreeAllgemein"}
          >
            Basics
          </MenuItem>
          <MenuItem
            onClick={() => setActiveContent("t_binaryTreeTraversal")}
            active={activeContent === "t_binaryTreeTraversal"}
          >
            Traversal
          </MenuItem>
        </SubMenu>
      </Menu>
      <Menu iconShape="circle">
        <h3 className="text-muted font-weight-bold text-uppercase px-3 small">
          Playground
        </h3>
        <MenuItem
          onClick={() => setActiveContent("pg_BinaryTree")}
          active={activeContent === "pg_BinaryTree"}
        >
          Binary Tree
        </MenuItem>
      </Menu>
    </SidebarContent>

    <SidebarFooter>
      <footer className="p-2 w-100 text-light bg-secondary text-center position-absolute bottom-0 start-0 ">
        open alpha. contribute on{" "}
        <a href="https://github.com/layaxx/eduviz" className="link-light">
          Github
        </a>
      </footer>
    </SidebarFooter>
  </ProSidebar>
)

export default Aside
