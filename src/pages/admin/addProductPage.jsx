import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import mediaUpload from "../../utils/mediaUpload";
import axios from "axios";

export default function AddProductpage(){

  const [productID, setProductID] = useState('');
  const [name, setName] = useState('');
  const [altNames, setAltNames] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [labelledPrice, setLabelledPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const navigate=useNavigate()



  async function AddProduct(e){
    
    const token=localStorage.getItem("token")
    if(token==null){
        toast.error("plaease login first")
        return

    }

    if(images.length<=0){
        toast.error("plaease select atleast one image")
        return
    }

    const promisesArray=[]

    for(let i=0;i<images.length;i++){
        promisesArray[i]=mediaUpload(images[i])
    }

    try{
       const imageUrls=await Promise.all(promisesArray)
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

    axios.post(import.meta.env.VITE_BACKEND_URL+"/api/products",product,{
        headers:{
              "Authorization":"Bearer "+token
        }
    }).then(()=>{
        toast.success("product added successfully")
        navigate("/admin/products")

    }).catch((e)=>{
        toast.error(e.response.data.message)
    })
       

    }catch(e){
            console.log(e)

    }

   

  }


    return(
        <div className="w-full h-full flex flex-col justify-center items-center">
            <input type="text" placeholder="Product ID" className="input input-bordered w-full max-w-xs" value={productID} onChange={(e)=>{setProductID(e.target.value)}}/>
            <input type="text" placeholder="Name" className="input input-bordered w-full max-w-xs" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Alt Names" className="input input-bordered w-full max-w-xs" value={altNames} onChange={(e) => setAltNames(e.target.value)} />
            <input type="text" placeholder="Description" className="input input-bordered w-full max-w-xs" value={description} onChange={(e) => setDescription(e.target.value)} />
            <input type="file" placeholder="Images" multiple className="input input-bordered w-full max-w-xs" onChange={(e) => setImages(e.target.files)} />
            <input type="number" placeholder="Labelled Price" className="input input-bordered w-full max-w-xs" value={labelledPrice} onChange={(e) => setLabelledPrice(Number(e.target.value))} />
            <input type="number" placeholder="Price" className="input input-bordered w-full max-w-xs" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
            <input type="number" placeholder="Stock" className="input input-bordered w-full max-w-xs" value={stock} onChange={(e) => setStock(Number(e.target.value))} />

            <div className="w-full flex justify-center items-center mt-4 flex-row">
                <Link to="/admin/products" className="bg-red-500 text-white font-boldpy-2 px-4 rounded mr-4">Cancel</Link>
                <button className="bg-green-500 text-white font-bold py-2 px-4 rounded" onClick={AddProduct}>Add Product</button>
            </div>
        </div>
    )
}