document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("container_sup_t");
    const selectElement = document.getElementById("s_method");

    // Manejador combinado para cargar el contenido según el valor del select
    selectElement.addEventListener("change", () => {
        container.innerHTML = ""; // Limpia el contenedor siempre

        if (selectElement.value === "5") {
            const broydenContent = `
                <div id="broyden-info">
                    <h2>¿Cómo funciona el Método de Broyden?</h2>
                    <p>
                        El método de Broyden es una técnica iterativa para resolver sistemas de ecuaciones no lineales. Sigue estas indicaciones antes de usarlo:
                    </p>
                    <ul>
                        <li>Las variables deben estar estrictamente en orden alfabético (por ejemplo, <code>a</code>, <code>b</code>, <code>c</code>, etc.).</li>
                        <li>El vector inicial también debe corresponder estrictamente a las variables en ese orden.</li>
                    </ul>
                    <p>
                        <strong>Ejemplo:</strong> Resolver el siguiente sistema con un vector inicial \([1, 1, 1]\) y tolerancia \(0.00001\):
                    </p>
                    <div class="example">
                        <pre>
f₁(a, b, c) = a² - b + c - 3
f₂(a, b, c) = a - b³ + cos(c) - 1
f₃(a, b, c) = sin(a) + b - c²
Vector inicial: [1, 1, 1]
                        </pre>
                    </div>
                    <p>
                        El método iterará hasta encontrar una solución dentro de la tolerancia establecida. Para este sistema, la solución obtenida es:
                    </p>
                    <div class="solution">
                        <pre>
a ≈ 1.5918, b ≈ 0.9191, c ≈ 1.3852
                        </pre>
                    </div>
                    <p>
                        ¡Prueba este método y encuentra soluciones precisas para tus sistemas de ecuaciones no lineales!
                    </p>
                </div>
            `;
            container.innerHTML = broydenContent;
        } else if (selectElement.value === "default") { // Cambia "default" según tu opción esperada
            const teamContent = `
                <div class="team-info">
                    <h3>Integrantes del Equipo</h3>
                    <ul>
                        <li><a href="https://github.com/henrypro32" target="_blank">Henry Leonardo Rodríguez Páez</a></li>
                        <li><a href="https://github.com/JoseSLK" target="_blank">Jose L Salamanca</a></li>
                        <li><a href="https://github.com/NicolasT08" target="_blank">Nicolas Samuel Tinjaca Topia</a></li>
                        <li><a href="https://github.com/jefersonmadera" target="_blank">Jefferson Santiago Madera Gaona</a></li>
                    </ul>
                    <p class="quote">✨ <em>"¿Por qué hacer cosas serias cuando podemos hacerlas épicas?"</em> ✨</p>
                    <div class="invitation">
                        <p>
                            Invitamos cordialmente al <strong>Ing. Fredy Alarcón</strong> a probar nuestra calculadora.<br>
                            <span class="please">¡Por favor, tenga piedad! 🙏</span>
                        </p>
                    </div>
                </div>
            `;
            container.innerHTML = teamContent;
        }else if (selectElement.value === "7"){
            const teamContent = `
                <div id="broyden-info">
        <h2>¿Cómo funciona el Método de Jacobi?</h2>
        <p>
            El método de Jacobi es un algoritmo iterativo para resolver sistemas de ecuaciones lineales. Para aplicarlo, cada ecuación debe estar **despejada** respecto a su incógnita principal, y el sistema debe escribirse en un formato específico. Sigue estas indicaciones antes de usarlo:
        </p>
        <ul>
            <li>Despeja cada ecuación respecto a su incógnita principal (\(x₁\), \(x₂\), etc.).</li>
            <li>Coloca los coeficientes en el orden correspondiente a las incógnitas alfabéticamente (por ejemplo, \(x₁\), \(x₂\), \(x₃\), etc.).</li>
            <li>El último espacio de cada fila debe contener el término independiente.</li>
            <li>Asegúrate de proporcionar un vector inicial, que debe seguir el orden de las incógnitas.</li>
        </ul>
        <p>
            <strong>Ejemplo:</strong> Resolver el siguiente sistema con un vector inicial \([0, 0, 0, 0]\) y tolerancia \(10^{-6}\):
        </p>
        <div class="example">
            <pre>
    Sistema original:
    5x₁ - x₂ + x₃ + x₄ = 5
    x₁ + 4x₂ + 0x₃ + x₄ = 2
    3x₁ - x₂ + 6x₃ + 0x₄ = -3
    0x₁ + x₂ - x₃ + 3x₄ = 4

    Sistema despejado:
    x₁ = (5 + x₂ - x₃ - x₄) / 5
    x₂ = (2 - x₁ - x₄) / 4
    x₃ = (-3 - 3x₁ + x₂) / 6
    x₄ = (4 - x₂ + x₃) / 3

    Formato requerido para ingresar al método de Jacobi:
    Fila 1: [0, 1/5, -1/5, -1/5, 1]
    Fila 2: [1/4, 0, 0, -1/4, 1/2]
    Fila 3: [-1/2, 1/6, 0, 0, -1/2]
    Fila 4: [0, 1/3, -1/3, 0, 4/3]
            </pre>
        </div>
        <p>
            El método iterará utilizando este formato despejado, actualizando las aproximaciones iniciales hasta alcanzar una solución dentro de la tolerancia establecida. Para este sistema, la solución obtenida es:
        </p>
        <div class="solution">
            <pre>
    x₁ ≈ 1.0825, x₂ ≈ 1.2190, x₃ ≈ -0.1619, x₄ ≈ 1.7936
            </pre>
        </div>
        <p>
            ¡Prueba el método de Jacobi para resolver tus sistemas de ecuaciones lineales con precisión y facilidad!
        </p>
    </div>
        `;
        container.innerHTML = teamContent;
        } else if (selectElement.value === "8"){
            const teamContent = `
                <div id="broyden-info">
        <h2>¿Cómo funciona el Método de Gauss-Seidel?</h2>
        <p>
            El método de Gauss-Seidel es una técnica iterativa para resolver sistemas de ecuaciones lineales. A diferencia del método de Jacobi, este utiliza los valores actualizados de las incógnitas a medida que avanza cada iteración. Antes de usarlo, sigue estas indicaciones:
        </p>
        <ul>
            <li>Despeja cada ecuación respecto a la incógnita principal (\(x₁\), \(x₂\), etc.).</li>
            <li>Asegúrate de que el sistema esté organizado según el orden alfabético de las incógnitas.</li>
            <li>Introduce las ecuaciones despejadas en el formato requerido para garantizar resultados precisos.</li>
        </ul>
        <p>
            <strong>Ejemplo:</strong> Resolver el siguiente sistema con un vector inicial \([0, 0, 0, 0]\):
        </p>
        <div class="example">
            <pre>
    Sistema original:
    5x₁ - x₂ + x₃ + x₄ = 5
    x₁ + 4x₂ + 0x₃ + x₄ = 2
    3x₁ - x₂ + 6x₃ + 0x₄ = -3
    0x₁ + x₂ - x₃ + 3x₄ = 4

    Sistema despejado (formato de entrada esperado):
    x₁ = (5 + x₂ - x₃ - x₄) / 5
    x₂ = (2 - x₁ - x₄) / 4
    x₃ = (-3 - 3x₁ + x₂) / 6
    x₄ = (4 - x₂ + x₃) / 3
            </pre>
        </div>
        <p>
            <strong>Formato requerido para ingresar al método de Gauss-Seidel:</strong>
        </p>
        <div class="example">
            <pre>
    Fila 1: [0, 1/5, -1/5, -1/5, 1]
    Fila 2: [1/4, 0, 0, -1/4, 1/2]
    Fila 3: [-1/2, 1/6, 0, 0, -1/2]
    Fila 4: [0, 1/3, -1/3, 0, 4/3]
            </pre>
        </div>
        <p>
            En este formato:
        </p>
        <ul>
            <li><strong>Primera posición:</strong> Coeficiente de la incógnita principal (que siempre será cero porque está despejada).</li>
            <li><strong>Segunda posición:</strong> Coeficiente de la primera incógnita del lado derecho (\(x₂\), \(x₃\), etc.).</li>
            <li><strong>Última posición:</strong> Término independiente del lado derecho de la ecuación.</li>
        </ul>
        <p>
            Introduce las ecuaciones despejadas siguiendo este formato y el método de Gauss-Seidel iterará hasta alcanzar una solución dentro de la tolerancia establecida.
        </p>
    </div>
            `;
            container.innerHTML = teamContent;
        }
    });

    // Cargar contenido inicialmente si el valor del select ya es el esperado
    if (selectElement.value === "5" || selectElement.value === "default" || selectElement.value === "7" || selectElement.value === "8" ) {
        selectElement.dispatchEvent(new Event("change"));
    }
});
