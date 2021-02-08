import React, {useEffect} from 'react'
import Store from './redux/Store'
import Home from './Home/Home'

function App() {
  //from to hits-(recipe-(calories healthLabels image ingredients-(text-weight-image) label))
  //Helpful How To's, Quick Dinner Ideas, Get More Baking Inspiration, More From Well Done
  let api = '93494a6efe55c26ccdebc7666e7cdcd6'
  let id = '02a8559a'

  return (
    <div>
      <Store>
        <Home></Home>
      </Store>
    </div>
  );
}

export default App;
