import './App.css';
import Test from './components/Test';
import Table from './components/Table';
// import {data as data2} from './data/test_data_v2';
import DataManager from './classes/DataManager_v2';
import { useEffect, useState } from 'react';


function App() {

  const [renderTable, setRenderTable] = useState(false);
  const [dataManager, setDataManager] = useState();

  useEffect( () => {

    const url = process.env.REACT_APP_BASE_URL;

    fetch(url+'/api').then(
      response => response.json()
    ).then( data => {
        setDataManager(new DataManager(data));
        setRenderTable(true);
       });    
  },[]); //if you forget the [] we end up with endless loop


  if (renderTable) {
    return (
      <div className="App">
        
        {/* <Test dataManager={dataManager}/> */}
        
        <Table dataManager={dataManager} />     
      </div>
    );
  } else {
    return (
      <h3 className='patience'>Some patience please, API is working hard</h3>
    );
  };
}

export default App;