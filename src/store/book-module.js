import axios from 'axios'
import bookSerivce from '../services/book-service.js'
//actions
export const LOAD_BOOKS = 'book/actions/loadBooks'
export const LOAD_BOOK = 'book/actions/loadBook'




// mutations
export const SET_BOOKS = 'book/mutations/setBooks'
export const UPDATE_SEARCH_FILTER = 'book/mutations/updateSearchFilter'

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
        }
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
    }
}
