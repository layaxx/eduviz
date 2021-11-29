import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar"
import { NavLink, useLocation } from "react-router-dom"

type Props = {
  toggled: boolean
  handleToggleSidebar: (value: boolean) => void
}

const Aside = ({ toggled, handleToggleSidebar }: Props) => {
  const location = useLocation()

  return (
    <ProSidebar
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
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
              ["/btree/theory", "/btree/traversal"].includes(location.pathname)
                ? "active"
                : ""
            }
          >
            <MenuItem active={location.pathname === "/btree/theory"}>
              <NavLink to="/btree/theory">Basics</NavLink>
            </MenuItem>
            <MenuItem active={location.pathname === "/btree/traversal"}>
              <NavLink to="/btree/traversal">Traversal</NavLink>
            </MenuItem>
          </SubMenu>
        </Menu>
        <Menu iconShape="circle">
          <h3 className="text-muted font-weight-bold text-uppercase px-3 small">
            Playground
          </h3>
          <MenuItem active={location.pathname === "/playground/btree"}>
            <NavLink to="/playground/btree">Binary Tree</NavLink>
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
}

export default Aside
