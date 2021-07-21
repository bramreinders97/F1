import './App.css';
import Test from './components/test_class';
// import Table from './components/Table';
import {data} from './data/test_data';
import DataManager from './classes/DataManager';

const dataManager = new DataManager(data);

function App() {
  return (
    <div className="App">
      <Test dataManager={dataManager}/>
    </div>
  );
}

export default App;