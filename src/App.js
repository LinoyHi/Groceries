import { useEffect, useState } from 'react';
import './App.css';
import getitems from './DAL/dal';
import { GrocItem } from './myComponents/grocItem';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [show, setShow] = useState(false);
  const [modalBody, setmodalbody] = useState('Are you sure?')
  const [items, setitems] = useState()
  const [shoppingItems, setshoppingItems] = useState({})
  const [totals, settotals] = useState({ price: 0, items: 0 })
  const [shoppinglistArr, setshoppinglist] = useState([])
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => shoppingList(), [shoppingItems])

  useEffect(() =>
    setitems(getitems())
    , [])

  function itemClicked(e) {
    const id = e.target.parentElement.id
    if (id || id === 0) {
      const item = { ...items[id] }
      if (shoppingItems[item.name]) {
        item.quantity = shoppingItems[item.name].quantity + 1
      }
      else {
        item.quantity = 1
      }
      settotals({ price: totals.price + item.price, items: totals.items + 1 })
      item.price = item.quantity * item.price
      const shoppingcart = { ...shoppingItems }
      shoppingcart[item.name] = item
      setshoppingItems(shoppingcart)
      items[id].quantity -= 1
    }
  }

  function shoppingList() {
    let current = []
    for (const i in shoppingItems) {
      const item = shoppingItems[i]
      current.push(<GrocItem id={item.id} name={item.name} price={item.price} src={item.imgLink} quantity={item.quantity} />)
      setshoppinglist(current)
    }
  }

  function orderApproved() {
    setmodalbody(
      <div>
        <h2>summery</h2>
        <table style={{ margin: "auto" }}>
          <thead>
            <th className='borders'>total items</th>
            <th className='borders'>total price</th>
          </thead>
          <tbody>
            <tr>
              <td className='borders'>{totals.items}</td>
              <td className='borders'>{totals.price}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  function reset(){
    setitems(getitems())
    settotals({ price: 0, items: 0 })
    setshoppingItems({})
    setshoppinglist([])
    handleClose()
    setmodalbody('Are you sure?')
  }

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
          <h2>summery</h2>
          <table style={{ margin: "auto" }}>
            <thead>
              <th className='borders'>total items</th>
              <th className='borders'>total price</th>
            </thead>
            <tbody>
              <tr>
                <td className='borders'>{totals.items}</td>
                <td className='borders'>{totals.price}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={handleShow} style={{ width: '8vw' }}>Order</button>
          <Modal style={{ textAlign: "center", fontSize: "2vw" }} show={show} onHide={handleClose}>
            <Modal.Body>{modalBody}</Modal.Body>
            {modalBody === 'Are you sure?' ?
              <Modal.Footer>
                <Button onClick={handleClose}>
                  No
                </Button>
                <Button onClick={orderApproved}>
                  Yes
                </Button>
              </Modal.Footer> :
              <Modal.Footer>
                <Button onClick={reset}>
                  close
                </Button>
              </Modal.Footer>}
          </Modal>
        </ul>
      </body>
      <footer>
      </footer>
    </div>
  );
}

export default App;
