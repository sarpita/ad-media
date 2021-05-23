import './App.css';
import Dashboard from './dashboard';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import ProductDetails from "./productDetails";
import {useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const onIconClick =()=>{
    dispatch({type:'show_filters',payload:true})
  }
  return (
    <div className="App">
      <header className="App-header">   
      <span className="filters-icon" onClick={onIconClick}></span>
      </header>   
      <BrowserRouter> 
      <Switch>
        <Route exact path="/">
          <Dashboard/>
        </Route>
        <Route path="/:productName">
          <ProductDetails/>
        </Route>
      </Switch>
      </BrowserRouter>       
    </div>
  );
}

export default App;
