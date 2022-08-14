export function GrocItem(props){
    return(
        <div>
            <p className={props.quantity===0?'outofstock':''} id={props.id} onClick={(e)=>props.func(e)}><img className="grocListImg" src={props.src}></img><span className="borders">{props.name}</span><span className="borders">{props.price}</span><span className="borders">{props.quantity}</span></p>
            <p className={props.quantity===0?'outWords':'d-none'}><img style={{width:"1.5vw",height:"1.5vw"}} src='https://thumbs.dreamstime.com/z/out-stock-stamp-red-rubber-stamp-white-background-out-stock-stamp-sign-out-stock-stamp-out-stock-stamp-red-rubber-136844369.jpg'></img>out of stock</p>
        </div>
    )
}