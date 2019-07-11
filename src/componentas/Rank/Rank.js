import React from 'react';

const Rank = ({name, imageInput}) => {
    return(
        <div>
            <div className="white f2">
                {`${name}, your current rank is...`}
            </div>
            <div className="white f1">
                {imageInput}
            </div>
        </div>
    )
}

export default Rank;