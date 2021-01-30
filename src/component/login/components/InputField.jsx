import React from 'react';

const InputField = ({title, name, placeholder, icon}) => {
    return(
        <div className="field">
                <label>{title}</label>
                <div className="ui right icon input">
                    <input type="text" name={name} placeholder={placeholder} />
                    <i className={icon}></i>
                </div>
        </div>
    )
}

export default InputField;