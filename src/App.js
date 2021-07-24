import './App.css';
import Test from './components/Test';
import Table from './components/Table';
import {data} from './data/test_data';
import {data as data2} from './data/test_data_v2';
import DataManager from './classes/DataManager';
import DataManager2 from './classes/DataManager_v2';

const dataManager = new DataManager(data);
const dataManager2 = new DataManager2(data2);

function App() {
  return (
    <div className="App">
      <Test dataManager={dataManager2}/>
      
      <Table dataManager={dataManager} />
    </div>
  );
}

export default App;