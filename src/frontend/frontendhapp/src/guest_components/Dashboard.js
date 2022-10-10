import React, {useEffect, useState} from "react";

export default function Dashboard() {

    const url = "http://localhost:8080/happ/table/1";
    const [area, setArea] = useState(null);

    useEffect(() => {
        // eslint-disable-next-line no-unused-expressions
        fetch(url)
            .then((res) => {
                setArea(res.data);
                return res.json();
            })
            .then((json) => {
                setArea(json)
            })
            .catch(err => {
                console.log(err)
            })
    }, [url])

    return(
        <>

            <div className="container text-center py-4">
                <h1>
                    {JSON.stringify(area)}

                </h1>

            </div>
        </>
    )
}


