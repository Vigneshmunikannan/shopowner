import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
export default function Home() {
    const [categories, setCategories] = React.useState([]);
   const [redirect,setredirect]=React.useState({
    loc:"",
    val:false,
   })

    useEffect(() => {
        axios.get('https://igneous-gamma-398113.el.r.appspot.com/categories')
            .then(response => {
                console.log(response.data.categories); // Log the response data
                setCategories(response.data.categories)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);


function change(event){
    const selectedCategory = event.target.getAttribute("data-category");
    setredirect(prev => ({ ...prev,loc:selectedCategory,val:selectedCategory}));
}
    return (
        <div>
            { redirect.val && <Navigate to={`/delete/${redirect.loc}`} />}
        
            <div className="category-list">
                {categories.map(category => (
                    <div className="category-item" key={category._id} data-category={category._id} onClick={change} name={category._id}>
                        <img src={`data:image/jpeg;base64,${category.categoryImage}`} alt={category._id} data-category={category._id} onClick={change}/>
                        <p data-category={category._id} onClick={change} >{category._id}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}