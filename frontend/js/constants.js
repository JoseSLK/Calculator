export const METHODS = {
    "1": { name: "Punto Fijo", equations: 1, points: 1 },
    "2": { name: "Bisección", equations: 1, points: 2 },
    "3": { name: "Secante", equations: 1, points: 2 },
    "4": { name: "Newton Raphson", equations: 2, points: 1 },
    "5": { name: "Broyden", equations: 2, points: 1 },
    // "6": { name: "Newton Raphson (Sistemas)", equations: 2, points: 2 },
    "7": { name: "Jacobi", equations: 2, points: 1 },
    "8": { name: "Gauss Seidel", equations: 2, points: 1},
    "9": { name: "Trapecios", equations: 1, points: 3},
    "10": { name: "Simpson", equations: 1, points: 3}
};

export const NAMEPOINT = {
    "1": ["Punto inicial"], 
    "2": ["Punto inicial 1", "Punto inicial 2"], 
    "3": ["Punto inicial 1", "Punto inicial 2"], 
    "4": ["Punto inicial"],
    "9": ["Limite inferior", "Limite superior", "Valor de n intervalos"],
    "10": ["Limite inferior", "Limite superior", "Valor de n intervalos"]
}