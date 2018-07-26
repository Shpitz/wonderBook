
import bookSerivce from '../services/book-service.js'
//actions
export const LOAD_BOOKS = 'book/actions/loadBooks'


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
            byTxt:''
        }
    },
    mutations: {
        [SET_BOOKS](state, { books }) {
            state.books = books
        },
        [UPDATE_SEARCH_FILTER](state, {searchStr}){
            state.booksFilter.byTxt = searchStr;
        }
    },
    getters: {
        [BOOKS_FOR_DISPLAY](state){
            return state.books
        },
        [BOOKS_FILTER](state){
            return state.booksFilter
        }
    },
    actions: {
        [LOAD_BOOKS](store) {
            // console.log('context.state.filterBy',store.state.booksFilter) 
            return bookSerivce.query(store.state.booksFilter)
                .then(books => {
                    store.commit({ type: SET_BOOKS, books })
                    // console.log(books, 'from action')
                })
        }
    }
}
