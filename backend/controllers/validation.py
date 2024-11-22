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
##validation for gauss seidel
def validate_matrix(A):
    """
    Valida si la matriz A es una lista de listas numéricas.

    Parámetros:
    A (list): Matriz a validar.

    Retorna:
    tuple: (bool, str) -> True si es válida, False y mensaje de error en caso contrario.
    """
    if not isinstance(A, list):
        return False, "Debe ser una lista de listas."
    if not all(isinstance(row, list) for row in A):
        return False, "Cada fila debe ser una lista."
    if not all(isinstance(elem, (int, float)) for row in A for elem in row):
        return False, "Todos los elementos de la matriz deben ser números."
    return True, None


def validate_vector(x0):
    """
    Valida si el vector inicial x0 es una lista numérica.
    Parámetros:
    x0 (list): Vector a validar.
    Retorna:
    tuple: (bool, str) -> True si es válido, False y mensaje de error en caso contrario.
    """
    if not isinstance(x0, list):
        return False, "Debe ser una lista."
    if not all(isinstance(elem, (int, float)) for elem in x0):
        return False, "Todos los elementos del vector deben ser números."
    return True, None

def validate_tolerance(tol):
    """
    Valida si la tolerancia es un número positivo.
    Parámetros:
    tol (float): Tolerancia a validar.
    Retorna:
    tuple: (bool, str) -> True si es válida, False y mensaje de error en caso contrario.
    """
    if not isinstance(tol, (int, float)):
        return False, "Debe ser un número."
    if tol <= 0:
        return False, "Debe ser un número positivo."
    return True, None


def validate_max_iterations(max_iter):
    """
    Valida si el número máximo de iteraciones es un entero positivo.

    Parámetros:
    max_iter (int): Número máximo de iteraciones a validar.

    Retorna:
    tuple: (bool, str) -> True si es válido, False y mensaje de error en caso contrario.
    """
    if not isinstance(max_iter, int):
        return False, "Debe ser un número entero."
    if max_iter <= 0:
        return False, "Debe ser mayor que cero."
    return True, None


