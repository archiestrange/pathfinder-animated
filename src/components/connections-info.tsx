import * as React from "react";
import { destinations } from "../functions/utils";
import { routesAvailable } from "../functions/get-available-routes";

const renderDestinationConnections = () => {
    return destinations.map(d =>
        <tr>
            <td>{d}</td>
            <td>
                {routesAvailable(d).map(r =>
                    `${r.destination} - ${r.distance}`
                ).join(" | ")}
            </td>
        </tr>
    )
}

export function ConnectionsInfo() {

    return <div id="connections-info-container">
        <table>
            <thead>
                <tr>
                    <th>Route</th>
                    <th>Available Routes</th>
                </tr>
            </thead>
            <tbody>
                {renderDestinationConnections()}
            </tbody>
        </table>
    </div>
}