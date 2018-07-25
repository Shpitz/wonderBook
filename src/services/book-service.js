import axios from 'axios'
const BASE_URL = (process.env.NODE_ENV !== 'development') ? '' : 'http://localhost:3000/book';

// const BOOK_URL = 'http://localhost:3000/book'

function query() {
    return axios.get(BASE_URL)
        .then(res => {
            console.log(res.data)
            return res.data
        })
    // .catch((err) => {
    //     console.warn(err)
    //     return Promise.reject(err)
    // })
}

export default {
    query,
    // getToyById,
    // remove,
    // add,
    // update
}