import React ,{useState} from 'react'
import Search from './components/Search'
import axios from 'axios'
import Results from './components/Results'
import Popup from './components/Popup'

const App = () => {
  const [state, setState] = useState({
    s:'',
    results:[],
    selected:{}
  })
  const apiurl = 'http://www.omdbapi.com/?apikey=7908ad99';
  // search value
  const handleInput = (e)=>{
    let s = e.target.value;
    setState(()=>{
      return {...state,s:s}
    });
  }
  // on key press search
  const search = (e)=>{
    if(e.key === 'Enter'){
      axios(apiurl + '&s=' + state.s).then(({data})=>{
        let results = data.Search
        setState(()=>{
          return {...state,results:results}
        })
      })
    }
  }
  //popup
  const openPopup = (id)=>{
    axios(apiurl+'&i='+id).then(({data})=>{
      let result = data;
      setState((prevstate)=>{
        return{...prevstate, selected: result}
      })
    })
  }

  //close popup 
  const closePopup = ()=>{
    setState(prevstate=>{
      return{...prevstate , selected:{}}
    })
  }



  return (
    <div>
      <header>
        <h1>
          Movie Database
        </h1>
      </header>
      <main>
        <Search  handleInput={handleInput} search = {search}/>
        <Results results={state.results} openPopup={openPopup} />
        {(typeof state.selected.Title != 'undefined') ? <Popup selected={state.selected} closePopup={closePopup} />: false}
      </main>
    </div>
  )
}

export default App