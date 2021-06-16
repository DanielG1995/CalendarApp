const baseURL = process.env.REACT_APP_API_URL

const fetchSintoken = (endpoint, data, method = 'GET') => {
    const url = `${baseURL}/${endpoint}`;

    if (method === 'GET') {
        return fetch(url);
    } else {
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }

}

const fetchContoken = (endpoint, data, method = 'GET') => {
    const url = `${baseURL}/${endpoint}`;
    const token = localStorage.getItem('token') || '';
    if (method === 'GET') {
        return fetch(url, {
            method,
            headers: {
                'x-token': token,
                'Content-type': 'application/json'
            },
        });
    } else {
        return fetch(url, {
            method,
            headers: {
                'x-token': token,
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }


}



export {
    fetchSintoken,
    fetchContoken
}