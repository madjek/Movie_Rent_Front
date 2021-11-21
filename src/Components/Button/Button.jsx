import React from 'react';

// import './Button.scss';

import { useNavigate } from 'react-router-dom';

const Button = (props) => {

    const history = useNavigate()
    const goTo = () => {
        history(props.url)
    }
    return(
        <div className="designButton btn b_row" onClick={()=>goTo()}>
            {props.destination}
        </div>
    )
    
};

export default Button;