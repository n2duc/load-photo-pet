import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

const getRamdomPhotos = async (page) => {
    try {
        const res = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=8`)
        return res.data
    } catch (err) {
        console.log(err)
    }
}

const Photos = () => {
    const [photo, setPhoto] = useState([])
    const [nextPage, setNextPage] = useState(1)

    const handleLoadMorePhotos = useRef({})
    handleLoadMorePhotos.current = async () => {
        const img = await getRamdomPhotos(nextPage)
        const newPhotos = [...photo, ...img]
        setPhoto(newPhotos)
        setNextPage(nextPage + 1)
    }
    useEffect(() => {
        handleLoadMorePhotos.current()
    }, [])
    return (
        <div>
            <div className='list-photos'>
                {photo.length > 0 && photo.map((item) => (
                    <div className='photo' key={item.id}>
                        <img className='image' src={item.download_url} alt={item.author} />
                    </div>
                ))}
            </div>
            <div className="button">
                <button className='btn-loadMore' onClick={handleLoadMorePhotos.current}>Load more</button>
            </div>
        </div>
    )
}

export default Photos