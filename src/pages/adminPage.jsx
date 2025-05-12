
import { Link } from "react-router-dom"
import { BrowserRouter, Routes, Route} from 'react-router-dom'


export default function AdminPage() {


    return(
        <div className="w-full h-screen flex">
            <div className="h-full w-[300px] bg-blue-900 flex flex-col">
                   
                    <Link to="/admin/products">Products</Link>       
                    <Link to="/admin/users">Users</Link>
                    <Link to="/admin/orders">orders</Link>
                    <Link to="/admin/reviews">Reviews</Link>



            </div>


             <div className="h-full w-[calc(100%-300px)] bg-yellow-500">

                    <Routes path="/*">
                        <Route path="/products" element={<h1>Products</h1>}/>
                        <Route path="/users" element={<h1>Users</h1>}/>
                        <Route path="/orders" element={<h1>orders</h1>}/>
                        <Route path="/reviews" element={<h1>Reviews</h1>}/>

          
                    </Routes>
            
            
            </div>


        </div>
    )

}
