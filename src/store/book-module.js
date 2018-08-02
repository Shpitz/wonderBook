import axios from 'axios'
import bookSerivce from '../services/book-service.js'
//actions
export const LOAD_BOOKS = 'book/actions/loadBooks'
export const LOAD_BOOK = 'book/actions/loadBook'
export const SAVE_BOOK = 'book/action/saveBook'

// mutations
export const SET_BOOKS = 'book/mutations/setBooks'
export const UPDATE_SEARCH_FILTER = 'book/mutations/updateSearchFilter'
export const UPDATE_BOOK = 'book/mutations/updateBook'
export const ADD_BOOK = 'book/mutations/addBook'
export const DELETE_BOOK = 'book/mutations/deleteBook'



// getters
export const BOOKS_FOR_DISPLAY = 'book/getters/Books'
export const BOOKS_FILTER = 'book/getters/booksFilter'



export default {
    state: {
        books: [],
        booksFilter: {
            byTxt: '',
            byCategorie: ''
        }
    },
    mutations: {
        [SET_BOOKS](state, { books }) {
            state.books = books
        },
        [UPDATE_SEARCH_FILTER](state, { filterBy }) {
            state.booksFilter.byCategorie = filterBy.byCategorie
            state.booksFilter.byTxt = filterBy.byTxt ? filterBy.byTxt : '';
        },
        [UPDATE_BOOK](state, { book }) {
            var currIdx = state.books.findIndex(currBook => currBook.id === book._id)
            state.books.splice(currIdx, 1, book)
        },
        [ADD_BOOK](state, { book }) {
            state.books.unshift(book)
        },
        [DELETE_BOOK](state, { bookId }) {
            state.books = state.books.filter(book => book._id !== bookId)
        },
    },
    getters: {
        [BOOKS_FOR_DISPLAY](state) {
            return state.books
        },
        [BOOKS_FILTER](state) {
            return state.booksFilter
        }
    },
    actions: {
        [LOAD_BOOKS](store) {
            return bookSerivce.query(store.state.booksFilter)
                .then(books => {
                    store.commit({ type: SET_BOOKS, books })
                })
        },
        [LOAD_BOOK](context, { bookId }) {
            return bookSerivce.getById(bookId)
                .then(book => book)
        },
        [DELETE_BOOK](context, { bookId }) {
            return bookSerivce.remove(bookId)
                .then(_ => context.commit({ type: DELETE_BOOK, bookId }))
        },
        [SAVE_BOOK](context, { book }) {
            const isEdit = !!book._id
            if (isEdit) return bookSerivce.saveBook(book)
                .then(Editbook => {
                    return Editbook
                })
            else return bookSerivce.saveBook(book)
                .then(newBook => {
                    context.commit({ type: ADD_BOOK, book })
                    return newBook
                })

        },
    }
}
