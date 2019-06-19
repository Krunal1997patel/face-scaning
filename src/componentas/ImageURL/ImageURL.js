import React from 'react';
import './ImageURL.css';

const ImageURL = ({ oninputChange, onSubmit }) => {
    return(
        <div>
            <p className="f3">
                {'This AI will detect faces in the images you provid. give it a try.'}
            </p>
            <div className="center">
                <div className="pa4 center br3 shadow-5 form">
                    <input className="f4 pa2 w-70 center" type="text" onChange={oninputChange}/>
                    <button 
                        className="w-30 no-underline grow f4 link ph3 pv2 dib white bg-black" 
                        onClick={onSubmit}>Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ImageURL;