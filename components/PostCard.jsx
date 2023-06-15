import React from 'react'
import moment from 'moment'
import 'moment/locale/id';
import Link from 'next/link'
import Image from 'next/image'

import {inspirationCornerImageLoader} from "../util"

const PostCard = ({ post }) => {
  return (
    <div className='bg-white shadow-lg rounded-lg p-0 lg:p-8 pb-12 mb-8'>
      <div className='relative overflow-hidden shadow-md pb-80 mb-6'>
        <img
          src={post.featuredImage.url}
          alt={post.title}
          className='object-top absolute h-80 w-full object-cover shadow-lg rounded-t-lg lg:rounded-lg'
        />
      </div>
      <h1 className='transition duration-700 px-4 text-center mb-4 cursor-pointer hover:text-pink-600 lg:text-xl font-semibold'>
        <Link href={`/posts/${post.slug}`}>
          {post.title}
        </Link>
      </h1>
      <div className="block lg:flex text-center items-center justify-center mb-4 w-full">
        <div className="flex justify-center mb-4 lg:mb-0 w-full lg:w-auto mr-8 items-center">
          <Image
            unoptimized
            loader={inspirationCornerImageLoader}
            alt={post.author.name}
            width={30}
            height={30}
            className="align-middle rounded-full"
            src={post.author.photo.url}
          />
          <p className="inline align-middle text-gray-700 ml-2 font-medium lg:text-lg">{post.author.name}</p>
        </div>
        <div className="font-medium text-gray-700 hidden lg:flex">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="align-middle">{moment(post.createdAt).locale('id').format('DD MMMM YYYY')}</span>
        </div>
      </div>
      <p className="text-justify break-all truncate ... lg:text-lg text-gray-700 font-normal px-4 lg:px-20 mb-8">
        {post.summary}
      </p>
      <div className="text-center">
        <Link href={`/posts/${post.slug}`}>
          <span className="transition duration-500 ease transform hover:-translate-y-1 inline-block bg-pink-700 hover:bg-[#6F2232] lg:text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">Lihat Selengkapnya</span>
        </Link>
      </div>
    </div>
  )
}

export default PostCard