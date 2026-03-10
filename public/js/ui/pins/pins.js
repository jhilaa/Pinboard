export function renderPins(pinData) {
	
		//** Mise à jour des étoiles
		function updateStarsDisplay(stars, old_value, new_value) {
			stars.forEach((star, index) => {
				if (index <= new_value - 1) {
					star.classList.add('bi-star-fill');
					star.classList.remove('bi-star');
				} else {
					star.classList.add('bi-star');
					star.classList.remove('bi-star-fill');
				}
			});
		}
	
	    const pinContainer = document.getElementById("pin_container");
        pinContainer.innerHTML = "";
        let pinTagsData;
        let pinGroupsData;

        for (const record of pinData.records) {
            if (record.fields.tags_name != undefined && record.fields.tags_name.length > 0) {
                pinTagsData = record.fields.tags_name.map((tag_name, index) => ({
                    tag_name: tag_name.replace(" ", "&nbsp;"),
                    tag_color: record.fields.tags_color[index],
                    tag_id: record.fields.tags_id[index]
                }));
            }
            if (record.fields.groups_name != undefined && record.fields.groups_name.length > 0) {
                console.log("-- pinGroupsData ----------------");
            }

            const pinModel = document.getElementById("pin_0");
            const clone = pinModel.cloneNode(true);

            clone.id = record.id;
            clone.querySelector(".pin_body h4").textContent = record.fields.name;
            clone.querySelector(".pin_body .description").textContent = record.fields.description;
            clone.querySelector(".pin_body .url").textContent = record.fields.url;
            clone.querySelector(".pin_body .url").href = record.fields.url;
            clone.querySelector(".pin_header img").src = record.fields.img_url;
			/*
            clone.setAttribute("rating", record.fields.rating);
            clone.setAttribute("status", record.fields.status);
            clone.setAttribute("site_id", record.fields.site_id);
            clone.setAttribute("domain_id", record.fields.domain_id);
            clone.setAttribute("groups_id", record.fields.groups_id);
            clone.setAttribute("tags_id", record.fields.tags_id);
            clone.setAttribute("site_rating", record.fields.site_rating);
			*/
            clone.querySelector(".selection_input").checked = record.fields.selected
			
			
			// stocker ce qui sert au filtre
			clone.dataset.rating = record.fields.rating ?? "0";
			clone.dataset.siteId = record.fields.site_id ?? "";
			clone.dataset.tags = (record.fields.tags_id ?? []).join(",");
			clone.dataset.groups = (record.fields.groups_id ?? []).join(",");
			clone.dataset.selected = record.fields.selected ? "1" : "0";

			// search cache (simplifie checkInputText)
			const tagsText = (record.fields.tags_name ?? []).join(" ");
			clone.dataset.search = `${record.fields.name} ${record.fields.url} ${record.fields.description} ${tagsText}`.toLowerCase();



            const pin_header = clone.querySelector(".pin_header");
            pin_header.addEventListener("click", (e) => {
                const pinElement = e.target.closest(".pin");
                const carouselItemActive = document.querySelector(".carousel-item.active");
                const carouselItem = document.querySelector(".carousel-item#" + pinElement.id);
                if (carouselItemActive !== null) {
                    carouselItemActive.classList.remove("active");
                }
                if (carouselItem !== null) {
                    carouselItem.classList.add("active");
                }
            })

            // status
            const pin_status = clone.querySelector(".pin_status")
            if (record.fields.status == undefined) {
                pin_status.classList.add("btn-green");
                pin_status.classList.remove("btn-green");
            }
            if (record.fields.status == "0" || record.fields.status == "") {
                pin_status.classList.add("btn-green");
                pin_status.classList.remove("btn-green");
            } else {
                pin_status.classList.remove("btn-green")
                pin_status.classList.add("btn-green");
            }

            pin_status.addEventListener("click", async (e) => {
                e.stopPropagation();
                const pinElement = e.target.closest(".pin");
                const previous_status = pinElement.getAttribute("status");
                let new_status;
                if (previous_status == "0") {
                    new_status = 1;
                    pinElement.setAttribute("status", "1");
                    pin_status.classList.remove("btn-green");
                    pin_status.classList.add("btn-green");
                } else {
                    new_status = 0;
                    pinElement.setAttribute("status", "0");
                    pin_status.classList.add("btn-green");
                    pin_status.classList.remove("btn-green");
                }

                const spinnerPinContainerElement = pinElement.querySelector(".spinnerPinContainer");
                spinnerPinContainerElement.style.display = "flex";
				// patch en base
                await patchData("pin",pinElement.id, {"status" : new_status.toString()});
                spinnerPinContainerElement.style.display = "none";
            })
			
			
			// selected
            const pin_selected = clone.querySelector(".selection_input")
            pin_selected.addEventListener("click", async (e) => {
                e.stopPropagation();
                const pinElement = e.target.closest(".pin");
                const spinnerPinContainerElement = pinElement.querySelector(".spinnerPinContainer");
                spinnerPinContainerElement.style.display = "flex";
				
				// patch en base
				patchData("pin", pinElement.id, {"selected" : pin_selected.checked})
                spinnerPinContainerElement.style.display = "none";
            })

            const star = clone.querySelector(".globe .bi-star-fill");
            if(record.fields.site_rating == undefined || record.fields.site_rating != 1) {
                star.classList.add("display_none");
            } else {
                star.classList.remove("display_none");
            }

			// globe
            const globe = clone.querySelector(".bi-globe");
            globe.addEventListener("click", (e) => {
                const pinElement = e.target.closest(".pin");
                const site_attribute = pinElement.getAttribute("site_id");

                if (siteInput.value == site_attribute) {
                    siteInput.value = "";
                } else {
                    siteInput.value = site_attribute;
                }
                /******************/
                const event = new Event('change', {
                    bubbles: true,  // Permet à l'événement de se propager (peut être utile dans certains cas).
                    cancelable: true // Permet d'annuler l'événement si nécessaire.
                });
                // Déclenchez l'événement sur l'élément input.
                siteInput.dispatchEvent(event);
            })


            const pin_rating_stars = clone.querySelectorAll('.pin .rating .star');
            pin_rating_stars.forEach((star, index) => {
                star.addEventListener('click', async (e) => {
                    e.stopPropagation()
                    const old_value = parseInt(clone.getAttribute('rating'));
                    let new_value = parseInt(star.getAttribute('data-value'));

                    if (old_value === 1 && new_value === 1) {
                        new_value = 0;
                    }

                    clone.setAttribute("rating", new_value);
                    updateStarsDisplay(pin_rating_stars, old_value, new_value);

                    const pinElement = e.target.closest(".pin");
                    const spinnerPinContainerElement = pinElement.querySelector(".spinnerPinContainer");
 
				    // patch en base
					console.log ("pin : " + pinElement.id)
					console.log ("rating : " + new_value) 
                    await patchData("pin",pinElement.id, {"rating" : new_value.toString()});
                    spinnerPinContainerElement.style.display = "none";

                });
            });

            updateStarsDisplay(pin_rating_stars, 0, record.fields.rating);


            const tags = clone.querySelector(".pin_body .tags");
			if (pinTagsData != undefined && pinTagsData.length > 0) {
            for (const tag of pinTagsData) {
                //
                const newSpan = document.createElement("span");
                newSpan.innerHTML = tag.tag_name;
                newSpan.style.background = tag.tag_color;
                newSpan.id = tag.tag_id
                newSpan.classList.add("tag");
                tags.appendChild(newSpan);
            }
			}

            const selected_checkbox = clone.querySelector(".pin_header .selection_input");
            selected_checkbox.addEventListener("click", (e) => {
                e.stopPropagation()
            })

            //clone.style.display = "block"; 
			pinContainer.appendChild(clone);
			clone.classList.add("display_block");
            clone.classList.remove("display_none");
        }
    }