import React from 'react';

const ImageWithFace = ( {ImageWithFace} ) => {
    return(
        <div className="center ma">
            <div className="absplute mt2">
                <img id='inputImage' alt="" src={ImageWithFace} width='500px' height='auto' />
            </div>
        </div>
    );
}

export default ImageWithFace;