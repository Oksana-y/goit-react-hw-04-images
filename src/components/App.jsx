import Searchbar from './Searchbar/Searchbar';
import fetchApi from './Services/fetchApi';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { useState, useEffect } from 'react';
import React from 'react';

export const App = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const limit = 12;

  const handleSubmitForm = search => {
    setSearch(search);
    setPage(1);
    setImages([]);
  };

  const handleOpenModal = largeImageURL => {
    setIsOpen(true);
    setActiveImage(largeImageURL);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetchApi(search, page, limit)
  //     .then(res => {
  //       setImages(res.data.hits);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, []);

  useEffect(() => {
    if (search !== '') {
      setIsLoading(true);
      fetchApi(search, page, limit)
        .then(res => {
          setImages(prevState => [...prevState, ...res.data.hits]);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [page, search]);

  const handleLoadMore = e => {
    setPage(prevState => prevState + 1);
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmitForm} />
      {isLoading && <Loader />}
      <ImageGallery images={images} onOpenModal={handleOpenModal} />

      {images.length > 0 && <Button onClick={handleLoadMore}>Load More</Button>}

      {isOpen && (
        <Modal activeImage={activeImage} onCloseModal={handleCloseModal} />
      )}
    </>
  );
};
