import cookie from "cookie_js";

const userId='userId';

export function getUserId() {
    return cookie.get(userId)
}
export function setUserId(value) {
    cookie.set(userId,value)
}

export function clearUserId() {
    cookie.remove(userId)
}