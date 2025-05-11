
export default function ProductCard(props){

    console.log(props)
    return(
        <div  className="card">
            <img className="productImage" src={props.picture}/>
            <h1>{props.name}</h1>
            <p>{props.description}</p>
            <h2>Price: ${props.price}</h2>
            <button className="addToCart">Add To Cart</button>
            <button className="buyNow">Buy Now</button>

        </div>

    )
}