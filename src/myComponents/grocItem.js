export function GrocItem(props){
    return(
            <p id={props.id} onClick={(e)=>props.func(e)}><img className="grocListImg" src={props.src}></img><span className="borders">{props.name}</span><span className="borders">{props.price}</span><span className="borders">{props.quantity}</span></p>
    )
}