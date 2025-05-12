import { Link } from "react-router-dom";
import UserData from "./userData";


export default function Header(){
    return(
        <div className="bg-red-500">
           <Link to="/">home</Link>
           <Link to="/signup">sign up</Link>
           <Link to="/login">login</Link>


        </div>
    )
}