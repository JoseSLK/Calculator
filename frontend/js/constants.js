// constants.js
export const METHODS = {
    "1": { name: "Punto Fijo", equations: 1, points: 1 },
    "2": { name: "Bisección", equations: 1, points: 2 },
    "3": { name: "Secante", equations: 1, points: 2 },
    "4": { name: "Newton Raphson", equations: 2, points: 1 },
    "5": { name: "Broyden", equations: 2, points: 1 },
    "6": { name: "Newton Raphson (Sistemas)", equations: 2, points: 2 }
};

export const symbolMap = {
    '√': 'sqrt',
    '^': '**',
    'sen': 'sin',
    'X': 'x',
};
