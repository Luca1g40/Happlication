import {Link} from "react-router-dom";
import ProductCRUD from "../components/menu/ProductCRUD";

export default function Home() {
    return <>
        {/*<div className="homeContainer">*/}
            {/*<div className="introText">*/}
            {/*    <h1>Little Osaka</h1>*/}
            {/*    <p>Welkom bij restaurant Little Osaka. Dé culinaire hotspot in het centrum van Utrecht.*/}
            {/*        Ontdek hier de Aziatische keuken in een sfeervolle ambiance voor lunch en diner.*/}
            {/*        Ons stijlvol ingerichte restaurant heeft twee verdiepingen en biedt plaats aan 200 gasten.*/}
            {/*        Little Osaka biedt naast deze 200 zitplaatsen ook buiten plek op ons terras met uitzicht op de*/}
            {/*        grachten van Utrecht.*/}
            {/*        Aziatische beleving in een luxe sfeer aan de oudste grachten van Utrecht.*/}
            {/*        Wij bieden de keuze uit meer dan 120 hoogstaande originele Fusion-, Wok- Sushi- en*/}
            {/*        Grill-gerechten.</p>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <Link className="button drankjes" to="Drinks">Dranken</Link>*/}
            {/*</div>*/}
            {/*<div>*/}
            {/*    <Link className="button gerechten" to="Foods">Gerechten</Link>*/}
            {/*</div>*/}
            <ProductCRUD/>
        {/*</div>*/}
    </>
}

