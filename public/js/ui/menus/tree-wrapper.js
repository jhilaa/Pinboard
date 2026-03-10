// public/js/ui/menus/tree-wrapper.js
export function getTree() {
  const Tree = globalThis.Tree;
  if (!Tree) {
    throw new Error(
      "Tree n'est pas chargé. Vérifie que tree.min.js est inclus AVANT main.js dans le HTML."
    );
  }
  return Tree;
}