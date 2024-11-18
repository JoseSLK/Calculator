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

def validate_matrix(matrix):
    if not isinstance(matrix, list):
        return False, "La matriz debe ser una lista."

    if not all(isinstance(row, list) for row in matrix):
        return False, "Cada fila de la matriz debe ser una lista."
    row_length = len(matrix[0])

    if not all(len(row) == row_length for row in matrix):
        return False, "Todas las filas de la matriz deben tener la misma longitud."

    for row in matrix:
        if not all(isinstance(element, (int, float)) for element in row):
            return False, "Todos los elementos de la matriz deben ser números."

    return True, ""

def validate_vector(vector):
    if not isinstance(vector, list):
        return False, "El vector debe ser una lista."

    if not all(isinstance(element, (int, float)) for element in vector):
        return False, "Todos los elementos del vector deben ser números."

    return True, ""


