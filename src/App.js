import './App.css';
import Table from './components/Table';
import {driver_table, teams_overview, team_scores} from './data/test_data';

const x = driver_table[1].driver_id;

function App() {
  return (
    <div className="App">
      <Table driver={x} />
    </div>
  );
}

export default App;