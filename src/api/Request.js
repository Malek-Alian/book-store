export const request = (href, method, body, headers) => {
    if (method === 'POST')
        body = { ...body, token: localStorage.getItem('token') }
    return fetch(`http://localhost:3000/${href}`, {
        method: method,
        headers: headers ? headers : { "Content-Type": "application/json" },
        body: body && JSON.stringify(body)
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

export const downloadRequest = async (href, method, flag) => {
    if (flag) {
        try {
            let response = await fetch(`http://localhost:3000/${href}`, {
                method: method,
            });
            response = await response.blob()
            return response;
        } catch (error) {
            return error;
        }
    } else {
        try {
            const response = await fetch(`http://localhost:3000/${href}`, {
                method: method,
            });
            const blob = await response.blob();
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = 'image.jpg';
            a.click();
        } catch (error) {
            console.error(error);
        }
    }
}