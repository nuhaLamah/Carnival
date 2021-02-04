import React from 'react';

const InputField = ({title, type, name, placeholder, onChange, icon, color, borderColor}) => {
    return(
        <div className="field">
                <label>{title}</label>
                <div className="ui right icon input">
                    <input  type={type} name={name} placeholder={placeholder} onChange={onChange}  style={{backgroundColor: color, border: `1px solid ${borderColor}` }} />
                    <i className={icon}></i>
                </div>
               
        </div>
    )
}

export default InputField;