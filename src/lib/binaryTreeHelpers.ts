import BinaryTreeNode from "../components/playground/BinaryTreeNode"

export function loadTreeFromString(string: string) {
  return JSON.parse(decompressTreeString(string), reviver)
}

export function exportTreeAsString(tree: BinaryTreeNode) {
  return compressTreeString(JSON.stringify(tree, compressor))
}

function compressTreeString(string: string) {
  return string
    .replaceAll('"left"', '"l"')
    .replaceAll('"right"', '"t"')
    .replaceAll('"status"', '"s"')
    .replaceAll('"value"', '"v"')
}

function decompressTreeString(string: string) {
  return string
    .replaceAll('"l"', '"left"')
    .replaceAll('"t"', '"right"')
    .replaceAll('"s"', '"status"')
    .replaceAll('"v"', '"value"')
}

function compressor(
  key: string,
  value: string | number | undefined | null | BinaryTreeNode
) {
  const allowedKeys = ["left", "right", "status", "value", "id"]
  if (!!key && allowedKeys.indexOf(key) === -1) {
    return undefined
  }
  if ((key === "left" || key === "right") && value === null) {
    return undefined
  }
  if ((key === "status" || key === "value") && value === "") {
    return undefined
  }
  return value
}

function reviver(
  _: string,
  value: string | number | undefined | null | BinaryTreeNode
) {
  if (value && typeof value === "object") {
    const defaultNode = null
    return {
      left: value.left || defaultNode,
      right: value.right || defaultNode,
      status: value.status || "",
      id: value.id,
      value: value.value || "",
    }
  }
  return value
}
