import React, { useEffect, useState,useCallback } from 'react';
import {useDispatch,useSelector } from 'react-redux';
import data from './test_listings.csv';
import {csv} from 'd3';
import ProductCard from '../productCard';
import SubHeader from '../subHeader';
import Filters from '../filters';
import Pagination from '../pagination';

const Dashboard= ()=>{
    const [loading,setLoading]=useState(false);
    const [products,setProducts] =useState([]);
    const [currentPage,setCurrentPage] =useState(1);
    const LIMIT =10;
    const dispatch =useDispatch();
    const productsData= useSelector(state=>state.products);
    const brands= useSelector(state=>state.brands);
    const categories= useSelector(state=>state.categories);
    const selectedBrands= useSelector(state=>state.selectedBrand);
    const selectedCategories= useSelector(state=>state.selectedCategories);
    const order= useSelector(state=>state.order);
    const getUniqueValues =(data,itemName)=>{
        return [...new Set(data.map(item => item[itemName]))];  
    }
    const onPageChanged = useCallback(
        (event) => {
          event.preventDefault();
          setCurrentPage(parseInt(event.target.innerText));
        },
        [setCurrentPage]
      );
      const onNext = useCallback(
        () => {
         if(currentPage < products.length/LIMIT){
            setCurrentPage(currentPage + 1);
         }
        },
        [setCurrentPage,currentPage,products]
      );
      const onPrev = useCallback(
        () => {
         if(currentPage !== 1){
            setCurrentPage(currentPage - 1);
         }
        },
        [setCurrentPage,currentPage]
      );
    useEffect(()=>{
        setLoading(true);

        if(!productsData.length){
            csv(data).then(response=> {
                const slicedData=response.slice(0,100);
                dispatch({type: 'Add_product',payload:slicedData});
            });
        }
        if(productsData.length){
            dispatch({type:'Add_brands',payload:getUniqueValues(productsData,'brand')});

            const dataWithSelectedBrands=selectedBrands.length? productsData.filter((product,index)=>{
                return selectedBrands.includes(product.brand);
            }): productsData;

            dispatch({type:'Add_categories',payload:getUniqueValues(productsData,'custom_label_3')});
            
            const dataWithSelectedCatagories=selectedCategories.length? dataWithSelectedBrands.filter((product,index)=>{
                return selectedCategories.includes(product.custom_label_3);
            }): dataWithSelectedBrands;

            if(order.length){
                if(order ==='ascending'){
                    setProducts(dataWithSelectedCatagories.sort((a, b) => {
                        return parseFloat(a.sale_price? a.sale_price:a.price) - parseFloat(b.sale_price?b.sale_price:b.price);
                    })
                    );
                }
                else{
                    setProducts(dataWithSelectedCatagories.sort((a, b) => {
                        return parseFloat(b.sale_price?b.sale_price:b.price) - parseFloat(a.sale_price? a.sale_price:a.price);
                    })
                    ); 
                }
            }
            else{
                setProducts(dataWithSelectedCatagories);
            }
            setLoading(false);
        }
    },[order,selectedBrands,selectedCategories,productsData,dispatch]); 

    const onBrandSelect = useCallback((e)=>{
        if(e.target.checked){
            dispatch({type:'set_selected_brand',payload:[...new Set([...selectedBrands,e.target.value])]})
        }
        else{
            dispatch({type:'set_selected_brand',payload:selectedBrands.filter(function(value){ 
                return value !== e.target.value;
            })})
        }
     },[dispatch,selectedBrands]);

    const onOrderSelect = useCallback((order)=>{
        dispatch({type:'set_order',payload:order});
    },[dispatch]);

    const onCategorySelect = useCallback((e)=>{
        if(e.target.checked){
            dispatch({type:'set_selected_categories',payload:[...new Set([...selectedCategories,e.target.value])]})
        }
        else{
            dispatch({type:'set_selected_categories',payload:selectedCategories.filter(function(value){ 
                return value !== e.target.value;
            })})
        }
    },[dispatch,selectedCategories]);

    const onOrderClearFilter = useCallback(()=>{
        dispatch({type:'clear_order',payload:''});
    },[dispatch]);

    const onBrandClearFilter = useCallback(()=>{
        dispatch({type:'clear_brand',payload:[]});
    },[dispatch]);

    const onCategoriesClearFilter = useCallback(()=>{
        dispatch({type:'clear_categories',payload:[]});
    },[dispatch]);

    return (
        <div className="container">
            <Filters 
            brands={brands} 
            activeBrands={selectedBrands} 
            selectBrand={onBrandSelect} 
            onCategoriesClearFilter={onCategoriesClearFilter}
            onBrandClearFilter={onBrandClearFilter}
            categories={categories} 
            activeCategories={selectedCategories} 
            selectCategory={onCategorySelect}/>
            <div>
            <SubHeader onSelect={onOrderSelect} order={order} onClearFilter={onOrderClearFilter}/>
            {loading && <div className="loading-msg">Loading products... please wait</div>}
           {!loading && 
           <div style={{flex:'0 0 calc(100% - 190px)'}}>
           <div style={{display:'flex',flexWrap:'wrap',alignItems:'flex-start',justifyContent:'flex-start'}}>
               {products.slice(
                        (currentPage - 1) * LIMIT,
                        (currentPage - 1) * LIMIT + LIMIT
                    ).map((product,index)=>{
                        return (
                            <ProductCard key={index} product={product} />
                        )
                    })
            }
            </div>
            <Pagination
                totalPages={products.length/LIMIT}
                pageLimit={LIMIT}
                onPageChanged={onPageChanged}
                currentPage={currentPage}
                onNext={onNext}
                onPrev={onPrev}
            />
            </div>
           }
           </div>
        </div>
    )
}
export default Dashboard;