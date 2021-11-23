import { TraversalOption } from "../../lib/binaryTreeTypes"

export default class BinaryTreeNode {
  left: BinaryTreeNode | null
  right: BinaryTreeNode | null

  isHighlighted: boolean = false
  id: string

  value: string
  callback: (id: string) => void

  status: string

  constructor(
    id: string,
    value: string = "",
    callback: (id: string) => void = console.debug,
    status: string = "",
    left: BinaryTreeNode | null = null,
    right: BinaryTreeNode | null = null
  ) {
    this.value = value
    this.id = id
    this.callback = callback
    this.status = status
    this.right = right
      ? new BinaryTreeNode(
          right.id,
          right.value,
          callback,
          right.status,
          right.left,
          right.right
        )
      : null
    this.left = left
      ? new BinaryTreeNode(
          left.id,
          left.value,
          callback,
          left.status,
          left.left,
          left.right
        )
      : null
  }

  traverse(mode: TraversalOption) {
    const leftResult: string = this.left ? this.left.traverse(mode) : ""
    const rightResult: string = this.right ? this.right.traverse(mode) : ""

    const templates = {
      [TraversalOption.PREORDER]: `${this.value} ${leftResult} ${rightResult}`,
      [TraversalOption.INORDER]: `${leftResult} ${this.value} ${rightResult}`,
      [TraversalOption.POSTORDER]: `${leftResult} ${rightResult} ${this.value}`,
    }

    return templates[mode]
  }

  setStatus(id: string, newStatus: string) {
    if (id === this.id) {
      this.status = newStatus
    } else {
      this.right?.setStatus(id, newStatus)
      this.left?.setStatus(id, newStatus)
    }
  }

  clearHighlights() {
    this.isHighlighted = false
    this.left?.clearHighlights()
    this.right?.clearHighlights()
  }

  remove(id: string, force: boolean = false): BinaryTreeNode | null {
    if (this.id === id) {
      if (force) {
        return null
      } else if (this.left === null) {
        return this.right
      } else {
        return this.left
      }
    } else {
      this.left = this.left?.remove(id, force) ?? null
      this.right = this.right?.remove(id, force) ?? null
    }
    return this
  }

  setIsHighlighted(id: string, bool: boolean) {
    if (this.id === id) {
      this.isHighlighted = bool
    } else {
      this.left?.setIsHighlighted(id, bool)
      this.right?.setIsHighlighted(id, bool)
    }
  }

  setValueOfNode(id: string, value: string) {
    if (this.id === id) {
      if (this.left === null && this.right === null) {
        this.left = new BinaryTreeNode(this.id + "l", "", this.callback)
        this.right = new BinaryTreeNode(this.id + "r", "", this.callback)
      }
      this.value = value
    } else {
      this.left?.setValueOfNode(id, value)
      this.right?.setValueOfNode(id, value)
    }
  }

  render(hideEmptyNodes: boolean = false) {
    const isEnd = this.left === null && this.right === null
    if (isEnd) {
      return (
        !hideEmptyNodes && (
          <li
            id={"node-" + this.id}
            className={`null add `}
            onClick={() => this.callback(this.id)}
          >
            <div className={this.isHighlighted ? "highlight" : ""}>null</div>
          </li>
        )
      )
    } else {
      const hasRealChildren = !(
        this.left &&
        this.left.left === null &&
        this.left.right === null &&
        this.right &&
        this.right.left === null &&
        this.right.right === null
      )
      return (
        <li key={this.id} id={"node-" + this.id}>
          <div
            className={`normal ${this.isHighlighted ? "highlight" : ""}`}
            onClick={() => this.callback(this.id)}
          >
            {this.value}
          </div>
          <small style={{ display: "block" }}>{this.status}</small>
          {(hasRealChildren || !hideEmptyNodes) && (
            <ul>
              {this.left?.render(hideEmptyNodes)}{" "}
              {this.right?.render(hideEmptyNodes)}
            </ul>
          )}
        </li>
      )
    }
  }
}
