import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, largeImageURL, onClick }) => {
  return (
    <li
      className={styles.ImageGalleryItem}
      onClick={() => onClick(largeImageURL)}
    >
      <img
        src={webformatURL}
        alt=""
        className={styles.ImageGalleryItem_image}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
