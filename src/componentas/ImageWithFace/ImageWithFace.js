import React from 'react';
import './ImageWithFace.css';

const ImageWithFace = ({ImageWithFace, box}) => {
    return(
        <div className="center ma">
            <div className="absolute mt2">
                <img id='inputImage' alt="" src={ImageWithFace} width='500px' height='auto' />
                <div className='bounding_box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>
        </div>
    );
}

export default ImageWithFace;