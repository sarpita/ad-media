import React from 'react';
import './Filters.css';
import {useSelector,useDispatch } from 'react-redux';

const Filters =({brands,selectBrand,activeCategories=[],activeBrands=[],categories,selectCategory,onCategoriesClearFilter,onBrandClearFilter})=>{
    const isActiveCategory =(category)=>{
        return activeCategories.includes(category);
    }
    const isActiveBrand =(brand)=>{
        return activeBrands.includes(brand);
    }
    const showFilters= useSelector(state=>state.showFilters);
    const dispatch =useDispatch();
    const hideFilters=()=>{
        dispatch({type:'hide_filters',payload:false})
    }
return (
    <div className="filters" style={{display:`${showFilters === true || showFilters === null? 'block':'none'}`}}>
        <p>Filters</p>
        <span className="filter-close-icon" onClick={hideFilters}>X</span>
        <hr></hr>
        <p className="filters-heading">Filter categories</p>
        <ul className="filters-wrapper">
            {
                categories.map((category,index)=>{
                    return(
                        <li key={index}>
                            <input id={category} type="checkbox" checked={isActiveCategory(category)} value={category} onChange={selectCategory}/>
                            <label htmlFor={category} style={{paddingLeft:'0.5em'}}>{category}</label>
                        </li>
                    )
                })
            }
            <li><span className={`clear-filter`} onClick={onCategoriesClearFilter}>Clear Filter</span></li>
        </ul>
        <p className="filters-heading">Filter brands</p>
        <ul  className="filters-wrapper">
            {
                brands.map((brand,index)=>{
                    return(
                        <li key={index}>
                            <input id={brand} checked={isActiveBrand(brand)} type="checkbox" value={brand} onChange={selectBrand}/>
                            <label htmlFor={brand} style={{paddingLeft:'0.5em'}}>{brand}</label>
                        </li>
                    )
                })
            }
            <li><span className={`clear-filter`} onClick={onBrandClearFilter}>Clear Filter</span></li>
        </ul>
    </div>
)
}

export default Filters;