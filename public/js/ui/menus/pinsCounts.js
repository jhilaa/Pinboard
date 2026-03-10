function addCount(map, key, inc = 1) {
  if (!key) return;
  map.set(key, (map.get(key) || 0) + inc);
}

export function countFromVisiblePins() {
  const visiblePins = document.querySelectorAll(".pin.display_block:not(#pin_0)");

  const tagCounts = new Map();   // tagId -> count
  const urlCounts = new Map();  // siteId -> count
  const groupCounts = new Map();  // siteId -> count
  let total = 0;

  visiblePins.forEach(pin => {
    total++;

    // tags
    const tagIds = (pin.dataset.tags || "").split(",").filter(Boolean);
    tagIds.forEach(tagId => addCount(tagCounts, tagId));

    // sites
	const siteId = pin.dataset.siteId
    addCount(urlCounts, siteId);
	
	// groups
	const groupIds = (pin.dataset.groups || "").split(",").filter(Boolean);
    groupIds.forEach(groupId => addCount(groupCounts, groupId));
  });

  return { total, tagCounts, urlCounts, groupCounts};
}

export function updateTagMenuCounts(tagCounts) {
  const labels = document.querySelectorAll("#tag_checkboxes_list label.form-check-label");

  labels.forEach(label => {
    const tagId = label.getAttribute("for");           // ex: "recXXXX"
    const baseName = label.getAttribute("name") || label.textContent; 
    const count = tagCounts.get(tagId) || 0;

    // On stocke le libellé “pur” dans name 
    if (count === 0) {
      label.classList.add("tagCount0");
      label.innerHTML = baseName;
    } else {
      label.classList.remove("tagCount0");
      label.innerHTML = `${baseName} <span class="tagCount">(${count})</span>`;
    }
  });
}
  
export function updateUrlMenuCounts(urlCounts) {
  const labels = document.querySelectorAll("#url_checkboxes_list label.form-check-label");

  labels.forEach(label => {
    const urlId = label.getAttribute("for");           // ex: "recXXXX"
    const baseName = label.getAttribute("name") || label.textContent; 
    const count = urlCounts.get(urlId) || 0;

    // On stocke le libellé “pur” dans name 
    if (count === 0) {
      label.classList.add("urlCount0");
      label.innerHTML = baseName;
    } else {
      label.classList.remove("urlCount0");
      label.innerHTML = `${baseName} <span class="urlCount">(${count})</span>`;
    }
  });
}
  
export function updateRatingMenuCounts(total) {
	document.getElementById("starCount").textContent = `(${total})`;
}

export function updateGroupMenuCounts(groupCounts) {
  const nodes = document.querySelectorAll("#group_checkboxes_list .treejs-node");
  nodes.forEach(node => {
	const groupId =node.id; 
	const label = node.querySelector(".treejs-label");     
    const baseName = label.getAttribute("label") || label.textContent; 
    const count = groupCounts.get(groupId) || 0;

    // On stocke le libellé “pur” dans name 
    if (count === 0) {
      label.classList.add("groupCount0");
      label.innerHTML = baseName;
    } else {
      label.classList.remove("groupCount0");
      label.innerHTML = `${baseName} <span class="groupCount">(${count})</span>`;
    }
  });
}