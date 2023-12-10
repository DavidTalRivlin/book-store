import { Home } from './pages/Home.jsx'
import { About } from './pages/About.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { LongTxt } from './cmps/LongTxt.jsx'

const { useState } = React

export function App() {
    const [page, setPage] = useState('books')

    const longTxt = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque, perferendis earum non minima molestiae labore necessitatibus voluptatem. Accusantium aliquam possimus dignissimos totam, est enim animi voluptatum maiores, laboriosam voluptates vitae?'

    return (
        <section className="app">
            <header className="app-header">
                <h1>Yina'al A Book</h1>
                <nav className="app-nav">
                    <a onClick={() => setPage('home')} href="#">Home</a>
                    <a onClick={() => setPage('about')} href="#">About</a>
                    <a onClick={() => setPage('books')} href="#">Books</a>
                </nav>
            </header>

            <main className="container">
                {page === 'home' && <Home/>}
                {page === 'about' && <About/>}
                {page === 'books' && <BookIndex/>}
                {longTxt && <LongTxt txt={longTxt}/> }
            </main>
        </section>
    )
}

