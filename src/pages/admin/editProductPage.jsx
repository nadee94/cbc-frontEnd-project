import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import mediaUpload from "../../utils/mediaUpload";
import axios from "axios";

export default function EditProductpage(){
  
  const location=useLocation()
  const [productID, setProductID] = useState(location.state.productID);
  const [name, setName] = useState(location.state.name);
  const [altNames, setAltNames] = useState(location.state.altNames.join(","));
  const [description, setDescription] = useState(location.state.description);
  const [images, setImages] = useState([]);
  const [labelledPrice, setLabelledPrice] = useState(location.state.labelledPrice);
  const [price, setPrice] = useState(location.state.price);
  const [stock, setStock] = useState(location.state.stock);
  const navigate=useNavigate()



  async function UpdateProduct(e){
    
    const token=localStorage.getItem("token")
    if(token==null){
        toast.error("plaease login first")
        return

    }

    let imageUrls=location.state.images

    const promisesArray=[]

    for(let i=0;i<images.length;i++){
        promisesArray[i]=mediaUpload(images[i])
    }

    try{

        if(images.length>0){
         imageUrls=await Promise.all(promisesArray)

        }

       console.log(imageUrls)

       const altNameArray=altNames.split(",")

       const product={
        productID:productID,
        name:name,
        altNames:altNameArray,
        description:description,
        images:imageUrls,
        labelledPrice:labelledPrice,
        price:price,
        stock:stock
       }

    axios.put(import.meta.env.VITE_BACKEND_URL+"/api/products/"+productID,product,{
        headers:{
              "Authorization":"Bearer "+token
        }
    }).then(()=>{
        toast.success("product updated successfully")
        navigate("/admin/products")

    }).catch((e)=>{
        toast.error(e.response.data.message)
                    console.log(e)

    })
       

    }catch(e){
            console.log(e)

    }

   

  }


    return(
        <div className="w-full h-full flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold mb-4">Edit Product</h1>
            <input type="text" disabled placeholder="Product ID" className="input input-bordered w-full max-w-xs" value={productID} onChange={(e)=>{setProductID(e.target.value)}}/>
            <input type="text" placeholder="Name" className="input input-bordered w-full max-w-xs" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Alt Names" className="input input-bordered w-full max-w-xs" value={altNames} onChange={(e) => setAltNames(e.target.value)} />
            <input type="text" placeholder="Description" className="input input-bordered w-full max-w-xs" value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type="file" placeholder="Images" multiple className="input input-bordered w-full max-w-xs" onChange={(e) => setImages(e.target.files)} />
            <input type="number" placeholder="Labelled Price" className="input input-bordered w-full max-w-xs" value={labelledPrice} onChange={(e) => setLabelledPrice(Number(e.target.value))} />
            <input type="number" placeholder="Price" className="input input-bordered w-full max-w-xs" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
            <input type="number" placeholder="Stock" className="input input-bordered w-full max-w-xs" value={stock} onChange={(e) => setStock(Number(e.target.value))} />

            <div className="w-full flex justify-center items-center mt-4 flex-row">
                <Link to="/admin/products" className="bg-red-500 text-white font-boldpy-2 px-4 rounded mr-4">Cancel</Link>
                <button className="bg-green-500 text-white font-bold py-2 px-4 rounded" onClick={UpdateProduct}>Update Product</button>
            </div>
        </div>
    )
}