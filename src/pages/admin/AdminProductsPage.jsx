
import { useEffect, useState } from "react"
import { sampleProducts } from "../../assets/sampleData"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { FaEdit, FaTrash } from "react-icons/fa"
import toast from "react-hot-toast"


export default function AdminProductsPage(){

    const [products,setProducts]=useState(sampleProducts)
    const [isloading,setIsLoading]=useState(true);
    const navigate=useNavigate();

    useEffect(
        ()=>{
        if(isloading==true){
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products").then(
        (res)=>{

            console.log(res.data)
            setProducts(res.data)
            setIsLoading(false)
        })

        }
        

        },[isloading]
    )

    function deleteProduct(productID){
        const token=localStorage.getItem("token");
        if(token==null){
            toast.error("plaease login first")
            
        }

        axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/products/"+productID,{
            headers:{
              "Authorization":"Bearer "+token
            }
        }).then(()=>{
            toast.success("product delete successfully")
            window.location.reload()
        }).catch((e)=>{
            toast.error(e.response.data.message)
        })
    }

   

    
    

    return(
        <div className="w-full h-full  max-h-full overflow-scroll relative">
            <Link to="/admin/add-product" className="absolute text-4xl bottom-7 cursor-pointer bg-green-500 text-white font-bold py-2 px-4 rounded text-center flex justify-center">+</Link>
           { !isloading?
            <table className="w-full text-center">
                <thead>

                    <tr>
                        <th>Product Id</th>
                        <th>Name</th>                        
                        <th>Image</th>                       
                        <th>Labled Price</th>                        
                        <th>Price</th>                        
                        <th>Stock</th>
                        <th>Action</th>


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
                                            <td>
                                                <div className="flex justify-center items-center w-full">

                                                    <FaTrash className="text-[20px] text-red-500 mx-2 cursor-pointer"
                                                        onClick={()=>{
                                                            deleteProduct(items.productID)
                                                        }}
                                                    
                                                    
                                                    />
                                                    <FaEdit onClick={()=>{
                                                        navigate("/admin/edit-product",
                                                            {state:items}
                                                        )
                                                    }}
                                                    
                                                    className="text-[20px]text text-blue-500 mx-2 cursor-pointer"/>
                                                </div>


                                            </td>

                                       </tr>
                                )

                            }




                        )
                       
                       
                       
                       
                       }



                </tbody>
                  

            </table>
            :<h1>Loading</h1>
            }


            
         </div>





    )
}