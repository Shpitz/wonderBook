import axios from 'axios'
const BASE_URL = (process.env.NODE_ENV !== 'development') ? '' : 'http://localhost:3000/book';


// const BOOK_URL = 'http://localhost:3000/book'

function query(booksFilter = {}) {
    var queryParams  = new URLSearchParams()
    if (booksFilter.byTxt) queryParams.set('q', booksFilter.byTxt)
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


export default {
    query,
    getById
    // getToyById,
    // remove,
    // add,
    // update
}

// function getImgPath(str){
//     var count = 2;
//     var i = str.length - 1;
//     var ans = '';
//     while (count > 0){
//         ans += str[i]
//         if (str[i] === '/') count--
//         i--
//     }
//     console.log(reverseString(ans))
// }

// getImgPath('./img/books/Pumpkin/cover.jpg')


// function reverseString(str) {
//     // Step 1. Use the split() method to return a new array
//     var splitString = str.split(""); // var splitString = "hello".split("");
//     // ["h", "e", "l", "l", "o"]
 
//     // Step 2. Use the reverse() method to reverse the new created array
//     var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
//     // ["o", "l", "l", "e", "h"]
 
//     // Step 3. Use the join() method to join all elements of the array into a string
//     var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
//     // "olleh"
    
//     //Step 4. Return the reversed string
//     return joinArray; // "olleh"
// }