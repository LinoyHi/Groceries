import { useEffect, useState } from 'react';
import './App.css';
import getitems from './DAL/dal';
import { GrocItem } from './myComponents/grocItem';

function App() {
  const [items, setitems] = useState()
  const [shoppingItems, setshoppingItems] = useState({})
  const [totals, settotals] = useState({price:0,items:0})
  const [shoppinglistArr,setshoppinglist]= useState([])

  function itemClicked(e) {
    const id = e.target.parentElement.id
    if (id || id == 0) {
      const item = {...items[id]}
      if (shoppingItems[item.name]) {
        item.quantity = shoppingItems[item.name].quantity + 1
      }
      else {
        item.quantity = 1
      }
      settotals({price:totals.price+item.price,items:totals.items+1})
      item.price = item.quantity * item.price
      const shoppingcart = {...shoppingItems}
      shoppingcart[item.name]= item
      setshoppingItems(shoppingcart)
      items[id].quantity-=1
    }
  }

  function shoppingList() {
    let current = []
    for(const i in shoppingItems){
      const item = shoppingItems[i]
      current.push(<GrocItem id={item.id} name={item.name} price={item.price} src={item.imgLink} quantity={item.quantity} />)
      setshoppinglist(current)
    }
  }

  useEffect(()=>shoppingList(),[shoppingItems])

  useEffect(() =>
    setitems(getitems())
    , [])
  return (
    <div className="App">
      <header>
      </header>
      <body>
        <ul>
          <h1>groceries</h1>
          {items?.map(item => <GrocItem func={itemClicked} id={item.id} name={item.name} price={item.price} src={item.imgLink} quantity={item.quantity} />)}
        </ul>
        <ul>
          <h1>shopping cart</h1>
          {shoppinglistArr}
          <table>
            <thead>
              <th>total items</th>
              <th>total price</th>
            </thead>
            <tbody>
              <tr>
                <td>{totals.items}</td>
                <td>{totals.price}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={true} style={{width:'8vw',margin:"0px 2.5vw 0px 0px"}}>Order</button>
        </ul>
      </body>
      <footer>
      </footer>
    </div>
  );
}

export default App;
