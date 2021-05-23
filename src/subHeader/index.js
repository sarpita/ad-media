import React from 'react';
import './subHeader.css';

const SubHeader = ({ onSelect, order, onClearFilter }) => {
    const onSelectOrder = (e) => {
        const parent = e.target.parentElement;
        Array.from(parent.childNodes).forEach(element => {
            element.classList.remove('active')
        });
        if (e.target.innerText === 'Low to High') {
            onSelect('ascending');
        }
        else {
            onSelect('descending');
        }
        e.target.classList.add('active');
    }
    return (
        <div className={`subheader`}>
            <div className="sorting-container">
                <span>Sort by -</span>
                <span className={`sort-elem ${order === 'ascending' ? 'active' : ''}`} onClick={onSelectOrder}>Low to High</span>
                <span className={`sort-elem ${order === 'descending' ? 'active' : ''}`} onClick={onSelectOrder}>High to Low</span>
                <span className={`clear-filter`} onClick={onClearFilter}>Clear Filter</span>
            </div>
        </div>
    )
}
export default SubHeader;