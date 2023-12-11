const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

import { Home } from './pages/Home.jsx'
import { About } from './pages/About.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { LongTxt } from './cmps/LongTxt.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { BookDetails } from './pages/BookDetails.jsx'
import { BookEdit } from './pages/BookEdit.jsx'

const { useState } = React

export function App() {
    // const [page, setPage] = useState('books')

    const longTxt = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque, perferendis earum non minima molestiae labore necessitatibus voluptatem. Accusantium aliquam possimus dignissimos totam, est enim animi voluptatum maiores, laboriosam voluptates vitae?'

    return (
        <Router>
            <section className="app">
                <AppHeader />
                <main className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                            {/* <Route path="/about/team" element={<Team />} />
                            <Route path="/about/vision" element={<Vision />} /> */}
                        {/* </Route> */}
                        <Route path="/book" element={<BookIndex />} />
                        <Route path="/book/:bookId" element={<BookDetails />} />
                        <Route path="/book/edit/:bookId" element={<BookEdit />} />
                        <Route path="/book/edit" element={<BookEdit />} />
                    </Routes>
                </main>

            </section>
        </Router >
    )
}

