import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React


export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [selectedBookId, setSelectedBookId] = useState(null)
 
    useEffect(() => {
        loadBooks()
        return () => {
            // alert('Bye Bye')
        }
    }, [])
    // }, [filterBy])

    function loadBooks() {
        bookService.query()
        // bookService.query(filterBy)
            .then(books => setBooks(books))
            .catch(err => console.log('err:', err))
    }

    
    function onSelectBookId(bookId) {
        setSelectedBookId(bookId)
    }

    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
            {!selectedBookId &&
                <React.Fragment>
                    <h1>Welcome to book index!</h1>
                    {/* <CarFilter filterBy={filterBy} onSetFilter={onSetFilter} /> */}
                    {/* <BookList books={books} onSelectBookId={onSelectBookId} onRemoveBook={onRemoveBook} /> */}
                </React.Fragment>
            }
            {/* {selectedCarId && <CarDetails onBack={() => setSelectedCarId(null)} carId={selectedCarId} />} */}
        </section>
    )
}