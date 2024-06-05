import React, { useState, useEffect } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import LoaderComponent from './components/Loader/Loader';
import Modal from './components/Modal/Modal';
import styles from './App.module.css';

const API_KEY = '4899584-ce1a6fbdd7631a82a87f71a0e';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchQuery === '') return;

    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );
        const data = await response.json();
        setImages(prevImages => [...prevImages, ...data.hits]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [searchQuery, page]);

  const handleSearchSubmit = query => {
    setSearchQuery(query);
    setImages([]);
    setPage(1);
  };

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = image => {
    setModalImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImage(null);
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={handleSearchSubmit} />
      {error && <p>{error}</p>}
      <ImageGallery images={images} onImageClick={openModal} />
      {loading && <LoaderComponent />}
      {images.length > 0 && !loading && <Button onClick={loadMoreImages} />}
      {showModal && <Modal image={modalImage} onClose={closeModal} />}
    </div>
  );
};

export default App;
