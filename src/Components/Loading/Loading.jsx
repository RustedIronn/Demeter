import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Loading.css';

const Loading = (props) => {
    return (
        <React.Fragment>
            {
                props.loading &&
                <div className="Loading">
                    <FontAwesomeIcon icon="spinner" className="fa-pulse" />
                </div>
            }
        </React.Fragment>
    )
}

export default Loading;