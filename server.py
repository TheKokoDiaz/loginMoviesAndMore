from flask import Flask, request, jsonify
from flask_cors import CORS
import bcrypt
import json

app = Flask(__name__)
CORS(app)

# Archivo para almacenar usuarios
DB_FILE = "usuarios.json"

# Función para cargar usuarios desde el archivo
def cargar_usuarios():
    try:
        with open(DB_FILE, "r") as file:
            return json.load(file)
    except FileNotFoundError:
        return {}

# Función para guardar usuarios en el archivo
def guardar_usuarios(usuarios):
    with open(DB_FILE, "w") as file:
        json.dump(usuarios, file, indent=4)

# Ruta para registrar un usuario
@app.route('/registro', methods=['POST'])
def registro():
    data = request.json
    usuarios = cargar_usuarios()

    if data["username"] in usuarios:
        return jsonify({"error": "El usuario ya existe"}), 400

    # Cifrar contraseña
    hashed_pw = bcrypt.hashpw(data["password"].encode('utf-8'), bcrypt.gensalt())

    # Guardar usuario
    usuarios[data["username"]] = hashed_pw.decode('utf-8')
    guardar_usuarios(usuarios)

    return jsonify({"mensaje": "Usuario registrado exitosamente"})

# Ruta para iniciar sesión
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    usuarios = cargar_usuarios()

    if data["username"] not in usuarios:
        return jsonify({"error": "Usuario no encontrado"}), 400

    # Verificar contraseña
    if bcrypt.checkpw(data["password"].encode('utf-8'), usuarios[data["username"]].encode('utf-8')):
        return jsonify({"mensaje": "Inicio de sesión exitoso"})
    else:
        return jsonify({"error": "Contraseña incorrecta"}), 400

if __name__ == '__main__':
    app.run(debug=True)
