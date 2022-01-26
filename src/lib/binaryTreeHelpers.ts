import BinaryTreeNode from "../components/playground/BinaryTreeNode"

export function loadTreeFromString(string: string) {
  return JSON.parse(decompressTreeString(string), reviver) as BinaryTreeNode
}

export function exportTreeAsString(tree: BinaryTreeNode) {
  return compressTreeString(JSON.stringify(tree.asArray()))
}

function compressTreeString(string: string) {
  return string
    .replaceAll('""', "")
    .replaceAll("null", "")
    .replaceAll("[,,,]", "")
}

function decompressTreeString(string: string) {
  return string
    .replaceAll(",,", ",null,")
    .replaceAll(",,", ",null,")
    .replaceAll(",]", ",null]")
}

let counter = 0

function reviver(
  _: string,
  valueParam: string | number | undefined | null | any[]
) {
  if (
    valueParam &&
    typeof valueParam === "object" &&
    typeof valueParam[Symbol.iterator] === "function"
  ) {
    const [value, status, left, right] = valueParam
    const defaultNode = {
      left: null,
      right: null,
      value: "",
      status: "",
    }
    counter++
    return {
      left: left || { ...defaultNode, id: counter + ".1" },
      right: right || { ...defaultNode, id: counter + ".2" },
      status: status || "",
      id: "" + counter,
      value: value || "",
    }
  }
  return valueParam
}
