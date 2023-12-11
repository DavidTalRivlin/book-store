import { bookService } from "../services/book.service.js"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"

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
            })
            .catch(err => console.log('err:', err))

    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
                    <h1>Welcome to book index!</h1>
                    <BookFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                    <Link to="/book/edit">Add</Link>
                    <BookList books={books} onRemoveBook={onRemoveBook} />

        </section>
    )
}