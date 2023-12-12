export function AddReview({ book , submitReview}) {

    function onSubmitReview(ev) {
        ev.preventDefault()

        submitReview(ev)

        ev.target.name.value = ''
        ev.target.rating.value = ''
        ev.target.date.value = ''
    }
    return (

        <article>
            <h2>Ratings</h2>
            <h3>Submit Rating:</h3>
            <form onSubmit={onSubmitReview}>
                <input type="text" name="name" placeholder="full name here" />
                <select placeholder="choose rating" name="rating" id="">

                    <option >choose rating</option>
                    <option value="5">⭐⭐⭐⭐⭐</option>
                    <option value="4">⭐⭐⭐⭐</option>
                    <option value="3">⭐⭐⭐</option>
                    <option value="2">⭐⭐</option>
                    <option value="1">⭐</option>
                </select>
                <input type="date" name="date" />

                <button type="submit">Submit</button>
            </form>
            {book.reviews && book.reviews.length &&
                <section>
                    <h3>All Ratings:</h3>
                    <ul>
                        {book.reviews.map((review, idx) =>
                            <li key={idx}>
                                <div>{review.fullname}</div>
                                <div>{(review.rating === '5') ? '⭐⭐⭐⭐⭐' : (review.rating === '4') ? '⭐⭐⭐⭐' : (review.rating === '3') ? '⭐⭐⭐' : (review.rating === '2') ? '⭐⭐' : (review.rating === '1') ? '⭐' : ''}</div>
                                <div>{review.readAt}</div>
                            </li>
                        )}
                    </ul>

                </section>
            }
        </article>
    )
}