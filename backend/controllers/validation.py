import re
from math import *

math_functions = ['sin', 'cos', 'tan', 'sqrt', 'log', 'log10', 'exp', 'asin', 'acos', 'atan', 'sinh', 'cosh', 'tanh', 'asinh', 'acosh', 'atanh', 'pi', 'e']

def validate_function(f_str):
    
    allowed_chars = re.compile(r'^[0-9+\-*/().x\s' + ''.join(f'|{func}' for func in math_functions) + ']+$')
    if not allowed_chars.match(f_str):
        return False, "Contiene caracteres no permitidos o soportados"
    
    try:
        eval(f_str.replace('x', '1'), {"__builtins__": None}, {func: globals()[func] for func in math_functions})
    except Exception as e:
        return False, f"Error en la funcion: {str(e)}"
    return True, ""

#Bisection validation
def validate_limits(a,b):

    if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
        return False, "Los limites deben ser numeros"
    
    if a >= b:
        return False, "El limite inferior debe ser menor que el limite superior"
    
    return True, ""

def validate_tolerance(tol):
    if not isinstance(tol, (int, float)):
        return False, "La tolerancia debe ser un numero."
    
    if tol <= 0:
        return False, "La tolerancia deber ser un numero positivo"
    
    return True, ""

def validate_numeric(value):
    if not isinstance(value, (int, float)):
        return False, f"El valor debe ser numérico."
    return True, ""
