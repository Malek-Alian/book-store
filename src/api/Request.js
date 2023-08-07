export const request = (href, method, body) => {
    return fetch(`http://localhost:3000/${href}`, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: body && JSON.stringify(body),
    })
        .then(response => response.json())
        .then(result => result)
        .catch(error => error)
}

export const fileRequest = (href, method, body) => {
    return fetch(`http://localhost:3000/${href}`, {
        method: method,
        body: body,
    })
        .then(response => response.json())
        .then(result => result)
        .catch(error => error)
}