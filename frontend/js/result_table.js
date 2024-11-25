export async function iterationsTableFilling(iterations, container, includeFx = false) {
    if(iterations && iterations.length > 0) {
        const table = document.createElement('table');
        table.className = "table table-striped mt-3";

        const header = document.createElement('thead');
        header.innerHTML = `
            <tr>
                <th>Iteración</th>
                <th>x</th>
                <th>Error</th>
                ${includeFx ? '<th>f(x)</th>' : ''}
            </tr>
        `;
        table.appendChild(header);

        const body = document.createElement('tbody');
        iterations.forEach((iter) => {
            const row = document.createElement('tr');
            row.innerHTML =`
                <td>${iter.iteracion}</td>
                <td>${iter.x}</td>
                <td>${iter.error}</td>
                ${includeFx ? `<td>${Array.isArray(iter['f(x)']) ? iter['f(x)'].join(', ') : iter['f(x)']}</td>` : ''}
            `;
            body.appendChild(row);
        });

        table.appendChild(body);
        container.appendChild(table);
    }
}