import { bookService } from "../services/book.service.js"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { showSuccessMsg } from "../services/event-bus.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

const { Link } = ReactRouterDOM
const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
        return () => {
            // alert('Bye Bye')
        }
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(books => setBooks(books))
            .catch(err => console.log('err:', err))
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(prevBooks => {
                    return prevBooks.filter(book => book.id !== bookId)
                })
                showSuccessMsg(`Book successfully removed!`)
            })
            .catch(err => {
            console.log('err:', err)
            showErrorMsg(`Houston we have a problem!`)
        })


    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
                    <h1>Welcome to book index!</h1>
                    <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                    <button><Link to="/book/edit">+ Add Book</Link></button>
                    <BookList books={books} onRemoveBook={onRemoveBook} />

        </section>
    )
}