import React from 'react';

export default function Paginado ({dogsPerPage, allDogs, paginado}){
    const pagingNums = []

    for (let i = 0; i <= Math.ceil(allDogs/dogsPerPage)-1; i++) {
        pagingNums.push(i+1);
        
    }
    return (
        <nav>
              <ul className='paginado'>
                  
                  {
                   pagingNums && pagingNums.map(numero => (
                      <li className='numero' key={numero}>
                          <button onClick={() => paginado(numero)}> {numero} </button>
                      </li>
                   ))}
              </ul>
        </nav>
    )

}