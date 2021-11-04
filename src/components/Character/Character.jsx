import { Link } from "react-router-dom";

const Character = ({character, alive, gender, culture, allegiances}) => {
    return (
        <tr className='character'>
            <td>{character}</td>
            <td>{alive}</td>
            <td>{gender}</td>
            <td>{culture}</td>
            <td>
            {Array.isArray(allegiances) ? 
            allegiances.map(allegiance => <Link style={{marginRight:'8px'}} key={allegiance} to={`houses/${allegiance}`}>{allegiance}</Link>)
            : allegiances}
            </td>
        </tr>
    )
}

export default Character;