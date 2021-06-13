import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ boxes, imgUrl }) => {
  if (boxes.length) {
    return (
      <div className='center ma'>
        <div className='absolute mt2'>
          <img
            style={{
              width: '300px',
              height: 'auto',
            }}
            id='input-image'
            src={imgUrl}
            alt='img not loaded'
          />
          {boxes.map((box) => (
            <div
              key={box.topRow + box.rightCol}
              style={{
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol,
              }}
              className='bounding-box'
            ></div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className='center ma'>
        <img
          style={{
            width: '300px',
            height: 'auto',
          }}
          id='input-image'
          src={imgUrl}
          alt=''
        />
      </div>
    );
  }
};

export default FaceRecognition;
