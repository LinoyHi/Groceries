import { useEffect, useState } from 'react';
import './App.css';
import getitems from './DAL/dal';
import { GrocItem } from './myComponents/grocItem';

function App() {
  const [items,setitems]= useState()

  function itemClicked(){
    return 'sucses'
  }

  useEffect(()=>
  setitems(getitems())
  ,[])
  return (
    <div className="App">
      <header>
      </header>
      <body>
        {items?.map(item=><GrocItem func={itemClicked} name={item.name} price={item.price} src={item.imgLink} quantity={item.quantity}/>)}
      </body>
      <footer>
      </footer>
    </div>
  );
}

export default App;
