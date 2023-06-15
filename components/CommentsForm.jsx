import React, { useState, useEffect } from 'react';
import { submitComment } from '../services';

const CommentsForm = ({ slug }) => {
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({ name: null, email: null, comment: null, storeData: false });


  useEffect(() => {
    setLocalStorage(window.localStorage);
    const initalFormData = {
      name: window.localStorage.getItem('name'),
      email: window.localStorage.getItem('email'),
      storeData: window.localStorage.getItem('name') || window.localStorage.getItem('email'),
    };
    setFormData(initalFormData);
  }, []);

  const onInputChange = (e) => {
    const { target } = e;
    if (target.type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
  };

  const handlePostSubmission = () => {
    setError(false);
    setErrorName(false);
    const { name, email, comment, storeData } = formData;
    if (!name || !email || !comment) {
      setError(true);
      return;
    }
    if (name.toUpperCase() === "ADMIN" || email.toUpperCase() === "ADMIN@GMAIL.COM") {
      setErrorName(true);
      return;
    }
    const commentObj = {
      name,
      email,
      comment,
      slug,
    };

    if (storeData) {
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('name');
      localStorage.removeItem('email');
    }

    submitComment(commentObj)
      .then((res) => {
        if (res.createComment) {
          if (!storeData) {
            formData.name = '';
            formData.email = '';
          }
          formData.comment = '';
          setFormData((prevState) => ({
            ...prevState,
            ...formData,
          }));
          setShowSuccessMessage(true);
          setShowModal(true);
          setTimeout(() => {
            setShowSuccessMessage(false);
            setShowModal(false);
          }, 3000);
        }
      });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8 mx-4">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">Berikan Komentar</h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea value={formData.comment} onChange={onInputChange} className="p-4 outline-none w-full rounded-lg h-40 focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" name="comment" placeholder="Tulis Komentar" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input type="text" value={formData.name} onChange={onInputChange} className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" placeholder="Nama" name="name" />
        <input type="email" value={formData.email} onChange={onInputChange} className="py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700" placeholder="Email" name="email" />
      </div>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input checked={formData.storeData} onChange={onInputChange} type="checkbox" id="storeData" name="storeData" value="true" />
          <label className="text-gray-500 cursor-pointer" htmlFor="storeData"> Simpan nama dan email di browser</label>
        </div>
      </div>
      {error && <p className="text-xs text-red-500">Perlu di isi semuanya</p>}
      {errorName && <p className="text-xs text-red-500">Nama <i>Admin</i> tidak boleh digunakan</p>}
      <div className="mt-8">
        <button type="button" onClick={handlePostSubmission} className="transition duration-500 ease hover:bg-[#bb425a] inline-block bg-[#6F2232] lg:text-lg font-medium rounded-full text-white px-8 py-3 cursor-pointer">Kirim Komentar</button>
        {showSuccessMessage && (
          <div className="fixed z-10 inset-0 mx-5 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <div className="bg-[#bd9b3f] rounded-lg overflow-hidden">
                <div className="p-6">
                  <p className="lg:text-lg font-bold text-black">Terima Kasih, Komentarmu akan di review dahulu</p>
                </div>
                <div className="bg-gray-100 px-4 py-3 flex justify-center items-center">
                  <button onClick={() => setShowModal(false)} className="text-sm font-medium text-white hover:bg-[#bb425a] focus:outline-none bg-[#6F2232] p-2 rounded ">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;