export default function Paged({ videogames,paged,gamePerPage}){
    const numberPag = []
    for(let i=1; i<=Math.ceil(videogames/gamePerPage); i++){
        numberPag.push(i)
    }
    return (
        <div>
             {numberPag&&numberPag.map(n =>(
                    <>
                        <button onClick={() => paged(n)} key={n}>{n} </button>
                    </>
                ))
                }
        </div>
    )
}