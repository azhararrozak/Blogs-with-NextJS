import React from 'react'
import Image from 'next/image'

import {inspirationCornerImageLoader} from "../util"

const Author = ({ author }) => {
    return (
        <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-[red] bg-opacity-20 mx-4">
            <div className="absolute left-0 right-0 -top-14">
                <Image
                    unoptimized
                    loader={inspirationCornerImageLoader}
                    alt={author.name}
                    height={100}
                    width={100}
                    className="m-auto left-0 right-0 rounded-full"
                    src={author.photo.url}
                />
            </div>
            <h3 className="text-white mt-4 mb-4 lg:text-xl font-bold">{author.name}</h3>
            <p className="text-white text-ls">{author.bio}</p>
        </div>
    )
}

export default Author