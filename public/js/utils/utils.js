

export function toggleClass(element, class1, class2) {
        if (element.classList.contains(class1)) {
            element.classList.remove(class1);
            element.classList.add(class2);
        } else if (element.classList.contains(class2)) {
            element.classList.remove(class2);
            element.classList.add(class1);
        }

    }

export function setCookie(cookieName, cookieValue) {
	const d = new Date();
	const expirationDays = 50;
	d.setTime(d.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
	//document.cookie = "domain=value; domain=localhost; path=/";
	const expirationDate = new Date();
	expirationDate.setDate(expirationDate.getDate() + 7);
	//document.cookie = cookieName+"="+cookieValue+"; expires=Fri, 31 Dec 9999 23:59:59 GMT; Path=/";
	document.cookie = cookieName + "=" + cookieValue + "; Path=/";
}

export function getCookie(cookieName) {
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
	
