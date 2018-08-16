import React from 'react';

const Cell = ({ cell, onClick }) => <div className={"cell " + cell} onClick={onClick} />

export default Cell