import React, { useState } from 'react';
import logo from './Logo.png';
import api from './services/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import './App.css';


function App() {

  //declaração de variaveis e funções para atualização das mesmas
  const [query, setQuery] = useState('')
  const [number, setNumber] = useState('')
  const [arrayImages, setArrayImages] = useState([{}])
  const [filter, setFilter] = useState('')
  const [colors, setColors] = useState('')


  async function handleSubmit(event){
    event.preventDefault() //previne o redirecionamento (atualização da página) do button type submit. Não remover.
    
    const response = await api.get('',{
      params: {
        key : '13841525-dadc1e521815a49582811ac57', //key para realizar requisições para a api da Pixabay
        q : query, //pesquisa, termo digitado pelo usuário
        per_page : number, //numero de resultados
        image_type : filter, // filtro tipo de imagem
        colors: colors //filtro por cor
      }
    })
    setArrayImages(response.data.hits) //atualizar o array de imagens para renderização dos resultados
    console.log(arrayImages)
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <form onSubmit={handleSubmit}>
          <div className="search">
            <input
              id="query"
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Pesquisar por imagens"
            />
            <button type="submit" className="btn"><FontAwesomeIcon icon={faSearch} /></button>
          </div>
          <div className="filters">

            <div id="numberImg">
              <h5>Nº imagens</h5>
              <input 
                id="number"
                name="number"
                value={number}
                onChange={event => setNumber(event.target.value)}
                type="number"
                min="3"
                max="200"
              />
            </div>

              <select onChange={event => setFilter(event.target.value)}>
                <option value="all">All</option>
                <option value="photo">Photo</option>
                <option value="illustration">Illustration</option>
                <option value="vector">Vector</option>
              </select> 

              <select onChange={event => setColors(event.target.value)}>
                <option value="grayscale">Grayscale</option>
                <option value="transparent">Transparent</option>
                <option value="red">Red</option>
                <option value="pink">Pink</option>
                <option value="lilac">Lilac</option>
                <option value="blue">Blue</option>
                <option value="turquoise">Turquoise</option>
                <option value="yellow">Yellow</option>
              </select> 

              
            </div>

          
        </form>
      </header>

      <ul className="images-list">
          {arrayImages.map( image => (
              <li key={image.id}>
                  <header style={{ backgroundImage: `url(${image.previewURL})` }} ></header>
                  <span> <a href={image.pageURL} id="source" > <h6>Source </h6></a> </span>
              </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
