from math import *

def puntofijo(data):
    n = 100  
    i = 1    

    f_str = data['function']  
    p0 = data['initial_point'] 
    tol = data['tolerance']    

    iteration = []  

    def f(x):
        return eval(f_str)

    x_vals = np.linspace(p0 - 1, p0 + 1, 400)  
    y_vals = [f(x) for x in x_vals]   

    iter_x_vals = [p0]        

    plt.plot(x_vals, y_vals, label=f'f(x)', color='blue', linewidth=2)
    plt.xlabel('x')
    plt.ylabel('y')
    plt.title(f'Grafica {f_str}')
    plt.legend()
    plt.grid(True)

    while i <= n:
        p = f(p0)
        print("Iter = {0:<2}, p = {1}".format(i, p))

        iter_x_vals.append(p)
        iteration.append({
            "iteracion": i + 1,
            "x": float(p)
        })
        
        for x_value in iter_x_vals:
            plt.axvline(x=x_value, color='r', linestyle='--')

        if abs((p - p0) / p) < tol:

            buf = BytesIO()
            plt.savefig(buf, format='png', dpi=300)
            buf.seek(0)
            img_base64 = base64.b64encode(buf.read()).decode('utf-8')
            buf.close()  

            return {
                "resultado": float(p),
                "iteraciones": iteration,
                "grafica": img_base64
            }

        p0 = p
        i += 1

    buf = BytesIO()
    plt.savefig(buf, format='png', dpi=300)
    buf.seek(0)
    img_base64 = base64.b64encode(buf.read()).decode('utf-8')
    buf.close()  
    return {
        "error": "Iteraciones agotadas, no se encontró un punto fijo",
        "grafica": img_base64
    }

