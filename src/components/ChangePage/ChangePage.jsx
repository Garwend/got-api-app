import './ChangePage.css';

const ChangePage = ({pageNumber, setPageNumber, pageSize, setPageSize, prev, next, last,}) => {
    
    const handleChange = e => {
        setPageSize(e.target.value);
        setPageNumber(1);
    }

    return (
    <article className="change-page-wrap">
        <p>page <span>{pageNumber}</span> of <span>{last}</span></p>
        <nav className='buttons-wrap'>
            <button disabled={pageNumber === 1 ? true : false} onClick={() => setPageNumber(1)}>first</button>
            <button disabled={prev === null ? true : false} onClick={() => setPageNumber(prev)}>prev</button>
            <button disabled={next === null ? true : false} onClick={() => setPageNumber(next)}>next</button>
            <button disabled={pageNumber === last ? true : false} onClick={() => setPageNumber(last)}>last</button>
        </nav>
        <section style={{textAlign:'right', marginTop: '10px'}}>
            <p>number of results per page</p>
            <select className='select-number-of-results' value={pageSize} onChange={handleChange}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
            </select>
        </section>
    </article>
    )

}

export default ChangePage;