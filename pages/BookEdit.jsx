import { bookService } from '../services/book.service.js'
import { LongTxt } from '../cmps/LongTxt.jsx'
import { showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM


export function BookEdit() {
  const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
  const [isEdit, setIsEdit] = useState(false)

  const navigate = useNavigate()
  const params = useParams()
  
  let preEditBook = {}
  
  useEffect(() => {
    if (params.bookId) {
      setIsEdit(true)
      loadBook()
      if (bookToEdit.id){
        preEditBook= bookToEdit}
    }
  }, [])




  function loadBook() {
    bookService.get(params.bookId)
      .then(setBookToEdit)
      
      .catch(err => {
        console.log('err:', err)
        navigate('/')
      })

  }

  const regionNames = new Intl.DisplayNames(['en'], { type: 'language' })

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
        break;

      case 'title':
        value = target.value || bookToEdit.title
        break

      case 'price':
        value = +target.value || bookToEdit.listPrice.amount
        break

      default:
        break;
    }

    if (field === 'price') {
      setBookToEdit((prevBook) => ({ ...prevBook, listPrice: { ...prevBook.listPrice, amount: value } }))
    } else {
      setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
    }
  }

  function onSaveBook(ev) {
    ev.preventDefault()
    bookService.save(bookToEdit)
      .then(() => {
        showSuccessMsg(`Book successfully Saved!`)
        navigate('/book')
      })
      .catch(err => console.log('err:', err))
  }

  function onCancelEdit(ev) {
    ev.preventDefault()
    bookService.save(preEditBook)
      .then(() => navigate('/book'))
      .catch(err => console.log('err:', err))
  }

  function getPublisheDate() {
    const currYear = new Date().getFullYear()
    let publishedYear = bookToEdit.publishedDate
    let diff = currYear - publishedYear
    if (diff > 10) publishedYear += ' - Veteran Book'
    else if (diff < 1) publishedYear += ' - NEW!'
    return publishedYear
  }

  function getPageCount() {
    // Switch case is fine
    let pageCount = bookToEdit.pageCount
    if (bookToEdit.pageCount > 500) pageCount += ' - Long reading'
    else if (bookToEdit.pageCount > 200) pageCount += ' - Decent reading'
    else if (bookToEdit.pageCount < 100) pageCount += ' - Light rading'
    return pageCount
  }

  if (isEdit && !bookToEdit.id) {
    return (<div>Loading...</div>)
  }

  return (
    <section className='book-edit'>
      <h2 className='edit-book-header'>{params.bookId ? 'Edit Book' : 'Add Book'}</h2>
      <div className='book-edit-container'>
        <div className='book-details-subtitle'>{bookToEdit.subtitle}</div>
        <div className='book-thumbnail-container'>
          {bookToEdit.listPrice.isOnSale ? <div className='book-details-on-sale'>On-sale!</div> : ''}
          <img src={bookToEdit.thumbnail} />
        </div>

        <form onSubmit={onSaveBook}>
          <div className='book-details-info'>
            <div className='book-details-info-row'>
              <span className='book-details-info-title'>Title:</span>
              <span className='book-details-info-text'>
                <input
                  type='text'
                  placeholder='Enter New Title'
                  name='title'
                  value={bookToEdit.title}
                  onChange={handleChange}
                />
              </span>
            </div>

            <div className='book-details-info-row'>
              <span className='book-details-info-title'>Year publish:</span>
              <span className='book-details-info-text'>
                {getPublisheDate()}
              </span>
            </div>

            <div className='book-details-info-row'>
              <span className='book-details-info-title'>
                Author{bookToEdit.authors.length > 1 ? 's' : ''}:
              </span>
              <span className='book-details-info-text'>
                {bookToEdit.authors.join(', ')}
              </span>
            </div>

            <div className='book-details-info-row'>
              <span className='book-details-info-title'>Language:</span>
              <span className='book-details-info-text'>
                {regionNames.of(bookToEdit.language)}
              </span>
            </div>

            <div className='book-details-info-row'>
              <span className='book-details-info-title'>Categories:</span>
              <span className='book-details-info-text'>
                {bookToEdit.categories.join(', ')}
              </span>
            </div>

            <div className='book-details-info-row'>
              <span className='book-details-info-title'>Pages:</span>
              <span className='book-details-info-text'>{getPageCount()}</span>
            </div>

            <div className='book-details-info-row'>
              <span className='book-details-info-title'>Price:</span>
              <span className='book-details-info-text'>
                <input
                  type='number'
                  placeholder='Set Price'
                  name='price'
                  onChange={handleChange}
                  value={bookToEdit.listPrice.amount || ''}
                />
              </span>
            </div>

            <div className='book-edit-actions-container'>
              <button className='save-edit-btn' onClick={onSaveBook}>
                Save ✔
              </button>
              <button
                className='cancel-edit-btn'
              onClick={onCancelEdit}
              >
                Cancel ✖
              </button>
            </div>

            <div className='book-details-info-row'>
              <span className='book-details-info-title'>Description:</span>
              <LongTxt txt={bookToEdit.description} />
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
