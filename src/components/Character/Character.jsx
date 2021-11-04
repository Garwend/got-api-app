
const Character = ({character, alive, gender, culture, allegiances}) => {
    return (
        <tr className='character'>
            <td>{character}</td>
            <td>{alive}</td>
            <td>{gender}</td>
            <td>{culture}</td>
            <td>{allegiances}</td>
        </tr>
    )
}

export default Character;