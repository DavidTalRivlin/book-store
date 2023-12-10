import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React

export function BookDetails({ bookId, onBack }) {

    const [book, setBook] = useState(null)

    useEffect(() => {
        bookService.get(bookId)
            .then(book => setBook(book))
    }, [])


    if (!book) return <div>Loading...</div>
    return (
        <section className="book-details">
            <h1>Book title: {book.title}</h1>
            <h3>Book description: {book.description}</h3>
            <img src={`../assets/img/${book.thumbnail}.jpg`} alt="" />
            <h3>price: {book.listPrice.amount} {book.listPrice.currencyCode}</h3>
            <h3> {(book.listPrice.isOnSale) ? 'On Sale Now!' : '' }</h3>

            <button onClick={onBack}>Back</button>
        </section>
    )
}