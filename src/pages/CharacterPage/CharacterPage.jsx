import { useEffect, useState } from 'react';

import ChangePage from '../../components/ChangePage/ChangePage';
import Character from '../../components/Character/Character';
import Filters from '../../components/Filters/Filters';

import './CharacterPage.css'

const CharacterPage = () => {
    const [pageNumber, setPageNumber] = useState(1)
    const [pageSize, setPageSize] = useState(25)
    const [pages, setPages] = useState({})
    const [characters, setCharacters] = useState([]);
    const [filteredCharacters, setFilteredCharacters] = useState(null)
    
    
    useEffect(() => {
        fetch(`https://www.anapioficeandfire.com/api/characters?page=${pageNumber}&pageSize=${pageSize}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => {
            const responseHeaders = Object.fromEntries(res.headers.entries());
            const links = []
            responseHeaders['link'].split(',').forEach(link => links.push(link.split(';')))
            const newPages = {prev: null, next: null, last: null}

            links.forEach(link => {
                const urlSearchParams = new URLSearchParams(link[0].slice(0, -1).trim().replace('<https://www.anapioficeandfire.com/api/characters?',''));
                if (link[1].includes('prev')) {
                    newPages.prev = urlSearchParams.get('page')
                } else if (link[1].includes('next')) {
                    newPages.next = urlSearchParams.get('page')
                } else if (link[1].includes('last')) {
                    newPages.last = urlSearchParams.get('page')
                } 
            })
            
            setPages(newPages);

            return res.json();
        })
        .then(
            (result) => {
            const newResult = result.map(item => {

                let alive;

                if (item.born === '' && item.died === '') {
                    alive = 'Unknown';
                } else if (item.born !== '' && item.died !== '') {
                    const born = item.born.match(/[0-9]+/g,'')
                    const died = item.died.match(/[0-9]+/g,'')

                    if (born === null || died === null) {
                        alive = 'No';
                    }else {
                        const bYear = Math.round(born.reduce(function(a,b){
                            return Number(a) + Number(b)
                        },0) / born.length)
                        
                        const dYear = Math.round(died.reduce(function(a,b){
                            return Number(a) + Number(b)
                        },0) / died.length)

                        alive = `No, died at ${dYear - bYear} years old`;
                    }                
                } else if (item.born === '') {
                    alive = 'No';
                } else {
                    alive = 'Yes';
                }
                
                return {
                    url: item.url,
                    character: [item.name, ...item.aliases].filter(str => str !== '').join(', '), 
                    alive,
                    gender: item.gender,
                    culture: item.culture !== '' ? item.culture : 'Unknown',
                    allegiances: item.allegiances.length > 0 ? item.allegiances.map(allegiance => allegiance.replace('https://www.anapioficeandfire.com/api/houses/','')) : 'No allegiances', 
                }
            })
            setFilteredCharacters(null);
            setCharacters(newResult);
            
            },
            (error) => {
                console.warn(error)
            }
        )
    },[pageNumber, pageSize])

    return (
        <main className='characters-page'>
            <section className='change-page-filters-wrap'>
                <Filters characters={characters} setFilteredCharacters={setFilteredCharacters}/>
                <ChangePage pageNumber={pageNumber} pageSize={pageSize} setPageNumber={setPageNumber} setPageSize={setPageSize} {...pages}/>
            </section>
            <table className='characters-table'>
                <thead>
                    <tr>
                        <th>Character</th>
                        <th>Alive</th>
                        <th>Gender</th>
                        <th>Culture</th>
                        <th>Allegiances</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCharacters !== null ? 
                    filteredCharacters.map(character => <Character key={character.url} {...character}/>)
                    : characters.map(character => <Character key={character.url} {...character}/>)}
                </tbody>
            </table>
        </main>

    )
}

export default CharacterPage;