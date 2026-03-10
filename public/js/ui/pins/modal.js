/* wip
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
	
	*/