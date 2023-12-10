const { useState } = React

export function LongTxt({ txt, length=100 }) {

    const [isHidden, setIsHidden] = useState(true)
    const shortenTxt = txt.substring(length)

    return (
        <article>
            <span>{isHidden && shortenTxt}</span>
            <span>{!isHidden && txt}</span>
            <button onClick={()=>{setIsHidden(!isHidden)}}>{isHidden ? 'Show more' : 'Show less'}</button>
        </article>
    )





}