import React from 'react';

const Rank = ({name, imageinput}) => {
    return(
        <div>
            <div className="white f2">
                {`${name}, your current rank is...`}
            </div>
            <div className="white f1">
                {imageinput}
            </div>
        </div>
    )
}

export default Rank;