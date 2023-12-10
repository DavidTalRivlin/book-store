export function BookPreview({ book }) {
    return (
        <article className="book-preview">
            <h2>Book title: {book.title}</h2>
            <h4>Book description: {book.description}</h4>
            <img src={book.thumbnail} alt="" />
        </article>
    )
}