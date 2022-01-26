import BinaryTreeNode from "../components/playground/BinaryTreeNode"
import { TreeAsArray } from "./binaryTreeTypes"

export function loadTreeFromString(string: string): BinaryTreeNode {
  return JSON.parse(decompressTreeString(string), reviver)
}

export function exportTreeAsString(tree: BinaryTreeNode): string {
  return compressTreeString(JSON.stringify(tree.asArray()))
}

function compressTreeString(string: string): string {
  return string
    .replaceAll('""', "")
    .replaceAll("null", "")
    .replaceAll("[,,,]", "")
}

function decompressTreeString(string: string): string {
  return string
    .replaceAll(",,", ",null,")
    .replaceAll(",,", ",null,")
    .replaceAll(",]", ",null]")
}

let counter = 0

function reviver(
  _: string,
  valueParam: string | number | undefined | null | TreeAsArray
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
