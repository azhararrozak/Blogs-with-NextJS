import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import { getCategories } from '../services';


const Header = () => {
    const [navbar, setNavbar] = useState(false)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories().then((newCategories) => {
            setCategories(newCategories);
        });
    }, []);

    return (
        <nav className="w-full shadow bg-[#6F2232] ">
            <div className="justify-between px-8 mx-auto md:items-center md:flex md:px-8 lg:mx-10">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <Link href="/">
                            <h2 className="lg:text-xl font-bold text-white">Inspiration Corner</h2>
                        </Link>
                        <div className="md:hidden">
                            <button
                                className="p-2 rounded-md outline-none focus:border-white focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        stroke="white"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="white"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-3 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
                            }`}
                    >
                        <ul className="items-center justify-center space-y-4 md:flex md:space-x-3 md:space-y-0">
                            <li className="italic text-white md:hidden lg:hidden">Kategori List</li>
                            {categories.map((category, index) => (
                                <li key={index} className=" hover:text-blue-600">
                                    <Link href={`/category/${category.slug}`}><span className="md:float-right mt-2 align-middle font-semibold text-white cursor-pointer">{category.name}</span></Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header