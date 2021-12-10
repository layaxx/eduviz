export enum TraversalOption {
  PREORDER = "preorder (WLR)",
  INORDER = "inorder (LWR)",
  POSTORDER = "postorder (LRW)",
}

export type TreePreset = {
  name: string
  string: string
}

export enum NavDirection {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}
