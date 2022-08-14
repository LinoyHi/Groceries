import { useEffect, useState } from 'react';
import './App.css';
import getitems from './DAL/dal';

function App() {
  const [items,setitems]= useState()

  useEffect(()=>
  setitems(getitems())
  ,[])
  return (
    <div className="App">
      <header>
      </header>
      <body>
        {items?.map(item=><h1>{item.name}</h1>)}
      </body>
      <footer>
      </footer>
    </div>
  );
}

export default App;
