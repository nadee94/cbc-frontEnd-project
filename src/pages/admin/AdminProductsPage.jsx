
import { useEffect, useState } from "react"
import { sampleProducts } from "../../assets/sampleData"
import axios from "axios"
import { Link } from "react-router-dom"


export default function AdminProductsPage(){

    const [products,setProducts]=useState(sampleProducts)

    useEffect(
        ()=>{

             axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products").then(
        (res)=>{

            console.log(res.data)
            setProducts(res.data)
        }


    )

        },[]
    )

   

    
    

    return(
        <div className="w-full h-full  max-h-full overflow-scroll relative">
            <Link to="/admin/add-product" className="absolute text-4xl bottom-7 cursor-pointer bg-green-500 text-white font-bold py-2 px-4 rounded text-center flex justify-center">+</Link>
            <table className="w-full text-center">
                <thead>

                    <tr>
                        <th>Product Id</th>
                        <th>Name</th>                        
                        <th>Image</th>                       
                        <th>Labled Price</th>                        
                        <th>Price</th>                        
                        <th>Stock</th>


                    </tr>

                </thead>
                <tbody>
                       {
                        products.map(
                            (items,index)=>{
                                return(

                                       <tr key={index}>
                                            <td>{items.productID}</td>
                                            <td>{items.name}</td>
                                            <td><img src={items.images[0]} className="w-[50px]h-[50px]"/></td>
                                            <td>{items.labelledPrice}</td>
                                            <td>{items.price}</td>
                                            <td>{items.stock}</td>

                                       </tr>
                                )

                            }




                        )
                       
                       
                       
                       
                       }



                </tbody>
                  

            </table>
            
            
         </div>





    )
}