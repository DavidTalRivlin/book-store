import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
// var gFilterBy = { txt: '', minSpeed: 0 }
_createBooks()
console.log('im working')

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getNextBookId,
    // getFilterBy,
    // setFilterBy
}

function query() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            // if (gFilterBy.txt) {
            //     const regex = new RegExp(gFilterBy.txt, 'i')
            //     books = books.filter(book => regex.test(book.vendor))
            // }
            // if (gFilterBy.minSpeed) {
            //     books = books.filter(book => book.maxSpeed >= gFilterBy.minSpeed)
            // }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title='', description='',thumbnail='',amount=0, currencyCode='',isOnSale=false) {
    return {
        id: '',
        title,
        description,
        thumbnail,
        listPrice: {amount,currencyCode,isOnSale}
        }
    }


// function getFilterBy() {
//     return { ...gFilterBy }
// }

// function setFilterBy(filterBy = {}) {
//     if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
//     if (filterBy.minSpeed !== undefined) gFilterBy.minSpeed = filterBy.minSpeed
//     return gFilterBy
// }

function getNextBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            let nextBookIdx = books.findIndex(book => book.id === bookId) + 1
            if (nextBookIdx === books.length) nextBookIdx = 0
            return books[nextBookIdx].id
        })
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = []
        books.push(_createBook('the little prince','a journry in the stars','http://ca.org/books-photos/20.jpg',109,'EUR',false))
        books.push(_createBook('the little frog','a journry in the swamp','http://ca.org/books-photos/10.jpg',78,'USD',true))
        books.push(_createBook('the little punk','a journry in the hood','http://ca.org/books-photos/16.jpg',57,'ILS',false))

        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title, description,thumbnail,amount,currencyCode,isOnSale) {
    const book = getEmptyBook(title, description,thumbnail,amount,currencyCode,isOnSale)
    book.id = utilService.makeId(11)
 
    return book


}