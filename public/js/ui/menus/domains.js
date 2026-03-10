// domain.js
import { setCookie } from "../../utils/utils.js";

export async function renderDomainsMenu(domainData, selectedDomain, onDomainChange) {
  const domainRadiosList = document.getElementById("domain_radios_list");
  domainRadiosList.innerHTML = ""; // évite duplications

  const domainArray = domainData.records.map((record) => ({
    domain_id: record.id,
    domain: record.fields.name
  }));

  const sortedDomains = domainArray.sort((a, b) =>
    a.domain.localeCompare(b.domain, "fr", { sensitivity: "base" })
  );

  for (const domain of sortedDomains) {
    const domainItemDiv = document.createElement("div");
    const domainItemCheckbox = document.createElement("input");
    const domainItemLabel = document.createElement("label");

    domainItemCheckbox.classList.add("form-check-input", "form-check-input-domain");
    domainItemCheckbox.type = "radio";
    domainItemCheckbox.id = domain.domain_id;
    domainItemCheckbox.name = "domain";
    domainItemCheckbox.value = domain.domain;

    domainItemLabel.classList.add("form-check-label");
    domainItemLabel.textContent = domain.domain;

    domainItemDiv.classList.add("form-check");
    domainItemDiv.appendChild(domainItemCheckbox);
    domainItemDiv.appendChild(domainItemLabel);

    if (domain.domain_id === selectedDomain) {
      domainItemCheckbox.checked = true;
    }

    domainItemDiv.addEventListener("click", async (e) => {
      e.stopPropagation();
      domainItemCheckbox.checked = true;

      if (typeof onDomainChange === "function") {
        await onDomainChange(domain.domain_id);
      }
    });

    domainRadiosList.appendChild(domainItemDiv);
  }
  

}