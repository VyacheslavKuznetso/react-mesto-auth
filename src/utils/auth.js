export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((res) => {
            return res;
        })
        .catch((err) => console.log(err));
};

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((response) => {
            if (response.token) {
                localStorage.setItem('jwt', response.token);
                return response;
            }
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
};

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => data)
}
