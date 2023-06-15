import React, { useState, useEffect } from 'react'
import moment from 'moment'
import 'moment/locale/id';
import Link from 'next/link'
import Image from 'next/image';

import {inspirationCornerImageLoader} from "../util"
import { getRecentPosts, getSimiliarPosts} from '../services'

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([])

  useEffect(() => {
    if (slug) {
      getSimiliarPosts(categories, slug).then((result) => {
        setRelatedPosts(result);
      });
    } else {
      getRecentPosts().then((result) => {
        setRelatedPosts(result);
      });
    }
  }, [slug]);

  return (
    <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8 '>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>{slug ? 'Post Terkait' : 'Post Terbaru'}</h3>
      {relatedPosts.map((post, index) => (
        <div key={index} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <Image
              unoptimized
              loader={inspirationCornerImageLoader}
              alt={post.title}
              height={60}
              width={60}
              className="align-middle rounded-full w-auto h-auto" 
              src={post.featuredImage.url}
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">{moment(post.createdAt).locale('id').format('DD MMMM YYYY')}</p>
            <Link href={`/posts/${post.slug}`} className="text-md" key={index}>{post.title}</Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PostWidget