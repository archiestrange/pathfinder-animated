import { CalculationItem, Destination, CalculationResult } from "../types";

export const destinations = Object.keys(Destination).map(d => Destination[d as any]) as Destination[];

export function convertResultToStringArray(result: CalculationItem[]): CalculationResult[] {
    const resultText: CalculationResult[] = [];
    result.forEach((r, idx) => {
        const position = idx === 0 ? "Fastest Path" : `Path ${idx + 1}`;
        const details = `${position}: ${r.usedRoutes.map(ur => `${ur.start} - ${ur.end}`).join(", ")} | Distance: ${r.total}`;
        const item = { id: idx, details };
        resultText.push(item);
    });

    return resultText;
}

export function getOrbIdValue(destination: Destination) {
    switch(destination) {
        case Destination.A:
            return "container-a";
        case Destination.B:
            return "container-b";
        case Destination.C:
            return "container-c";
        case Destination.D:
            return "container-d";
        case Destination.E:
            return "container-e";
        case Destination.F:
            return "container-f";
        case Destination.G:
            return "container-g";
        case Destination.H:
            return "container-h";
    }
}