import { getTree } from "./tree-wrapper.js";


export async function renderFoldersMenu(groupData, selectedGroups) {
        function trouverFils(array, groupId) {
            let children = [];
            if (Array.isArray(array) && array.length > 0 && groupId) {
                array.forEach(record => {
                    const fields = record.fields;
                    if (fields.parent_group_id && fields.parent_group_id.length > 0) {
					if (groupId == fields.parent_group_id[0]) {
                            children.push({
                                id: record.id,
                                text: fields.name,
                                //name: "groups",
                                children: trouverFils(array, record.id),
                                checked: ((selectedGroups!= undefined && selectedGroups.length >0) ?  selectedGroups.includes(record.id) : false)
                            });
                        }
                    }
                });
            }
            return children;
        }

        try {
			if (groupData ) {
			const racine = groupData.records.filter((group) => group.fields.parent_group_id == undefined )
            let result = trouverFils(groupData.records, racine[0].id);
            // Exemple d'utilisation avec les données fournies

			const groupCheckboxesList = document.getElementById("group_checkboxes_list");
            groupCheckboxesList.innerHTML = "";
			const Tree = getTree();
			const treeElement = document.querySelector('#group_checkboxes_list');
            let tree = new Tree('#group_checkboxes_list', {
                data: result,
                closeDepth: 3,
                loaded: function () {
                    this.values = [];
                    this.disables = [];
                },
                onChange: async function () {
					treeElement.dispatchEvent(new CustomEvent('tree:change', {
						detail: {
							tree: this,
							values: this.values
						}
					}))
                }
            });

            const treejsNodes = document.querySelectorAll(".treejs-node")
            treejsNodes.forEach((treejsNode) => {
                treejsNode.setAttribute("id", treejsNode.nodeId);
                treejsNode.setAttribute("count", 0);
            })

            //stockage du label pour pouvoir le modifier
            const treejsLabels = document.querySelectorAll(".treejs-label")
            treejsLabels.forEach((treejsLabel) => {
                treejsLabel.setAttribute("label", treejsLabel.innerHTML);
            })
			}
        } catch (error) {
            console.error("Error fetching or processing data:", error);
        }
    }
