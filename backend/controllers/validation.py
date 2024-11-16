import re
from math import *
from sympy.parsing.latex import parse_latex
from sympy import symbols, lambdify
import base64

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