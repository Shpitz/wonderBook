import axios from 'axios'
const BASE_URL = (process.env.NODE_ENV !== 'development') ? '' : 'http://localhost:3000/book';


// const BOOK_URL = 'http://localhost:3000/book'

function query(booksFilter = {}) {
    var queryParams = new URLSearchParams()
    if (booksFilter.byTxt) queryParams.append('txt', booksFilter.byTxt)
    if (booksFilter.byCategorie) queryParams.set('categorie', booksFilter.byCategorie)
    return axios.get(`${BASE_URL}?${queryParams}`)
        .then(res => {
            console.log(res.data)
            return res.data
        })
        .catch((err) => {
            return Promise.reject(err)
        })
}

function remove(bookId) {
    return axios.delete(`${BASE_URL}/${bookId}`)
}

function getById(bookId) {
    return axios.get(`${BASE_URL}/${bookId}`)
        .then(res => res.data)
        .catch(err => console.log('Problem talking to server', err))
}

function saveBook(book) {
    if (book._id) {
        // update
        return axios.put(`${BASE_URL}/${book._id}`, book)
            .then(res => res.data)
            .catch(err => console.log('Problem talking to server', err))
    } else {
        //add new
        return axios.post(BASE_URL, book)
            .then(res => res.data)
            .catch(err => console.log('Problem talking to server', err))
    }
}

function getCategories() {
    var categories = [
        { catTxt: 'All', img: './img/categories/All.jpeg' },
        { catTxt: 'Animals', img: './img/categories/Animals.jpeg' },
        { catTxt: 'Family', img: './img/categories/Family.jpeg' },
        { catTxt: 'Friends', img: './img/categories/Friends.jpeg' }

    ]
    return categories
}

export default {
    query,
    getById,
    getCategories,
    saveBook,
    remove
    // getToyById,
    // remove,
    // add,
    // update
}

