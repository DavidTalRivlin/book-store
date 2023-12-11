import { bookService } from "../services/book.service.js"

const { useParams, useNavigate, Link } = ReactRouterDOM
const { useState, useEffect } = React

export function BookDetails() {

    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {
        bookService.get(params.bookId)
            .then(book => setBook(book))
            .catch(err => {
                console.log('err:', err)
                navigate('/')
            })
    }

    function onBack() {
        navigate('/book')
    }

    if (!book){ return <div>Loading...</div>}

    return (
        <section className="book-details">
            <h2>{book.title}</h2>
            <h3>{book.subtitle}</h3>
            <h3>authors: {book.authors} </h3>
            <img src={book.thumbnail} alt="" />
            <h3>published year: {book.publishedDate}
                {(new Date().getFullYear() - book.publishedDate) > 10 && ' Vintage'}
                {(new Date().getFullYear() - book.publishedDate) < 2 && ' New'}
            </h3>
            <h3>Book description: {book.description}</h3>
            <h3>Pages: {book.pageCount}
                {book.pageCount > 500 && ' Serious Reading'}
                {book.pageCount > 200 && book.pageCount < 500 && ' Descent Reading'}
                {book.pageCount < 100 && ' Light Reading'}
            </h3>

            <h3>categories: {book.categories}</h3>
            <h3>language: {book.language}</h3>

            <h3 className={book.listPrice.amount > 150 ? 'red' : book.listPrice.amount < 20 ? 'green' : ''} >price: {book.listPrice.amount} {book.listPrice.currencyCode}</h3>
            <h3> {(book.listPrice.isOnSale) ? 'On Sale Now!' : ''}</h3>

            <button onClick={onBack}>Back</button>
        </section>
    )
}


