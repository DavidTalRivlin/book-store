import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
// var gFilterBy = { txt: '', price: 0 }
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
    
    getNextBookId,
    
}

function query(filterBy) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regex.test(book.title))
            }
            if (filterBy.price) {
                books = books.filter(book => book.listPrice.amount <= filterBy.price)
            }
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


function getDefaultFilter() {
    return { txt: '', price: '' }
}


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
        books.push(_createBook('the little prince','a journry in the stars','1',109,'EUR',false))
        books.push(_createBook('the little frog','a journry in the swamp','2',78,'USD',true))
        books.push(_createBook('the little punk','a journry in the hood','3',57,'ILS',false))

        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title, description,thumbnail,amount,currencyCode,isOnSale) {
    const book = getEmptyBook(title, description,thumbnail,amount,currencyCode,isOnSale)
    book.id = utilService.makeId(11)
 
    return book


}