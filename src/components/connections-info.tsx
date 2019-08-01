import * as React from "react";
import { destinations } from "../functions/utils";
import { routesAvailable } from "../functions/get-available-routes";
import { Destination } from "../types";

// Table display of all possible connections from each destination
export function ConnectionsInfo() {

    // Route connection information text
    const routeConnections = (d: Destination): string => 
        routesAvailable(d).map(r => `${r.destination} - ${r.distance}`).join(" | ");

    // Render row for each destination
    const renderRows: JSX.Element[] = destinations.map(d => <tr key={d}>
            <td>{d}</td>
            <td>
                {routeConnections(d)}
            </td>
        </tr>
    );

    return (
        <div id="connections-info-container">
            <table>
                <thead>
                    <tr>
                        <th>Route</th>
                        <th>Available Routes</th>
                    </tr>
                </thead>
                <tbody>
                    {renderRows}
                </tbody>
            </table>
        </div>
    );
}