import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import './HousePage.css'

const HousePage = () => {
    const [isError, setIsError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [houseDetails, setHouseDetails] = useState({});
    const { id } = useParams();
    
    useEffect(()=>{
        fetch(`https://www.anapioficeandfire.com/api/houses/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(
            (result) => {
                setHouseDetails({
                    name: result.name,
                    region: result.region !== '' ? result.region : 'Unknown',
                    hasDiedOut: result.diedOut !== '' ? 'Yes' : 'No',
                    coatOfArms: result.coatOfArms !== '' ? result.coatOfArms : 'Unknown',
                    words: result.words !== '' ? result.words : 'Unknown',
                    titles: result.titles[0] !== '' ? result.titles.join(', ') : 'Unknown',
                    seats: result.seats[0] !== '' ? result.seats.join(', ') : 'Unknown',
                    hasOverloard: result.overloard !== '' ? 'Yes' : 'No',
                    numberOfCadetBranches: result.cadetBranches.length,
                })
                setIsLoaded(true);
                setIsError(false);
            },
            (error) => {
                setIsLoaded(true);
                setIsError(true);
            }
        )
    },[id])

    if (!isLoaded) {
        return <div>Loading...</div>
    } else {
        if (isError) {
            return (
            <div style={{textAlign:'center'}}>
                <h1>404</h1>
                <h2>Page not found</h2>
                <Link to='/'>home page</Link>
            </div>
            )
        } else {
            return (
                <main className='house-page'>
                    <header>
                        <Link to='/'><span className="material-icons">arrow_back</span></Link>
                        <h1>{houseDetails.name}</h1>
                    </header>
                    <table className='house-table'>
                        <thead>
                            <tr>
                                <th>Coat of Arms</th>
                                <th>Region</th>
                                <th>Words</th>
                                <th>Titles</th>
                                <th>Seats</th>
                                <th>Has died out</th>
                                <th>Has overlord</th>
                                <th>Number of Cadet Branches</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{houseDetails.coatOfArms}</td>
                                <td>{houseDetails.region}</td>
                                <td>{houseDetails.words}</td>
                                <td>{houseDetails.titles}</td>
                                <td>{houseDetails.seats}</td>
                                <td>{houseDetails.hasDiedOut}</td>
                                <td>{houseDetails.hasOverloard}</td>
                                <td>{houseDetails.numberOfCadetBranches}</td>
                            </tr>
                        </tbody>
                    </table>
                </main>
            )
        }
    }

    
}

export default HousePage;