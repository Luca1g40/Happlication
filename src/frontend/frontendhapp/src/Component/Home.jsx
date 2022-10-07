import {Link} from "react-router-dom";

export default function Home() {
    return <>
        <h1>Happlication</h1>
        <div>
            <Link className="button drankjes" to="Drinks">Dranken</Link>
        </div>
        <div>
            <Link className="button gerechten" to="Foods">Gerechten</Link>
        </div>

            </>

}