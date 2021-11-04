import { useState } from 'react';
import './Filters.css';

const Filters = ({characters, setFilteredCharacters}) => {
    const [culture, setCulture] = useState('');
    const [gender, setGender] = useState('Any');
    
    const handleCultureChange = e => setCulture(e.target.value);
    const handleGenderChange = e => setGender(e.target.value);
    
    const handleClick = e => {
        if (culture.trim() === '' && gender === 'Any') {
            setFilteredCharacters(null);
        } else {
            setFilteredCharacters(characters.filter(character => {
                if (culture.trim() !== '' && gender !== 'Any') return character.culture === culture && character.gender === gender
                else if (culture.trim() !== '') return character.culture === culture
                else return character.gender === gender
            }))
        }
    }

    return (
        <article>
            <section className='culture-wrap'>
                <label for='culture'>Culture</label>
                <input id='culture' type="text" value={culture} onChange={handleCultureChange}/>
            </section>
            <section className='gender-wrap'>
                <label for='select-gender'>Gender</label>
                <select id='select-gender' value={gender} onChange={handleGenderChange}>
                    <option value="Any">Any</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </section>
            <section className='button-wrap'>
                <button onClick={handleClick}>Filter</button>
            </section>
        </article>
    )
}

export default Filters;