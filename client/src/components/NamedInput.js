import React from 'react';
import './NamedInput.css';

export default function NamedImport(props) {
  return (
    <div className="form-group">
      <label>{props.label}:</label>
      <input className="form-control" placeholder={props.placeholder} value={props.value} onChange={props.handleChange(props.label.toLowerCase())} />
    </div>
  );
}