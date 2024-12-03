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
                            Presentado a: <strong>Ing. Fredy Alarcón</strong> <br>
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
        } else if(selectElement.value === "4"){
            const content = `
                    <div id="broyden-info">
            <h2>Método de Newton-Raphson</h2>
            <p>
                El método de Newton-Raphson es una técnica iterativa utilizada para encontrar las raíces de una función no lineal.
                Para su implementación, es fundamental que el usuario proporcione:
            </p>
            <ul>
                <li><strong>Ecuación 1:</strong> Representa la función <em>f(x)</em>.</li>
                <li><strong>Ecuación 2:</strong> Representa la derivada de la función <em>f'(x)</em>.</li>
                <li><strong>Valor inicial:</strong> Un valor <em>x<sub>0</sub></em> cercano a la raíz esperada.</li>
            </ul>
            <h3>Ejemplo</h3>
            <p>Supongamos que queremos encontrar la raíz de la función:</p>
            <div class="example">
                <ul>
                    <li><em>f(x) = x<sup>2</sup> - 2</em> (Ecuación 1)</li>
                    <li><em>f'(x) = 2x</em> (Ecuación 2)</li>
                </ul>
            </div>
            <p>
                Usando un valor inicial <em>x<sub>0</sub> = 1</em>, el método calculará iterativamente 
                hasta encontrar una raíz con una tolerancia aceptable.
            </p>
            <div class="invitation">
                <p>
                    <span class="please">No olvides elegir bien tu valor inicial</span>
                </p>
            </div>
        </div>
            `;
            container.innerHTML = content;
        } else if (selectElement.value === "6"){
            const content = `
            <div class="broyden-info">
                <h3>Método de Newton-Raphson para Sistemas</h3>
                <p>
                    Actualmente, el método de Newton-Raphson para sistemas de ecuaciones no está implementado en esta versión de la calculadora.  
                    Estamos trabajando arduamente para incluirlo en una próxima actualización.
                </p>
                <p class="quote">✨ <em>"La paciencia es una virtud, y pronto habrá grandes mejoras."</em> ✨</p>
                <div class="invitation">
                    <p>
                        Mientras tanto, te invitamos a explorar nuestros otros métodos disponibles.<br>
                        <span class="please">¡Gracias por tu comprensión y apoyo! 🙏</span>
                    </p>
                </div>
            </div>
            `;
            container.innerHTML = content;
        }else if (selectElement.value === "10"){
            const simpsonContent = `
                <div id="broyden-info">
                    <h2>¿Cómo funciona el Método de Simpson?</h2>
                    <p>
                        El método de Simpson es una técnica para aproximar el valor de una integral definida. Divide el intervalo en \(n\) subintervalos y utiliza parábolas para aproximar la función. Sigue estas indicaciones antes de usarlo:
                    </p>
                    <ul>
                        <li>El número de intervalos \(n\) debe ser par.</li>
                        <li>Asegúrate de proporcionar la función \(f(x)\) en un formato válido.</li>
                        <li>Especifica los límites de integración (inferior) y (superior).</li>
                    </ul>
                    <p>
                        <strong>Fórmula de Simpson:</strong>
                    </p>
                    <div class="example">
                        <pre>
Integral aproximada ≈ (h / 3) * [f(a) + 4 * Σ f(x_{i, impares}) + 2 * Σ f(x_{i, pares}) + f(b)]
Donde:
    h = (b - a) / n
    x_{i} = a + i * h
                        </pre>
                    </div>
                    <p>
                        <strong>Ejemplo:</strong> Aproximar la integral de \(f(x) = x^2 + 1\) en el intervalo [0, 2] con \(n = 4\):
                    </p>
                    <div class="example">
                        <pre>
    f(x) = x² + 1
    Intervalo: [0, 2]
    Subintervalos: n = 4

    Resultado:
    Integral ≈ 4.6667
                        </pre>
                    </div>
                    <p>
                        El método de Simpson es especialmente útil para obtener resultados precisos con un número reducido de subintervalos.
                    </p>
                </div>
            `;
            container.innerHTML = simpsonContent;
        } else if (selectElement.value === "9"){
            const trapeciosContent = `
                <div id="broyden-info">
                    <h2>¿Cómo funciona el Método de Trapecios?</h2>
                    <p>
                        El método de trapecios es una técnica numérica para aproximar el valor de una integral definida. 
                        Divide el intervalo de integración en \(n\) subintervalos y utiliza trapecios para aproximar 
                        el área bajo la curva. Este método es simple y efectivo para funciones continuas y suavemente 
                        variables.
                    </p>
                    <p>
                        <strong>Fórmula del Método de Trapecios:</strong>
                    </p>
                    <div class="example">
                        <pre>
Integral aproximada ≈ (h / 2) * [f(a) + 2 * Σ f(x_i) + f(b)]
Donde:
    h = (b - a) / n
    x_i = a + i * h
                        </pre>
                    </div>
                    <p>
                        <strong>Pasos para aplicar el método:</strong>
                    </p>
                    <ul>
                        <li>Divide el intervalo de integración \([a, b]\) en \(n\) subintervalos.</li>
                        <li>Calcula la longitud de cada subintervalo (\(h\)).</li>
                        <li>Evalúa la función \(f(x)\) en los puntos inicial, final y los nodos internos.</li>
                        <li>Suma las áreas de los trapecios usando la fórmula.</li>
                    </ul>
                    <p>
                        <strong>Ejemplo:</strong> Aproximar la integral de \(f(x) = x^2 + 1\) en el intervalo [0, 2] con \(n = 4\):
                    </p>
                    <div class="example">
                        <pre>
    f(x) = x² + 1
    Intervalo: [0, 2]
    Subintervalos: n = 4

    Resultado:
    Integral ≈ 4.75
                        </pre>
                    </div>
                    <p>
                        Este método proporciona una aproximación rápida, especialmente para \(n\) grande.
                    </p>
                </div>
            `;
            container.innerHTML = trapeciosContent;
        } else if (selectElement.value === "3"){
            const trapeciosContent = `<div id="broyden-info">
            <h2>Método de la Secante</h2>
            <p>
                El método de la secante es una técnica iterativa para encontrar las raíces de una función no lineal.
                Este método utiliza dos puntos iniciales para aproximar la derivada de la función y calcular nuevas estimaciones de la raíz.
                Para su implementación, se requiere:
            </p>
            <ul>
                <li><strong>Punto inicial 1:</strong> Un valor <em>x<sub>0</sub></em> cercano a la raíz esperada.</li>
                <li><strong>Punto inicial 2:</strong> Un valor <em>x<sub>1</sub></em> distinto de <em>x<sub>0</sub></em>.</li>
                <li><strong>Función:</strong> La función <em>f(x)</em> cuyo valor queremos aproximar a cero.</li>
                <li><strong>Tolerancia:</strong> El criterio para detener la iteración cuando se alcanza una precisión aceptable.</li>
            </ul>
            <h3>Ejemplo</h3>
            <p>Supongamos que queremos encontrar la raíz de la función:</p>
            <div class="example">
                <ul>
                    <li><em>f(x) = x<sup>3</sup> - 4x - 9</em></li>
                </ul>
            </div>
            <p>
                Usando los puntos iniciales <em>x<sub>0</sub> = 2</em> y <em>x<sub>1</sub> = 3</em>, 
                y una tolerancia de <em>10<sup>-6</sup></em>, el método de la secante iterará para aproximar la raíz.
            </p>
            <div class="invitation">
                <p>
                    <span class="please"> Recuerda elegir puntos iniciales adecuados para evitar divergencias</span>
                </p>
            </div>
        </div>
        `;
        container.innerHTML = trapeciosContent;
        } else if (selectElement.value === "2"){
            const trapeciosContent = `<div id="broyden-info">
            <h2>Método de Bisección</h2>
            <p>
                El método de bisección es una técnica robusta y sencilla para encontrar raíces de una función continua en un intervalo. 
                Se basa en el **Teorema del Valor Intermedio**, que garantiza que si \( f(a) \cdot f(b) < 0 \), entonces existe al menos una raíz en el intervalo \([a, b]\).
                Para aplicar este método, se requiere:
            </p>
            <ul>
                <li><strong>Intervalo inicial:</strong> Dos valores, <em>a</em> y <em>b</em>, tales que \( f(a) \cdot f(b) < 0 \).</li>
                <li><strong>Función:</strong> La función <em>f(x)</em> para la cual deseamos encontrar la raíz.</li>
                <li><strong>Tolerancia:</strong> El criterio para detener la iteración cuando la aproximación de la raíz sea suficientemente precisa.</li>
            </ul>
            <h3>Ejemplo</h3>
            <p>Supongamos que queremos encontrar la raíz de la función:</p>
            <div class="example">
                <ul>
                    <li><em>f(x) = x<sup>3</sup> - 6x + 4</em></li>
                </ul>
            </div>
            <p>
                Usando el intervalo inicial <em>a = 0</em> y <em>b = 2</em>, y una tolerancia de <em>10<sup>-6</sup></em>, 
                el método de bisección iterará dividiendo el intervalo en mitades hasta localizar la raíz.
            </p>
            <div class="invitation">
                <p>
                    <span class="please">Asegúrate de que tu intervalo inicial cumpla con el criterio \( f(a) * f(b) < 0 \)</span>
                </p>
            </div>
        </div>
        `;
            container.innerHTML = trapeciosContent;
        }else if (selectElement.value === "1"){
            const trapeciosContent = `<div id="broyden-info">
            <h2>Método de Punto Fijo</h2>
            <p>
                El método de punto fijo es una técnica iterativa para encontrar soluciones de ecuaciones en la forma \( x = g(x) \). 
                Consiste en transformar una ecuación no lineal en una forma iterativa y calcular aproximaciones sucesivas. 
                Para usar este método, se necesita:
            </p>
            <ul>
                <li><strong>Función:</strong> Una función \( g(x) \) que cumpla las condiciones necesarias para garantizar la convergencia.</li>
                <li><strong>Valor inicial:</strong> Un punto \( x_0 \) desde el cual comenzar la iteración.</li>
                <li><strong>Tolerancia:</strong> Un criterio para detener las iteraciones cuando la aproximación sea suficientemente precisa.</li>
            </ul>
            <h3>Ejemplo</h3>
            <p>Supongamos que queremos encontrar la raíz de la ecuación:</p>
            <div class="example">
                <ul>
                    <li>\( f(x) = x^3 + x - 1 \)</li>
                </ul>
            </div>
            <p>
                Transformamos esta ecuación a la forma \( x = g(x) \), por ejemplo: 
                \( g(x) = \sqrt[3]{1 - x} \). 
                Usando un valor inicial \( x_0 = 0.5 \) y una tolerancia de \( 10^{-6} \), el método calculará iterativamente el valor de \( x \).
            </p>
            <div class="invitation">
                <p>
                    <span class="please">Asegúrate de que \( g(x) \) sea una función convergente</span>
                </p>
            </div>
        </div>
        `;
        container.innerHTML = trapeciosContent;
        }
    });

    // Cargar contenido inicialmente si el valor del select ya es el esperado
    if (selectElement.value === "5" || selectElement.value === "default" || selectElement.value === "7" || selectElement.value === "8" ) {
        selectElement.dispatchEvent(new Event("change"));
    }
});
