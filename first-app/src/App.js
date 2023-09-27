import {useState} from 'react'
import './App.css';
import lists from './data'
import Axios from 'axios'

function App() {
  const [q1, setQ1] = useState("")
  const [q2, setQ2] = useState("")
  const [q3, setQ3] = useState("")

  const handleSelect = (q, a) => {
    const ques = lists.map(list => list.q)
    if (q === ques[0]) {
      setQ1(a)
    } else if (q === ques[1]) {
      setQ2(a)
    } else if (q === ques[2]) {
      setQ3(a)
    }
  }
  const handleSubmit = () => {
    Axios.post('http://localhost:5001/api/add', {
      q1, q2, q3
    }).then((res) => console.log(res.data))
    getData()
  }
  const getData = () => {
    Axios.get('http://localhost:5001/api/get')
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
  }

  return (
    <div className="App">
      {lists.map((list, i) => (
        <div key={i} className="main-cont">
          <h2 className="ques">{list.q}</h2>
          <div className="ans-cont">
            <button onClick={() => handleSelect(list.q, "1")}>{list.ans[1]}</button>
            <button onClick={() => handleSelect(list.q, "2")}>{list.ans[2]}</button>
            <button onClick={() => handleSelect(list.q, "3")}>{list.ans[3]}</button>
            <button onClick={() => handleSelect(list.q, "4")}>{list.ans[4]}</button>
            <button onClick={() => handleSelect(list.q, "5")}>{list.ans[5]}</button>
          </div>
        </div>
      ))}
      <button className="submit" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
