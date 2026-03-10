
 
 export async function renderTagsMenu(tagData, selectedGroups) {
        const sortedTags = tagData.records.toSorted((a, b) => {
            const nameA = a.fields.name.toLowerCase();
            const nameB = b.fields.name.toLowerCase();

            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });
        const tagCheckboxesList = document.getElementById("tag_checkboxes_list");
        tagCheckboxesList.innerHTML = "";

        for (const tag of sortedTags) {
            const tagItemInput = document.createElement("input");
            tagItemInput.classList.add("form-check-input");
            tagItemInput.classList.add("form-check-input-tag");
            tagItemInput.type = "checkbox";
            tagItemInput.value = "";
            tagItemInput.id = tag.id;
            tagItemInput.name = tag.fields.name;

            const tagItemLabel = document.createElement("label");
            tagItemLabel.setAttribute('for', tag.id)
            tagItemLabel.innerHTML = tag.fields.name;
            tagItemLabel.setAttribute('name', tag.fields.name);
            tagItemLabel.classList.add("form-check-label");

            const tagItemDiv = document.createElement("li");
            tagItemDiv.appendChild(tagItemInput);
            tagItemDiv.appendChild(tagItemLabel);
            tagItemDiv.classList.add("form-check");
            tagCheckboxesList.appendChild(tagItemDiv);
        }
		
    }