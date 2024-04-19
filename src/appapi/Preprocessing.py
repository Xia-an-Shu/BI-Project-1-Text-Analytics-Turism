import re
import string
from nltk.corpus import stopwords
from unidecode import unidecode
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize
from nltk.stem import SnowballStemmer
from num2words import num2words

# Funciones preprocesamiento de texto

def limpiar_texto(texto):
    texto = re.sub(r'@[A-Za-z0-9]+', '', texto)  
    texto = re.sub(r'https?:\/\/\S+', '', texto)  
    texto = re.sub(r'[^\w\s]', '', texto)  
    texto = unidecode(texto.lower())
    return texto

def tokenizar_texto(texto):
    return word_tokenize(texto)

def eliminar_stopwords(texto):
    stop_words = set(stopwords.words("spanish"))
    palabras_relevantes = ["no", "si", "bueno", "buenos", "buena", "buenas", "mal", "malo", "mala", "malos", "malas",
                           "mejor", "peor", "feliz", "triste", "alegre", "enojado", "amor", "odio", "amistad", "ira"]
    stop_words.difference_update(palabras_relevantes)  # Eliminar las palabras relevantes de las stopwords
    palabras_filtradas = [palabra for palabra in texto if palabra not in stop_words]
    return palabras_filtradas

def lematizar_texto(texto):
    lemmatizer = WordNetLemmatizer()
    palabras_lematizadas = [lemmatizer.lemmatize(palabra) for palabra in texto]
    return palabras_lematizadas

def stemming_texto(texto):
    stemmer = SnowballStemmer('spanish')
    palabras_stemming = [stemmer.stem(palabra) for palabra in texto]
    return palabras_stemming

def convertir_numeros_texto(texto):
    texto_con_numeros_convertidos = [re.sub(r'\b\d+\b', lambda x: num2words(int(x.group()), lang='es'), palabra) for palabra in texto]
    return texto_con_numeros_convertidos

# Función para preprocesamiento de muchos textos

def preparacion_nuevos_datos(textos):

    textos_preparados = []

    for texto in textos:
        texto_limpio = limpiar_texto(texto)
        palabras_tokenizadas = tokenizar_texto(texto_limpio)
        palabras_sin_stopwords = eliminar_stopwords(palabras_tokenizadas)
        palabras_lematizadas = lematizar_texto(palabras_sin_stopwords)
        palabras_stemming = stemming_texto(palabras_lematizadas)
        palabras_numeros_transformados = convertir_numeros_texto(palabras_stemming)
        texto_preparado = ' '.join(palabras_numeros_transformados)
        textos_preparados.append(texto_preparado)

    return textos_preparados