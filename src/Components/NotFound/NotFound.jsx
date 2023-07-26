import React from "react";
import { useLocation } from "react-router-dom";

export default function NotFound()
{
    let location = useLocation();

    return(
        <div className="notfound">
            <h1>Page non trouvée</h1>
            <p>Désolé, la page '{location.pathname}' que vous recherchez n'existe pas.</p>
        </div>
    )
}