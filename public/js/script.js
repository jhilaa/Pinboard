document.addEventListener("DOMContentLoaded", async function () {
	const headers = new Headers({
       
    });

    //** on floute l'arrière-plan pendant les requêtes
    const spinnerContainer = document.getElementById("spinnerContainer"); // Define spinnerContainer here
    spinnerContainer.style.display = "block";

    const domainRadiosList = document.getElementById("domain_radios_list");
    //const domainInput = document.getElementById("domain-input");
    const domainLinkToggle = document.getElementById('domain_link_toggle');
    const groupCheckboxesList = document.getElementById("group_checkboxes_list");
    const pinContainer = document.getElementById("pin_container");
    const ratingOperatorInput = document.getElementById("rating-operator");
    const ratingValueInput = document.querySelector("#sidebar .rating");
    const textInput = document.getElementById("text-input");
    const siteInput = document.getElementById("site-input");
    const tagCheckboxesContainer = document.getElementById("tag_checkboxes_container");
    const urlCheckboxesContainer = document.getElementById("url_checkboxes_container");

    function setCookie(cookieName, cookieValue) {
        const d = new Date();
        const expirationDays = 50;
        d.setTime(d.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
        //document.cookie = "domain=value; domain=localhost; path=/";
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7);
        //document.cookie = cookieName+"="+cookieValue+"; expires=Fri, 31 Dec 9999 23:59:59 GMT; Path=/";
		console.log("cookieName :" +cookieName);
		console.log("cookieValue :" +cookieValue);
        document.cookie = cookieName + "=" + cookieValue + "; Path=/";
		alert(document.cookie)
    }

    function getCookie(cookieName) {
        let name = cookieName + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    //** click sur les étoiles
    async function updateRating(pinId, rating) {
        let method = "PATCH";
        let postData = {
            "fields": {
                "rating": rating.toString()
            }
        }
        try {
            const response = await fetch("https://api.airtable.com/v0/app7zNJoX11DY99UA/Pins/" + pinId, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(postData)
            });
            const responseData = await response.json()
            console.log("-- responseData---------")
            console.log(responseData)
        } catch (error) {
            console.error("Error making POST request:", error);
        }
    }

    async function updateStatus(pinId, status) {
        let method = "PATCH";
        let postData = {
            "fields": {
                "status": status.toString()
            }
        }
        try {
            const response = await fetch("https://api.airtable.com/v0/app7zNJoX11DY99UA/Pins/" + pinId, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(postData)
            });
            const responseData = await response.json()
            console.log("-- responseData 2 ------------")
            console.log(responseData)
        } catch (error) {
            console.error("Error making POST request:", error);
        }
    }

    async function updateSelected(pinId, selected) {
        console.log("selected ---------------");
        console.log(pinId);
        console.log(selected);
        let method = "PATCH";
        let postData = {
            "fields": {
                "selected": selected
            }
        }
        try {
            const response = await fetch("https://api.airtable.com/v0/app7zNJoX11DY99UA/Pins/" + pinId, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(postData)
            });
            const responseData = await response.json()
            console.log("-- responseData 3 ------------")
            console.log(responseData)
        } catch (error) {
            console.error("Error making POST request:", error);
        }
    }

    async function updateSiteRating(siteId, rating) {
        let postData = {
            "fields": {
                "site_rating": rating.toString()
            }
        }
        try {
            const response = await fetch("https://api.airtable.com/v0/app7zNJoX11DY99UA/Sites/" + siteId, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(postData)
            });
            const responseData = await response.json()
            console.log("-- responseData 3 ------------")
            console.log(responseData)
        } catch (error) {
            console.error("Error making POST request:", error);
        }
    }

    /*
    function triggerDomainInputChangeEvent() {
        const event = new Event('change', {
            bubbles: true,  // Permet à l'événement de se propager (peut être utile dans certains cas).
            cancelable: true // Permet d'annuler l'événement si nécessaire.
        });
        // Déclenchez l'événement sur l'élément input.
        domainInput.dispatchEvent(event);

    }*/


    //** Création des tuiles
    function createPins(pinData) {
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
            clone.setAttribute("rating", record.fields.rating);
            clone.setAttribute("status", record.fields.status);
            clone.setAttribute("site_id", record.fields.site_id);
            clone.setAttribute("domain_id", record.fields.domain_id);
            clone.setAttribute("groups_id", record.fields.groups_id);
            clone.setAttribute("tags_id", record.fields.tags_id);
            clone.setAttribute("site_rating", record.fields.site_rating);
            clone.querySelector(".selection_input").checked = record.fields.selected


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
                await updateStatus(pinElement.id, new_status);
                spinnerPinContainerElement.style.display = "none";
            })

            const pin_selected = clone.querySelector(".selection_input")
            pin_selected.addEventListener("click", async (e) => {
                e.stopPropagation();
                const pinElement = e.target.closest(".pin");
                const spinnerPinContainerElement = pinElement.querySelector(".spinnerPinContainer");
                spinnerPinContainerElement.style.display = "flex";
                await updateSelected(pinElement.id, pin_selected.checked);
                spinnerPinContainerElement.style.display = "none";
            })

            const star = clone.querySelector(".globe .bi-star-fill");
            if(record.fields.site_rating == undefined || record.fields.site_rating != 1) {
                star.classList.add("display_none");
            } else {
                star.classList.remove("display_none");
            }


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

                    //const spinnerPinContainerElement = e.target.closest(".spinnerPinContainer");
                    const pinElement = e.target.closest(".pin");
                    const spinnerPinContainerElement = pinElement.querySelector(".spinnerPinContainer");
                    spinnerPinContainerElement.style.display = "flex";
                    await updateRating(pinElement.id, new_value);
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

            clone.style.display = "block";
            pinContainer.appendChild(clone);
        }
    }

    //** Création des slides la modal
    function createSlide(record) {
        const modalCarouselItem = document.createElement("div");
        modalCarouselItem.classList.add("carousel-item");
        modalCarouselItem.id = record.id;

        const modalDivText = document.createElement("div");
        modalDivText.classList.add("text-center");

        const modalDivTitleBlock = document.createElement("div");
        modalDivTitleBlock.classList.add("d-flex", "flex-row", "justify-content-center");

        const modalDivTitle = document.createElement("p");
        modalDivTitle.classList.add("title");
        modalDivTitle.textContent = record.fields.name;

        const modalDivRating = document.createElement("div");
        modalDivRating.classList.add("d-flex", "flex-row", "ml-2");

        for (let i = 1; i <= 4; i++) {
            const star = document.createElement("p");
            star.classList.add("bi", "bi-star", "star")
            if (i == 4) {
                star.classList.add("gold");
            }
            if (record.fields.rating >= i) {
                star.classList.add("bi-star-fill");
                star.classList.remove("bi-star");
            }
            modalDivRating.appendChild(star)
        }

        const modal_rating_stars = modalDivRating.querySelectorAll('bi-star');
        updateStarsDisplay(modal_rating_stars, 0, record.fields.rating);

        const modalDivImg = document.createElement("img");
        modalDivImg.classList.add("carousel-img");
        modalDivImg.src = record.fields.img_url

        const ModalDivDescription = document.createElement("p");
        ModalDivDescription.classList.add("description");
        ModalDivDescription.textContent = record.fields.description;

        modalDivTitleBlock.appendChild(modalDivTitle);
        modalDivTitleBlock.appendChild(modalDivRating);

        modalDivText.appendChild(modalDivTitleBlock);
        modalDivText.appendChild(modalDivImg);
        modalDivText.appendChild(ModalDivDescription);
        modalCarouselItem.appendChild(modalDivText)
        return modalCarouselItem;
    }

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

    //** PIN DATA ******************************
    async function getPinData(domainId) {
        try {
            const apiUrl = `https://pinboard-hqnx.onrender.com/api/domain/` + domainId + `/pins`;

            const response = await fetch(apiUrl, {headers});
            //const response = await fetch("https://pinboard-hqnx.onrender.com/api/pins", {headers});
            if (!response.ok) {
                throw new Error(`Failed to fetch data. Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching or processing data:", error);
        }
    }

    function getDataFromPin(pinObject) {
        return {
            id: pinObject.id,
            fields: {
                name: pinObject.querySelector(".name").textContent,
                description: pinObject.querySelector(".description").textContent,
                img_url: pinObject.querySelector(".pin_image").src,
                rating: pinObject.getAttribute('rating'),
                status: pinObject.getAttribute('status'),
                selected: pinObject.querySelector('.selection_input').checked,
                tags: []
            }

        }
    }

    //** TAG DATA ******************************
    async function getTagData(domain) {
        try {
            const apiUrl = `https://pinboard-hqnx.onrender.com/api/domain/` + domain + `/tags`;

            const response = await fetch(apiUrl, {headers});
            if (!response.ok) {
                throw new Error(`Failed to fetch data. Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
            //grid.init(data);
        } catch (error) {
            console.error("Error fetching or processing data:", error);
        }
    }

    //** GROUP DATA ******************************
    async function getGroupData(domain) {
        try {
            //const apiUrl = `https://pinboard-hqnx.onrender.com/api/domain/`+domain+`/groups`;
            const apiUrl = `https://pinboard-hqnx.onrender.com/api/domain/` + domain + `/groups`;

            const response = await fetch(apiUrl, {headers});
            if (!response.ok) {
                throw new Error(`Failed to fetch data. Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
            //grid.init(data);
        } catch (error) {
            console.error("Error fetching or processing data:", error);
        }
    }

    //** DOMAIN DATA ******************************
    async function getDomainsData() {
        try {
            const apiUrl = `https://pinboard-hqnx.onrender.com/api/domain/all`;
            const response = await fetch(apiUrl, {headers});
            if (!response.ok) {
                throw new Error(`Failed to fetch data. Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
            //grid.init(data);
        } catch (error) {
            console.error("Error fetching or processing data:", error);
        }
    }

    //** URL DATA ******************************
    async function getUrlData(domain) {
        try {
            const apiUrl = `https://pinboard-hqnx.onrender.com/api/domain/` + domain + `/sites`;
            const response = await fetch(apiUrl, {headers});
            if (!response.ok) {
                throw new Error(`Failed to fetch data. Status: ${response.status}`);
            }
            const data = await response.json();
            return data;
            //grid.init(data);
        } catch (error) {
            console.error("Error fetching or processing data:", error);
        }
    }

    //** FIN DATA **********************

    async function createTagCheckboxes(tagData, domain) {
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
            //tagItemLabel.innerHTML = tag.fields.name;
            tagItemLabel.setAttribute('name', tag.fields.name);
            tagItemLabel.classList.add("form-check-label");

            const tagItemDiv = document.createElement("li");
            tagItemDiv.appendChild(tagItemInput);
            tagItemDiv.appendChild(tagItemLabel);
            tagItemDiv.classList.add("form-check");
            tagCheckboxesList.appendChild(tagItemDiv);
        }
    }

    async function createDomainRadios(domainData, domainCookie) {
        const domainArray = domainData.records.map((record) => {
            return {domain_id:record.id, domain:record.fields.name}
        })
        const sortedDomains = domainArray.sort((a, b) => {
            const nameA = a.domain.toLowerCase();
            const nameB = b.domain.toLowerCase();

            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });

        for (const domain of sortedDomains) {
            const domainItemDiv = document.createElement("div");
            const domainItemCheckbox = document.createElement("input");
            const domainItemLabel = document.createElement("label");
            domainItemCheckbox.classList.add("form-check-input");
            domainItemCheckbox.classList.add("form-check-input-domain");
            domainItemCheckbox.type = "radio";
            domainItemCheckbox.id = domain.domain_id;
            domainItemCheckbox.name = "domain";
            domainItemCheckbox.value = domain.domain;

            domainItemDiv.addEventListener('click', (e) => {
                e.stopPropagation();
                const domainCheckbox = document.getElementById(domain.domain_id) ;
                    domainCheckbox.checked = true
                    setCookie("selectedDomain", domainCheckbox.id);
                    handleDomainChoice(domainCheckbox.id)
            });

            domainItemLabel.setAttribute('for', domain.domain)
            domainItemLabel.setAttribute('name', domain.domain)
            domainItemLabel.innerHTML = domain.domain;
            domainItemLabel.classList.add("form-check-label");

            domainItemDiv.appendChild(domainItemCheckbox);
            domainItemDiv.appendChild(domainItemLabel);
            domainItemDiv.classList.add("form-check");
            domainRadiosList.appendChild(domainItemDiv);
			
			if (domain.domain_id == domainCookie) {
                domainItemCheckbox.checked = true;
				handleDomainChoice(domainCookie);
            }
            
        }
    }

    async function createUrlCheckboxes(urlData) {
        const urlArray = urlData.records.map((record) => {
            return {id: record.id, url: record.fields.site, rating: record.fields.site_rating};
        })

        function comparerUrl(a, b) {
            if (a.url < b.url) return -1;
            if (a.url > b.url) return 1;
            return 0;
        }

        const sortedUrls = new Set(urlArray.sort(comparerUrl));
        const urlCheckboxesList = document.getElementById("url_checkboxes_list");
        urlCheckboxesList.innerHTML = "";

        for (const url of sortedUrls) {
            const urlItemInput = document.createElement("input");
            urlItemInput.classList.add("form-check-input");
            urlItemInput.classList.add("form-check-input-url");
            urlItemInput.type = "checkbox";
            //urlItemInput.id = url.id;
            //urlItemInput.name = url.url;
            //urlItemInput.value = url.url;

            const urlItemLabel = document.createElement("label");
            urlItemLabel.setAttribute('for', url.url);
            urlItemLabel.setAttribute('name', url.url);
            urlItemLabel.classList.add("form-check-label");
            urlItemLabel.textContent = url.url;

            const urlCount = document.createElement("span");
            urlCount.classList.add("urlCount");

            const urlItemFavorite = document.createElement("span");
            const urlItemFavoriteClass = (url.rating == 1 ? "bi-star-fill" : "bi-dot")
            urlItemFavorite.classList.add("url-favorite", "dot", "bi", urlItemFavoriteClass);
            //urlItemFavorite.id = url.id;
            urlItemFavorite.setAttribute("rating", url.rating);
            urlItemFavorite.addEventListener("click", (e) => {
                console.log("test test ------------------")
                console.log(e.target.classList)
                const newRating = (e.target.getAttribute("rating")==1 ? 0 : 1);
                e.target.setAttribute("rating", newRating)
                toggleClass(e.target, "bi-star-fill", "bi-dot")
                // updte en base
                updateSiteRating(url.id, newRating)
            })

            const urlItemDiv = document.createElement("li")
            urlItemDiv.id = url.id;
            urlItemDiv.appendChild(urlItemInput);
            urlItemDiv.appendChild(urlItemFavorite);
            urlItemDiv.appendChild(urlItemLabel);
            urlItemDiv.appendChild(urlCount);
            urlItemDiv.classList.add("form-check");
            urlCheckboxesList.appendChild(urlItemDiv);
        }
    }

    function createGroupTree(groupData, selectedGroups) {

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

            groupCheckboxesList.innerHTML = "";
            tree = new Tree('#group_checkboxes_list', {
                data: result,
                closeDepth: 3,
                loaded: function () {
                    this.values = [];
                    this.disables = [];
                },
                onChange: async function () {

                    //await filterPinsAnd();
                    await filterPins();
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

    async function createModalSlides() {
        const visiblePins = document.querySelectorAll('.pin.display_block');
        const visiblePinsTagsArray = [...visiblePins];

        const modalContainer = document.getElementById("carousel-inner");

        let records = visiblePinsTagsArray.map(pin => {
            return getDataFromPin(pin);
        })

        modalContainer.innerHTML = "";
        for (const record of records) {
            if (record != undefined && record.fields.name != undefined) {
                const newSlide = createSlide(record)
                modalContainer.appendChild(newSlide);
            }
        }
    }

    async function handleDomainChoice(domainId) {
        if (domainId != "" && domainId != undefined) {
            spinnerContainer.style.display = "block";
            Promise.all([getPinData(domainId), getTagData(domainId), getGroupData(domainId), getUrlData(domainId)])
                .then(async (results) => {
                    try {
                        // Handle the results of both promises
                        const [pinData, tagData, groupData, urlData] = results; // Corrected variable names
                        // Handle tags Data
                        await createTagCheckboxes(tagData);
                        await createUrlCheckboxes(urlData);
                        await createGroupTree(groupData)
                        // Create pin and modal
                        await createPins(pinData);
                        // await createModalSlides();
                        await filterPins();
                        console.log("Data loaded successfully.");

                    } catch (error) {
                        console.error("Error fetching or processing data:", error);
                    } finally {
                        spinnerContainer.style.display = "none";
						console.log("setCookie selectedDomain = "+domainId);
						setCookie("selectedDomain", domainId); //,30)
                    }
                })
                .then(() => {
					console.log("setCookie selectedDomain = "+domainId)
                    setCookie("selectedDomain", domainId); //,30)
                })
                .then(() => {
                    const clickEvent = new Event('click', {
                        bubbles: true,  // Permet à l'événement de se propager (peut être utile dans certains cas).
                        cancelable: true // Permet d'annuler l'événement si nécessaire.
                    });
                    domainLinkToggle.dispatchEvent(clickEvent);
                })
        } else {
            const clickEvent = new Event('click', {
                bubbles: true,  // Permet à l'événement de se propager (peut être utile dans certains cas).
                cancelable: true // Permet d'annuler l'événement si nécessaire.
            });
            domainLinkToggle.dispatchEvent(clickEvent);
			console.log("setCookie selectedDomain = null")
            setCookie("selectedDomain", "")
        }
    }

    function toggleClass(element, class1, class2) {
        if (element.classList.contains(class1)) {
            element.classList.remove(class1);
            element.classList.add(class2);
        } else if (element.classList.contains(class2)) {
            element.classList.remove(class2);
            element.classList.add(class1);
        }

    }


//** INITIALISATION ************************
    //Promise.all([getPinData(), getTagData()])
    //Promise.all([getPinData(), getTagData(), getDomainsData()])
    const domainCookie = getCookie("selectedDomain");
    getDomainsData()
        .then(async (results) => {
            try {
                // Handle the results of both promises
                //const [pinData, tagData, domainData] = results; // Corrected variable names
                const domainData = results; // Corrected variable names
                await createDomainRadios(domainData, domainCookie);
                console.log("Data loaded successfully.");

            } catch (error) {
                console.error("Error fetching or processing data:", error);
            } finally {
                spinnerContainer.style.display = "none";
            }
        })
        .then(() => {
       /*     domainInput.addEventListener("click",
                async (e) => {
                    const domainId = e.target.id;
                    await handleDomainChoice(domainId)
                }
            )
        */
            // événement sur le changement du filtre sur l'url
            siteInput.addEventListener("change",
                async () => {
                    await filterPins();
                }
            )
            // Get all checked checkboxes
            //document.getElementById("checkboxes_container").addEventListener("change", filterPinsOr);
            tagCheckboxesContainer.addEventListener("change",
                async () => {
                    //await filterPinsAnd();
                    await filterPins();
                });

            urlCheckboxesContainer.addEventListener("change",
                async () => {
                    //await filterPinsAnd();
                    await filterPins();
                });

            textInput.addEventListener("change",
                async () => {
                    //await filterPinsAnd();
                    await filterPins();
                }
            )

        })
        /*
        .then(() => {
            triggerDomainInputChangeEvent()
        })
         */
        .catch((error) => {
            // Handle any errors that occurred in any of the promises
            console.error("An error occurred:", error);
        });

//** FILTRE *****************************/
    function getArraysIntersection(array1, array2) {
        const set1 = new Set(array1);
        const set2 = new Set(array2);
        const finalSet = [...set1].filter(element => set2.has(element));
        // on renvoie un set qui est l'intersection des 2 tableaux de départ
        return finalSet;
    }

    function checkPinTagsIdInSelectedTags(pin) {
        const tags = Array.from(pin.querySelectorAll(".tag"))
        // les tags de la fiche
        const tagsId = tags.map(tag => {
            return tag.id
        })

        const checkedCheckboxes = Array.from(document.querySelectorAll(".form-check-input-tag[type=checkbox]:checked"));
        const selectedTags = [];
        checkedCheckboxes.forEach(function (checkbox) {
                // les tags sélectionnés
                selectedTags.push(checkbox.id);
            }
        );

        const tagsArraysIntersection = getArraysIntersection(tagsId, selectedTags)
        // on test si on a autant d'élements dans la liste des éléments choisis
        // que dans l'intersection entre les éléments choisis et les tags de la fiche
        // (la fiche doit contenir au moins tous les tag sélectionnés)
        return (tagsArraysIntersection.length == selectedTags.length);
    }

    function checkPinUrlIdInSelectedUrls(pin) {
        const siteId = pin.getAttribute("site_id")
        const checkedCheckboxes = Array.from(document.querySelectorAll(".form-check-input-url[type=checkbox]:checked"));
        const checkedCheckboxesValues = checkedCheckboxes.map((e) => {
            return e.parentElement.id
        })
        return checkedCheckboxesValues.length==0 || checkedCheckboxesValues.includes(siteId)
    }

    function checkPinRating(pin) {
        const pinRating = parseInt(pin.getAttribute("rating"))
        const ratingOperatorValue = ratingOperatorInput.value;
        const ratingValue = ratingValueInput.getAttribute("filter_value");

        if (ratingOperatorValue == 1) {
            return (pinRating > ratingValue)
        }
        if (ratingOperatorValue == 2) {
            return (pinRating >= ratingValue)
        }
        if (ratingOperatorValue == 3) {
            return (pinRating == ratingValue)
        }
        if (ratingOperatorValue == 4) {
            return (pinRating <= ratingValue)
        }
        if (ratingOperatorValue == 5) {
            return (pinRating < ratingValue)
        }
    }

    function checkInputText(pin) {
        const textInputValue = textInput.value;
        //
        const name = pin.querySelector(".name").textContent;
        const url = pin.querySelector(".url").textContent;
        const description = pin.querySelector(".description").textContent;
        let tagsLabel = "";
		if (pin.querySelector(".tag") != undefined && pin.querySelector(".tag") != null) {
        const tags = Array.from(pin.querySelectorAll(".tag"))
        if (tags != undefined && tags.length > 0) {
		tags.forEach((tag) => {
            tagsLabel+=tag.name+";";
        })
		}}
        const concatLabels = (name.concat(url, description, tagsLabel)).toLowerCase();

        if (textInputValue == "" || textInputValue == undefined || concatLabels == "") {
            return true
        }
        if (concatLabels.includes(textInputValue.toLowerCase())) {
            return true;
        }
        return false;
    }

    function checkInputSiteText(pin) {
        const siteInputValue = siteInput.value;
        if (siteInputValue != "") {
            pin.querySelector(".funnel").classList.add("bi-funnel-fill");
            pin.querySelector(".funnel").classList.remove("bi-funnel");
        } else {
            pin.querySelector(".funnel").classList.remove("bi-funnel-fill");
            pin.querySelector(".funnel").classList.add("bi-funnel");
        }
        return (siteInputValue == "" || pin.getAttribute("site") == siteInputValue)
    }

    //TODO gérer le multi select (cf tags)
    function checkPinGroupsIdInSelectedGroups(pin) {
        const treeCheckedElementNodeList = document.querySelectorAll(".treejs-node__checked");
        const treeCheckedElement = Array.from(treeCheckedElementNodeList);
        const selectedGroupsId = treeCheckedElement.map(e => {
            return e.nodeId
        });
        const pinGroupsAttribute = pin.getAttribute("groups_id");

        if (selectedGroupsId.length != 0 && pinGroupsAttribute != undefined) {
            const pinGroupsAttributeArray = pinGroupsAttribute.split(",");
            return selectedGroupsId.some(groupId => pinGroupsAttributeArray.includes(groupId))
        }
        return true
    }

    function checkPinSelected(pin) {
        const pinSelectedCheckbox = pin.querySelector(".pin_header .pin_selection .selection_input");
        const filterSelectedCheckbox = document.querySelector(".checkbox_container.selected");
        if (filterSelectedCheckbox == undefined) {
            return true
        } else if (filterSelectedCheckbox.id == "checkbox_on") {
            return pinSelectedCheckbox.checked
        } else if (filterSelectedCheckbox.id == "checkbox_off") {
            return !pinSelectedCheckbox.checked
        } else {
            return true;
        }
    }

    async function filterPins() {
        // les fiches
        const pins = Array.from(document.querySelectorAll(".pin:not(#pin_0)"));
        // Parcours des éléments .pin et vérifiez s'ils correspondent aux critères sélectionnés
        pins.forEach(function (pin) {
            const ratingTest = checkPinRating(pin);
            const tagsTest = checkPinTagsIdInSelectedTags(pin)
            const urlsTest = checkPinUrlIdInSelectedUrls(pin)
            const inputTextTest = checkInputText(pin);
            const inputSiteTextTest = checkInputSiteText(pin);
            const groupsTest = checkPinGroupsIdInSelectedGroups(pin)
            const selectedTest = checkPinSelected(pin)

            if (ratingTest && tagsTest && urlsTest && inputTextTest && inputSiteTextTest && groupsTest && selectedTest) {
                //pin.style.display = "block";
                pin.classList.add("display_block");
                pin.classList.remove("display_none");
            } else {
                //pin.style.display = "none";
                pin.classList.add("display_none");
                pin.classList.remove("display_block");
            }

        });

        //mise à jour du nombre de fiches sur les tags
        await countPinsByTag()
        await countPinsByUrl()
        await countPins();
        await countPinsByGroup();
        // await createModalSlides();
    }

    function countPins() {
        const visiblePins = document.querySelectorAll('.pin.display_block');
        const visiblePinsTagsArray = [...visiblePins];

        const starCountElement = document.getElementById("starCount");
        starCountElement.textContent = "(" + visiblePinsTagsArray.length + ")";
    }

    function countPinsByGroup() {
        const visiblePins = document.querySelectorAll('.pin.display_block');
        let visiblePinsGroupsId = [];
        visiblePins.forEach(pin => {
            const pinGroupAttribute = pin.getAttribute("groups_id");
            if (pinGroupAttribute != undefined && pinGroupAttribute != "") {
                const pinGroupIds = pinGroupAttribute.split(",");
                visiblePinsGroupsId = visiblePinsGroupsId.concat(pinGroupIds);
            }
        });
        //
        const visiblePinsGroupsCount = visiblePinsGroupsId.reduce((acc, id) => {
            if (!acc[id]) {
                acc[id] = 1; // Initialisez le compteur à 1 si c'est la première occurrence
            } else {
                acc[id]++; // Incrémentez le compteur si le nom existe déjà
            }
            return acc;
        }, {});
        //
        const visiblePinsGroupsCountById = Object.entries(visiblePinsGroupsCount).map(([id, count]) => ({
            id,
            count
        }));

        //mise à jour des libelles des feuilles
        let treeJsNodes = document.querySelectorAll('.treejs-node');
        if (treeJsNodes != undefined) {
            if (treeJsNodes.length > 0) {
                treeJsNodes.forEach((treeJsNode) => {
                        const children = treeJsNode.querySelector(".treejs-node");
                        if (children == undefined) { // pas d'enfant, c'est donc une feuille
                            //const nodeId = treeJsNode.nodeId
                            const nodeId = treeJsNode.getAttribute("id");
                            const treeJsLabel = treeJsNode.querySelector(".treejs-label");
                            const treeJsLabelAttribute = treeJsLabel.getAttribute("label");
                            let count = 0;
                            visiblePinsGroupsCountById.forEach((group) => {
                                if (group.id == nodeId) {
                                    count = group.count.toString();
                                    return;
                                }
                            })
                            treeJsLabel.innerHTML = treeJsLabelAttribute + " (" + count + ")";
                            treeJsNode.setAttribute("count", count);

                            if (count == 0) {
                                treeJsLabel.classList.add("groupCount0");
                            } else {
                                treeJsLabel.classList.remove("groupCount0");
                            }
                            return;
                        }
                    }
                )
            }
        }

        // groupes
        let treeJsNodesGroups = document.querySelectorAll(".treejs-nodes");
        if (treeJsNodesGroups != undefined) {
            if (treeJsNodesGroups.length > 0) {
                treeJsNodesGroups.forEach((treeJsNode) => {
                        const treeJsNodes = treeJsNode.querySelectorAll(".treejs-node");
                        let filteredIds = [];
                        if (treeJsNodes != undefined) {
                            if (treeJsNodes.length > 0) {
                                treeJsNodes.forEach((node) => {
                                    filteredIds.push(node.getAttribute("id"));
                                })
                            }
                        }
                        const querySelectorFilter = filteredIds.map(id => '.pin[groups="' + id + '"]').join(', ');
                        const filteredPins = document.querySelectorAll(querySelectorFilter + '.display_block')
                        const count = filteredPins.length;

                        const parentNode = treeJsNode.closest(".treejs-node")
                        if (parentNode != undefined) {
                            const treeJsLabel = parentNode.querySelector(".treejs-label");
                            if (treeJsLabel != undefined) {
                                treeJsLabel.textContent = treeJsLabel.getAttribute("label") + " (" + count + ")";
                                if (count == 0) {
                                    treeJsLabel.classList.add("groupCount0");
                                } else {
                                    treeJsLabel.classList.remove("groupCount0");
                                }
                            }
                        }
                    }
                )
            }
        }
    }

    function countPinsByTag() {
        //--
        const visiblePinsTags = document.querySelectorAll('.pin.display_block .tag');
        const visiblePinsTagsArray = [...visiblePinsTags];
        const visiblePinsTagsIds = visiblePinsTagsArray.map((tag) => {
            return tag.id
        });

        // pour les tags
        const visiblePinsTagsCount = visiblePinsTagsIds.reduce((acc, id) => {
            //const id = objet.id;
            if (!acc[id]) {
                acc[id] = 1; // Initialisez le compteur à 1 si c'est la première occurrence
            } else {
                acc[id]++; // Incrémentez le compteur si le nom existe déjà
            }
            return acc;
        }, {});

        const visiblePinsTagsCountById = Object.entries(visiblePinsTagsCount).map(([id, count]) => ({id, count}));
        //
        //const tagCheckboxesLabel = document.getElementsByClassName("form-check-label");
        const tagCheckboxesLabel = document.querySelectorAll("#tag_checkboxes_list .form-check-label");
        const tagCheckboxesLabelArray = [...tagCheckboxesLabel];
        const tagCheckboxesLabelForAttribute = tagCheckboxesLabelArray.map(checkbox => {
            return checkbox.getAttribute("for")
        });

        const allTagCheckboxesWithCount = tagCheckboxesLabelForAttribute.map((tagId1) => {
            const idInVisiblePinsTagsCountById = visiblePinsTagsCountById.find((id) => id.id === tagId1);
            return idInVisiblePinsTagsCountById ? {
                id: idInVisiblePinsTagsCountById.id,
                count: idInVisiblePinsTagsCountById.count
            } : {id: tagId1, count: 0};
        });


        allTagCheckboxesWithCount.forEach(tag => {
            const labelForId = tag.id;
            const labelElement = document.querySelector(`label[for="${labelForId}"]`);

            if (labelElement) {
                // Mettre à jour le contenu textuel de l'objet label
                //labelElement.textContent = `${labelElement.textContent} (${tag.count})`;
                if (tag.count == 0) {
                    labelElement.classList.add("tagCount0");
                    //labelElement.textContent = labelElement.getAttribute("name");
                    labelElement.innerHTML = labelElement.getAttribute("name");
                } else {
                    labelElement.classList.remove("tagCount0");
                    //labelElement.textContent = labelElement.getAttribute("name") + " (" + tag.count + ")";
                    labelElement.innerHTML = labelElement.getAttribute("name") + "<span class=\"tagCount\"> (" + tag.count + ")</span>";
                }

            }
        });
    }

    function countPinsByUrl() {
        //--
        const allPins = document.querySelectorAll('.pin.display_block:not(#pin_0)');
        const allPinsArray = [...allPins];
        const allPinsUrls = allPinsArray.map((pin) => {
            return pin.getAttribute("site_id");
        });

        // pour les urls
        const allPinsUrlsCount = allPinsUrls.reduce((acc, site_id) => {
            //const id = objet.id;
            if (!acc[site_id]) {
                acc[site_id] = 1; // Initialisez le compteur à 1 si c'est la première occurrence
            } else {
                acc[site_id]++; // Incrémentez le compteur si le nom existe déjà
            }
            return acc;
        }, {});

        const allPinsCountByUrl = Object.entries(allPinsUrlsCount).map(([site_id, count]) => ({site_id, count}));
        //
        const urlCheckboxLi = document.querySelectorAll("#url_checkboxes_list li");
        const urlCheckboxesLiArray = [...urlCheckboxLi];
        urlCheckboxesLiArray.forEach(checkbox => {
            const urlCheckboxLiLabel = checkbox.querySelector(".form-check-label")
            const urlCheckboxLiLabelCount = checkbox.querySelector(".urlCount")
            const urlId = checkbox.id;
            //const urlNbOccurrences = allPinsCountByUrl.find(element => element.url === urlCheckboxLiLabel.getAttribute("for"));
            const urlNbOccurrences = allPinsCountByUrl.find(element => element.site_id === urlId);
            if (urlNbOccurrences == undefined) {
                urlCheckboxLiLabel.classList.add("urlCount0");
                urlCheckboxLiLabelCount.textContent = "";
            } else {
                urlCheckboxLiLabel.classList.remove("urlCount0");
                urlCheckboxLiLabelCount.textContent = "(" + urlNbOccurrences.count + ")";
                //labelElement.textContent = labelElement.getAttribute("name") + " (" + tag.count + ")";
                //checkboxLabel.innerHTML = checkboxLabel.getAttribute("name") + "<span class=\"urlCount\"> (" + urlNbOccurrences.count + ")</span>";
                //urlCheckboxLiLabelCount.textContent = "(" + urlNbOccurrences.count + ")";

            }
        })
    }

//** gestion des événement pour les filtres
    const rating_operator = document.getElementById("rating-operator");
    rating_operator.addEventListener("change",
        async () => {
            await filterPins();
        })

    const filter_stars = document.querySelectorAll('#sidebar .star');
    filter_stars.forEach((star, index) => {
        star.addEventListener('click', (e) => {
            e.preventDefault();
            const rating_filter = e.target.closest(".rating");
            const old_value = parseInt(rating_filter.getAttribute('filter_value'));
            let new_value = parseInt(star.getAttribute('data-value'));

            if (old_value === 1 && new_value === 1) {
                new_value = 0;
            }

            document.querySelector("#sidebar .rating").setAttribute("filter_value", new_value);
            updateStarsDisplay(filter_stars, old_value, new_value);
            filterPins();

        });
    });

    const checkbox_active_zones = document.querySelectorAll('.checkbox_active_zone');
    checkbox_active_zones.forEach((checkbox_active_zone) => {
            checkbox_active_zone.addEventListener("click", (e) => {
                let checkbox_off = document.getElementById("checkbox_off");
                let checkbox_on = document.getElementById("checkbox_on");
                let target_checkbox = e.target.closest(".checkbox_container");
                let target_checkbox_id = target_checkbox.id

                if (target_checkbox.classList.contains("selected")) {
                    target_checkbox.classList.remove("selected")
                } else if (target_checkbox_id == "checkbox_off") {
                    target_checkbox.classList.add("selected");
                    checkbox_on.classList.remove("selected");
                } else if (target_checkbox_id == "checkbox_on") {
                    target_checkbox.classList.add("selected");
                    checkbox_off.classList.remove("selected");
                }
                filterPins();
            })

        }
    )

    function filterUrls(filterIsActive) {
        const urlStatusFilter = document.querySelector("#url_status_filter")
        const urlCheckboxes = document.querySelectorAll(".url-favorite")
        urlCheckboxes.forEach(item => {
            const parent = item.closest(".form-check");
            if (urlStatusFilter.classList.contains("not_selected")) {
                parent.classList.remove("display_none");
            }
            else {
                if (item.classList.contains("bi-dot")) {
                    parent.classList.add("display_none")
                } else {
                    parent.classList.remove("display_none");
                }
            }
        })
    }

    const urlStatusFilter = document.getElementById("url_status_filter");
    const star = document.querySelector("#url_status_filter .bi");
    urlStatusFilter.addEventListener("click", async (e)=> {
        let filterIsActive = e.currentTarget.classList.contains("selected");
        await toggleClass(e.currentTarget,"not_selected", "selected")
        await toggleClass(star, "bi-star-fill", "bi-star")
        await filterUrls(filterIsActive) ;
        await filterPins();
    })


})
;
