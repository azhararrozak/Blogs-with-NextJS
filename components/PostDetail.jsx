import React from 'react'
import moment from 'moment';
import 'moment/locale/id';
import { RichText } from '@graphcms/rich-text-react-renderer';


const PostDetail = ({ post }) => {

  /*

  const getContentFragment = (index, text, obj, type) => {
    let modifiedText = text;
    //console.log(obj)
    if (obj) {
      //bold
      if (obj.bold) {
        modifiedText = (<b key={index}>{text}</b>);
      }

      //italic
      if (obj.italic) {
        modifiedText = (<em key={index}>{text}</em>);
      }

      //underline
      if (obj.underline) {
        modifiedText = (<u key={index}>{text}</u>);
      }

      //Link 
      if (obj.href) {
        const target = obj.openInNewTab ? '_blank' : '_self';
        modifiedText = <a key={index} href={obj.href} target={target} className="underline text-blue-500">{obj.title || obj.type}</a>;
      }

      //code
      if (obj.code) {
        modifiedText = (<code key={index} className="border font-mono border-black bg-[#eee] p-1 rounded ">{text}</code>);
      }

    }

    switch (type) {
      case 'code-block':
        return <code key={index} className="border font-mono border-black bg-[#eee] p-1 rounded">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</code>
      case 'block-quote':
        return <blockquote key={index} className="italic bg-[#eee]">{modifiedText.map((item, i) => <React.Fragment key={i}>" {item} "</React.Fragment>)}</blockquote>;
      case 'heading-three':
        return <h3 key={index} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
      case 'paragraph':
        return <p key={index} className="mb-8 text-justify">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
      case 'heading-four':
        return <h4 key={index} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
      case 'image':
        return (
          <img
            key={index}
            alt={obj.title}
            height={obj.height}
            width={obj.width}
            src={obj.src}
          />
        );
      default:
        return modifiedText;
    }
  };

  */
  return (
    <div className="bg-white shadow-lg lg:rounded-lg lg:p-8 pb-12 \">
      <div className="relative overflow-hidden shadow-md mb-6">
        <img src={post.featuredImage.url} alt="" className="object-top h-full w-full object-cover  shadow-lg lg:rounded-lg" />
      </div>
      <div className="px-4 lg:px-0">
        <div className="flex items-center mb-8 w-full">
          <div className="hidden md:flex justify-center lg:mb-0 lg:w-auto mr-8 items-center">
            <img
              alt={post.author.name}
              height="30px"
              width="30px"
              className="align-middle rounded-full"
              src={post.author.photo.url}
            />
            <p className="inline align-middle text-gray-700 ml-2 font-medium lg:text-lg">{post.author.name}</p>
          </div>
          <div className="font-medium text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="align-middle italic">{moment(post.createdAt).locale('id').format('DD MMMM YYYY')}</span>
          </div>
        </div>
        <h1 className="mb-8 text-xl font-semibold text-center">{post.title}</h1>
        {/* RichText Renderer */}
        <RichText 
          content={post.content.raw.children} 
          renderers={{
            h1: ({ children }) => <h1 className="text-black">{children}</h1>,
            img: ({ src, title, width, height, altText }) => <a href="https://www.highrevenuegate.com/yib61j5yu?key=45c0d83c64e9b21aedd738dd6863aa30"><img src={src} title={title} width={width} height={height} alt={altText} className="py-4" /></a>,
            p: ({ children}) => <p className="text-justify break-all leading-7">{children}</p>,
            bold: ({ children }) => <strong>{children}</strong>,
            a: ({ children, href, openInNewTab, title }) => <a title={title} href={href} target={openInNewTab ? '_blank' : '_self'} className="underline text-blue-500">{children}</a>,
            ul: ({ children }) => <ul className="list-disc pl-8">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal pl-8">{children}</ol>,
            li: ({ children }) => <li>{children}</li>,
            blockquote: ({ children }) => <blockquote className="relative border-l-4 pl-4 my-2"><p className="text-gray-800 sm:text-xl dark:text-white">{children}</p></blockquote>,
            code: ({ children }) => <code className="border font-mono border-black bg-[#eee] p-1 rounded my-2">{children}</code>,
            code_block: ({ children }) => <pre className="border font-mono border-black bg-[#eee] p-1 rounded my-2">{children}</pre>
          }}
        />
        
        {/*post.content.raw.children.map((typeObj, index) => {
          const children = typeObj.children.map((item, itemindex) => getContentFragment(itemindex, item.text, item));

          return getContentFragment(index, children, typeObj, typeObj.type);
        })*/}
        
      </div>
    </div>
  )
}

export default PostDetail