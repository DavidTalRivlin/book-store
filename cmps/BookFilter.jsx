
const { useState, useEffect } = React


export function BookFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function onSetFilterBy(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    // function handleTxtChange({ target }) {
    //     const value = target.value
    //     setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, txt: value }))
    //     // setFilterByToEdit(prevFilterBy => {
    //     //     return { ...prevFilterBy, txt: value }
    //     // })
    // }

    // function handlePriceChange({ target }) {
    //     const value = target.value
    //     setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, price: value }))
    // }

    const { txt, price } = filterByToEdit
    return (
        <section className="book-filter">
            <h2>Filter Our Books</h2>
            <form onSubmit={onSetFilterBy} >
                <label htmlFor="txt">title: </label>
                <input value={txt} onChange={handleChange} type="text" id="txt" name="txt" />

                <label htmlFor="price">price: </label>
                <input value={price || ''} onChange={handleChange} type="number" id="price" name="price" />

                <button>Submit</button>
            </form>
        </section>
    )
}