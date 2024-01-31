from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
import hashlib

app = Flask(__name__)
CORS(app)

def encriptarHash256(texto_plano):
    # Convertir el texto plano a bytes antes de aplicar el hash
    texto_bytes = texto_plano.encode('utf-8')

    # Crear un objeto hash SHA-256
    sha256 = hashlib.sha256()

    # Actualizar el objeto hash con los bytes del texto
    sha256.update(texto_bytes)

    # Obtener el hash en formato hexadecimal
    hash_resultado = sha256.hexdigest()

    return hash_resultado

# Conexión a la base de datos SQLite (creará el archivo si no existe)
def init():
    conn = sqlite3.connect('biblioteca.db')
    cursor = conn.cursor()

    # Estructura de tabla para la tabla autor
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS autor (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    autor TEXT NOT NULL,
    imagen TEXT NOT NULL,
    estado INTEGER NOT NULL DEFAULT 1
    )
    ''')

    # Estructura de tabla para la tabla configuracion
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS configuracion (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    telefono TEXT NOT NULL,
    direccion TEXT NOT NULL,
    correo TEXT NOT NULL,
    foto TEXT NOT NULL
    )
    ''')

    # Estructura de tabla para la tabla detalle_permisos
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS detalle_permisos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER NOT NULL,
    id_permiso INTEGER NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios (id),
    FOREIGN KEY (id_permiso) REFERENCES permisos (id)
    )
    ''')

    # Estructura de tabla para la tabla editorial
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS editorial (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    editorial TEXT NOT NULL,
    estado INTEGER NOT NULL DEFAULT 1
    )
    ''')

    # Estructura de tabla para la tabla estudiante
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS estudiante (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo TEXT NOT NULL,
    dni TEXT NOT NULL,
    nombre TEXT NOT NULL,
    carrera TEXT NOT NULL,
    direccion TEXT NOT NULL,
    telefono TEXT NOT NULL,
    estado INTEGER NOT NULL DEFAULT 1
    )
    ''')

    # Estructura de tabla para la tabla libro
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS libro (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    cantidad INTEGER NOT NULL,
    id_autor INTEGER NOT NULL,
    id_editorial INTEGER NOT NULL,
    anio_edicion DATE NOT NULL,
    id_materia INTEGER NOT NULL,
    num_pagina INTEGER NOT NULL,
    descripcion TEXT NOT NULL,
    imagen TEXT NOT NULL,
    estado INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY (id_autor) REFERENCES autor (id),
    FOREIGN KEY (id_editorial) REFERENCES editorial (id),
    FOREIGN KEY (id_materia) REFERENCES materia (id)
    )
    ''')

    # Estructura de tabla para la tabla materia
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS materia (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    materia TEXT NOT NULL,
    estado INTEGER NOT NULL DEFAULT 1
    )
    ''')

    # Estructura de tabla para la tabla permisos
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS permisos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    tipo INTEGER NOT NULL
    )
    ''')

    # Estructura de tabla para la tabla prestamo
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS prestamo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_estudiante INTEGER NOT NULL,
    id_libro INTEGER NOT NULL,
    fecha_prestamo DATE NOT NULL,
    fecha_devolucion DATE NOT NULL,
    cantidad INTEGER NOT NULL,
    observacion TEXT NOT NULL,
    estado INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY (id_estudiante) REFERENCES estudiante (id),
    FOREIGN KEY (id_libro) REFERENCES libro (id)
    )
    ''')

    # Estructura de tabla para la tabla usuarios
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario TEXT NOT NULL,
    nombre TEXT NOT NULL,
    clave TEXT NOT NULL,
    estado INTEGER NOT NULL DEFAULT 1
    )
    ''')

    # Confirmar los cambios y cerrar la conexión
    conn.commit()
    conn.close()
    
init()

@app.route('/api/permisos', methods=['GET'])
def obtener_permisos():
    conn = sqlite3.connect('biblioteca.db')
    cursor = conn.cursor()

    # Consulta para obtener todos los permisos
    cursor.execute('SELECT * FROM permisos')
    permisos = cursor.fetchall()

    conn.close()

    # Convertir los resultados a formato JSON
    permisos_json = []
    for permiso in permisos:
        permiso_dict = {
            'id': permiso[0],
            'nombre': permiso[1],
            'tipo': permiso[2]
        }
        permisos_json.append(permiso_dict)

    return jsonify({'permisos': permisos_json})

def insertar_permisos():
    conn = sqlite3.connect('biblioteca.db')
    cursor = conn.cursor()

    permisos = [
        (1, 'Libros', 1),
        (2, 'Autor', 2),
        (3, 'Editorial', 3),
        (4, 'Usuarios', 4),
        (5, 'Configuracion', 5),
        (6, 'Estudiantes', 6),
        (7, 'Materias', 7),
        (8, 'Reportes', 8),
        (9, 'Prestamos', 9)
    ]

    cursor.executemany('INSERT INTO permisos (id, nombre, tipo) VALUES (?, ?, ?)', permisos)

    conn.commit()
    conn.close()
    
@app.route('/api/materias', methods=['GET'])
def get_materias():
    try:
        conn = sqlite3.connect('biblioteca.db')
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM materia')
        materias = cursor.fetchall()
        conn.close()

        materias_list = []
        for materia in materias:
            materia_dict = {
                'id': materia[0],
                'materia': materia[1],
                'estado': materia[2]
            }
            materias_list.append(materia_dict)

        return jsonify({'materias': materias_list})

    except Exception as e:
        return jsonify({'error': str(e)})

# Ruta para obtener una materia por ID
@app.route('/api/materias/<int:materia_id>', methods=['GET'])
def get_materia(materia_id):
    try:
        conn = sqlite3.connect('biblioteca.db')
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM materia WHERE id = ?', (materia_id,))
        materia = cursor.fetchone()
        conn.close()

        if materia:
            materia_dict = {
                'id': materia[0],
                'materia': materia[1],
                'estado': materia[2]
            }
            return jsonify({'materia': materia_dict})
        else:
            return jsonify({'message': 'Materia no encontrada'}), 404

    except Exception as e:
        return jsonify({'error': str(e)})

# Ruta para crear una nueva materia
@app.route('/api/materias', methods=['POST'])
def create_materia():
    try:
        data = request.get_json()
        materia_name = data['materia']
        estado = 1

        conn = sqlite3.connect('biblioteca.db')
        cursor = conn.cursor()
        cursor.execute('INSERT INTO materia (materia, estado) VALUES (?, ?)', (materia_name, estado))
        conn.commit()
        new_materia_id = cursor.lastrowid
        conn.close()

        return jsonify({'message': 'Materia creada exitosamente', 'id': new_materia_id}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Ruta para actualizar una materia por ID
@app.route('/api/materias/<int:materia_id>', methods=['PUT'])
def update_materia(materia_id):
    try:
        data = request.get_json()
        new_materia_name = data.get('materia')
        new_estado = data.get('estado')

        conn = sqlite3.connect('biblioteca.db')
        cursor = conn.cursor()

        if new_materia_name:
            cursor.execute('UPDATE materia SET materia = ? WHERE id = ?', (new_materia_name, materia_id))

        if new_estado is not None:
            cursor.execute('UPDATE materia SET estado = ? WHERE id = ?', (new_estado, materia_id))

        conn.commit()
        conn.close()

        return jsonify({'message': 'Materia actualizada exitosamente'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400


# Ruta para eliminar una materia por ID
@app.route('/api/materias/<int:materia_id>', methods=['DELETE'])
def delete_materia(materia_id):
    try:
        conn = sqlite3.connect('biblioteca.db')
        cursor = conn.cursor()
        cursor.execute('DELETE FROM materia WHERE id = ?', (materia_id,))
        conn.commit()
        conn.close()

        return jsonify({'message': 'Materia eliminada exitosamente'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400     
 
##Para autores
@app.route('/api/autores', methods=['POST'])
def create_autor():
    try:
        data = request.get_json()
        print(data)
        autor = data.get('autor')
        imagen = ''
        estado = 1

        conn = sqlite3.connect('biblioteca.db')
        cursor = conn.cursor()
        cursor.execute('INSERT INTO autor (autor, imagen, estado) VALUES (?, ?, ?)',
                       (autor, imagen, estado))
        conn.commit()
        conn.close()

        return jsonify({'message': 'Autor creado exitosamente'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Función para obtener todos los autores
@app.route('/api/autores', methods=['GET'])
def get_autores():
    try:
        conn = sqlite3.connect('biblioteca.db')
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM autor')
        autores = cursor.fetchall()
        conn.close()
        autores_list = []
        for autor in autores:
            autor_dict = {
                'id': autor[0],
                'autor': autor[1],
                'estado': autor[3]
            }
            autores_list.append(autor_dict)
        return jsonify({'autores': autores_list})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Función para obtener un autor por ID
@app.route('/api/autores/<int:autor_id>', methods=['GET'])
def get_autor(autor_id):
    try:
        conn = sqlite3.connect('biblioteca.db')
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM autor WHERE id = ?', (autor_id,))
        autor = cursor.fetchone()
        conn.close()
        if autor:
            autor_dict = {
                'id': autor[0],
                'autor': autor[1],
                'estado': autor[3]
            }
            return jsonify({'autor': autor_dict})
        else:
            return jsonify({'message': 'Autor no encontrado'})

        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Función para actualizar un autor por ID
@app.route('/api/autores/<int:autor_id>', methods=['PUT'])
def update_autor(autor_id):
    try:
        data = request.get_json()
        autor = data.get('autor')
        imagen = ''
        estado = 1

        conn = sqlite3.connect('biblioteca.db')
        cursor = conn.cursor()

        # Verificar si el autor existe antes de intentar actualizar
        cursor.execute('SELECT * FROM autor WHERE id = ?', (autor_id,))
        existing_autor = cursor.fetchone()
        if not existing_autor:
            conn.close()
            return jsonify({'message': 'Autor no encontrado'}), 404

        # Actualizar el autor
        cursor.execute('UPDATE autor SET autor = ?, imagen = ?, estado = ? WHERE id = ?',
                       (autor, imagen, estado, autor_id))
        conn.commit()
        conn.close()

        return jsonify({'message': 'Autor actualizado exitosamente'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Función para eliminar un autor por ID
@app.route('/api/autores/<int:autor_id>', methods=['DELETE'])
def delete_autor(autor_id):
    try:
        conn = sqlite3.connect('biblioteca.db')
        cursor = conn.cursor()

        # Verificar si el autor existe antes de intentar eliminar
        cursor.execute('SELECT * FROM autor WHERE id = ?', (autor_id,))
        autor = cursor.fetchone()
        if not autor:
            conn.close()
            return jsonify({'message': 'Autor no encontrado'}), 404

        # Eliminar el autor
        cursor.execute('DELETE FROM autor WHERE id = ?', (autor_id,))
        conn.commit()
        conn.close()

        return jsonify({'message': 'Autor eliminado exitosamente'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500


##para editoriales
@app.route('/api/editoriales', methods=['POST'])
def create_editorial():
    try:
        data = request.get_json()
        editorial = data.get('editorial')
        estado = 1

        conn = sqlite3.connect('biblioteca.db')
        cursor = conn.cursor()
        cursor.execute('INSERT INTO editorial (editorial, estado) VALUES (?, ?)',
                       (editorial, estado))
        conn.commit()
        conn.close()

        return jsonify({'message': 'Editorial creada exitosamente'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Ruta para obtener todas las editoriales
@app.route('/api/editoriales', methods=['GET'])
def get_editoriales():
    try:
        conn = sqlite3.connect('biblioteca.db')
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM editorial')
        editoriales = cursor.fetchall()
        conn.close()
        editoriales_list = []
        for editorial in editoriales:
            editorial_dict = {
                'id': editorial[0],
                'editorial': editorial[1],
                'estado': editorial[2]
            }
            editoriales_list.append(editorial_dict)
        return jsonify({'editoriales': editoriales_list})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Ruta para obtener una editorial por ID
@app.route('/api/editoriales/<int:editorial_id>', methods=['GET'])
def get_editorial(editorial_id):
    try:
        conn = sqlite3.connect('biblioteca.db')
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM editorial WHERE id = ?', (editorial_id,))
        editorial = cursor.fetchone()
        conn.close()
        if editorial:
            editorial_dict = {
                'id': editorial[0],
                'editorial': editorial[1],
                'estado': editorial[2]
            }
            return jsonify({'editorial': editorial_dict})
        else:
            return jsonify({'message': 'Editorial no encontrada'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Ruta para actualizar una editorial por ID
@app.route('/api/editoriales/<int:editorial_id>', methods=['PUT'])
def update_editorial(editorial_id):
    try:
        data = request.get_json()
        editorial = data.get('editorial')
        estado = 1

        conn = sqlite3.connect('biblioteca.db')
        cursor = conn.cursor()

        # Verificar si la editorial existe antes de intentar actualizar
        cursor.execute('SELECT * FROM editorial WHERE id = ?', (editorial_id,))
        existing_editorial = cursor.fetchone()
        if not existing_editorial:
            conn.close()
            return jsonify({'message': 'Editorial no encontrada'}), 404

        # Actualizar la editorial
        cursor.execute('UPDATE editorial SET editorial = ?, estado = ? WHERE id = ?',
                       (editorial, estado, editorial_id))
        conn.commit()
        conn.close()

        return jsonify({'message': 'Editorial actualizada exitosamente'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Ruta para eliminar una editorial por ID
@app.route('/api/editoriales/<int:editorial_id>', methods=['DELETE'])
def delete_editorial(editorial_id):
    try:
        conn = sqlite3.connect('biblioteca.db')
        cursor = conn.cursor()

        # Verificar si la editorial existe antes de intentar eliminar
        cursor.execute('SELECT * FROM editorial WHERE id = ?', (editorial_id,))
        editorial = cursor.fetchone()
        if not editorial:
            conn.close()
            return jsonify({'message': 'Editorial no encontrada'}), 404

        # Eliminar la editorial
        cursor.execute('DELETE FROM editorial WHERE id = ?', (editorial_id,))
        conn.commit()
        conn.close()

        return jsonify({'message': 'Editorial eliminada exitosamente'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/configuracion',methods=['GET'])     
def get_configuracion():
    try:
        conn = sqlite3.connect('biblioteca.db')
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM configuracion")
        configuracion=cursor.fetchone()
        conn.commit()
        conn.close()
        if configuracion:
            conf={
                'id':configuracion[0],
                'nombre':configuracion[1],
                'telefono':configuracion[2],
                'direccion':configuracion[3],
                'correo':configuracion[4]
            }
            return jsonify({'configuracion':conf})
        else:
            return jsonify({'mensaje':'No se encontro configuracion'})
    except Exception as e:
        return jsonify({'error':str(e)}),500    
    
    
    
# Ruta para actualizar una configuración por ID
@app.route('/api/configuracion/<int:config_id>', methods=['PUT'])
def update_configuracion(config_id):
    try:
        data = request.get_json()
        nombre = data.get('nombre')
        telefono = data.get('telefono')
        direccion = data.get('direccion')
        correo = data.get('correo')
        foto = ''

        conn = sqlite3.connect('biblioteca.db')
        cursor = conn.cursor()

        # Verificar si la configuración existe antes de intentar actualizar
        cursor.execute('SELECT * FROM configuracion WHERE id = ?', (config_id,))
        existing_config = cursor.fetchone()
        if not existing_config:
            conn.close()
            return jsonify({'message': 'Configuración no encontrada'}), 404

        # Actualizar la configuración
        cursor.execute('UPDATE configuracion SET nombre = ?, telefono = ?, direccion = ?, correo = ?, foto = ? WHERE id = ?',
                       (nombre, telefono, direccion, correo, foto, config_id))
        conn.commit()
        conn.close()

        return jsonify({'message': 'Configuración actualizada exitosamente'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/api/configuracion', methods=['POST'])
def create_configuracion():
    try:
        data = request.get_json()
        nombre = data.get('nombre')
        telefono = data.get('telefono')
        direccion = data.get('direccion')
        correo = data.get('correo')
        foto = ''

        conn = sqlite3.connect('biblioteca.db')
        cursor = conn.cursor()
        cursor.execute('INSERT INTO configuracion (nombre, telefono, direccion, correo, foto) VALUES (?, ?, ?, ?, ?)',
                       (nombre, telefono, direccion, correo, foto))
        conn.commit()
        conn.close()

        return jsonify({'message': 'Configuración creada exitosamente'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 400
            
##para los estudiantes            
@app.route('/api/estudiantes', methods=['POST'])
def create_estudiante():
    try:
        data = request.get_json()
        print(data)
        codigo = data.get('codigo')
        dni = data.get('dni')
        nombre = data.get('nombre')
        carrera = data.get('carrera')
        direccion = data.get('direccion')
        telefono = data.get('telefono')
        estado = 1

        conn = sqlite3.connect('biblioteca.db')
        cursor = conn.cursor()
        cursor.execute('INSERT INTO estudiante (codigo, dni, nombre, carrera, direccion, telefono, estado) VALUES (?, ?, ?, ?, ?, ?, ?)',
                       (codigo, dni, nombre, carrera, direccion, telefono, estado))
        conn.commit()
        conn.close()

        return jsonify({'message': 'Estudiante creado exitosamente'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Ruta para obtener todos los estudiantes
@app.route('/api/estudiantes', methods=['GET'])
def get_estudiantes():
    try:
        conn = sqlite3.connect('biblioteca.db')
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM estudiante')
        estudiantes = cursor.fetchall()
        conn.close()
        estudiantes_list = []
        for estudiante in estudiantes:
            estudiante_dict = {
                'id': estudiante[0],
                'codigo': estudiante[1],
                'dni': estudiante[2],
                'nombre': estudiante[3],
                'carrera': estudiante[4],
                'direccion': estudiante[5],
                'telefono': estudiante[6],
                'estado': estudiante[7]
            }
            estudiantes_list.append(estudiante_dict)
        return jsonify({'estudiantes': estudiantes_list})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Ruta para obtener un estudiante por ID
@app.route('/api/estudiantes/<int:estudiante_id>', methods=['GET'])
def get_estudiante(estudiante_id):
    try:
        conn = sqlite3.connect('biblioteca.db')
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM estudiante WHERE id = ?', (estudiante_id,))
        estudiante = cursor.fetchone()
        conn.close()
        if estudiante:
            estudiante_dict = {
                'id': estudiante[0],
                'codigo': estudiante[1],
                'dni': estudiante[2],
                'nombre': estudiante[3],
                'carrera': estudiante[4],
                'direccion': estudiante[5],
                'telefono': estudiante[6],
                'estado': estudiante[7]
            }
            return jsonify({'estudiante': estudiante_dict})
        else:
            return jsonify({'message': 'Estudiante no encontrado'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Ruta para actualizar un estudiante por ID
@app.route('/api/estudiantes/<int:estudiante_id>', methods=['PUT'])
def update_estudiante(estudiante_id):
    try:
        data = request.get_json()
        codigo = data.get('codigo')
        dni = data.get('dni')
        nombre = data.get('nombre')
        carrera = data.get('carrera')
        direccion = data.get('direccion')
        telefono = data.get('telefono')
        estado = 1

        conn = sqlite3.connect('biblioteca.db')
        cursor = conn.cursor()

        # Verificar si el estudiante existe antes de intentar actualizar
        cursor.execute('SELECT * FROM estudiante WHERE id = ?', (estudiante_id,))
        existing_estudiante = cursor.fetchone()
        if not existing_estudiante:
            conn.close()
            return jsonify({'message': 'Estudiante no encontrado'}), 404

        # Actualizar el estudiante
        cursor.execute('UPDATE estudiante SET codigo = ?, dni = ?, nombre = ?, carrera = ?, direccion = ?, telefono = ?, estado = ? WHERE id = ?',
                       (codigo, dni, nombre, carrera, direccion, telefono, estado, estudiante_id))
        conn.commit()
        conn.close()

        return jsonify({'message': 'Estudiante actualizado exitosamente'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Ruta para eliminar un estudiante por ID
@app.route('/api/estudiantes/<int:estudiante_id>', methods=['DELETE'])
def delete_estudiante(estudiante_id):
    try:
        conn = sqlite3.connect('biblioteca.db')
        cursor = conn.cursor()

        # Verificar si el estudiante existe antes de intentar eliminar
        cursor.execute('SELECT * FROM estudiante WHERE id = ?', (estudiante_id,))
        estudiante = cursor.fetchone()
        if not estudiante:
            conn.close()
            return jsonify({'message': 'Estudiante no encontrado'}), 404

        # Eliminar el estudiante
        cursor.execute('DELETE FROM estudiante WHERE id = ?', (estudiante_id,))
        conn.commit()
        conn.close()

        return jsonify({'message': 'Estudiante eliminado exitosamente'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500
            
## para usuarios
# Ruta para obtener todos los usuarios
@app.route('/api/usuarios', methods=['GET'])
def get_usuarios():
    try:
        conn = sqlite3.connect('biblioteca.db')
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM usuarios')
        usuarios = cursor.fetchall()
        conn.close()

        usuarios_list = []
        for usuario in usuarios:
            usuario_dict = {
                'id': usuario[0],
                'usuario': usuario[1],
                'nombre': usuario[2],
                'clave': usuario[3],
                'estado': usuario[4]
            }
            usuarios_list.append(usuario_dict)

        return jsonify({'usuarios': usuarios_list})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Ruta para obtener un usuario por ID
@app.route('/api/usuarios/<int:usuario_id>', methods=['GET'])
def get_usuario(usuario_id):
    try:
        conn = sqlite3.connect('biblioteca.db')
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM usuarios WHERE id = ?', (usuario_id,))
        usuario = cursor.fetchone()
        conn.close()

        if usuario:
            usuario_dict = {
                'id': usuario[0],
                'usuario': usuario[1],
                'nombre': usuario[2],
                'clave': usuario[3],
                'estado': usuario[4]
            }
            return jsonify({'usuario': usuario_dict})
        else:
            return jsonify({'message': 'Usuario no encontrado'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Ruta para crear un nuevo usuario
@app.route('/api/usuarios', methods=['POST'])
def create_usuario():
    try:
        data = request.get_json()
        usuario = data.get('usuario')
        nombre = data.get('nombre')
        clave = data.get('clave')
        clave=encriptarHash256(clave)
        estado = 1

        conn = sqlite3.connect('biblioteca.db')
        cursor = conn.cursor()
        cursor.execute('INSERT INTO usuarios (usuario, nombre, clave, estado) VALUES (?, ?, ?, ?)',
                       (usuario, nombre, clave, estado))
        conn.commit()
        conn.close()

        return jsonify({'message': 'Usuario creado exitosamente'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Ruta para actualizar un usuario por ID
@app.route('/api/usuarios/<int:usuario_id>', methods=['PUT'])
def update_usuario(usuario_id):
    try:
        data = request.get_json()
        usuario = data.get('usuario')
        nombre = data.get('nombre')
        clave = data.get('clave')
        clave=encriptarHash256(clave)
        estado = data.get('estado', 1)

        conn = sqlite3.connect('biblioteca.db')
        cursor = conn.cursor()

        # Verificar si el usuario existe antes de intentar actualizar
        cursor.execute('SELECT * FROM usuarios WHERE id = ?', (usuario_id,))
        existing_usuario = cursor.fetchone()
        if not existing_usuario:
            conn.close()
            return jsonify({'message': 'Usuario no encontrado'}), 404

        # Actualizar el usuario
        cursor.execute('UPDATE usuarios SET usuario = ?, nombre = ?, clave = ?, estado = ? WHERE id = ?',
                       (usuario, nombre, clave, estado, usuario_id))
        conn.commit()
        conn.close()

        return jsonify({'message': 'Usuario actualizado exitosamente'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Ruta para eliminar un usuario por ID
@app.route('/api/usuarios/<int:usuario_id>', methods=['DELETE'])
def delete_usuario(usuario_id):
    try:
        conn = sqlite3.connect('biblioteca.db')
        cursor = conn.cursor()

        # Verificar si el usuario existe antes de intentar eliminar
        cursor.execute('SELECT * FROM usuarios WHERE id = ?', (usuario_id,))
        usuario = cursor.fetchone()
        if not usuario:
            conn.close()
            return jsonify({'message': 'Usuario no encontrado'}), 404

        # Eliminar el usuario
        cursor.execute('DELETE FROM usuarios WHERE id = ?', (usuario_id,))
        conn.commit()
        conn.close()

        return jsonify({'message': 'Usuario eliminado exitosamente'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/api/detalle_permisos/<int:usuario_id>', methods=['GET'])
def get_detalle_permisos_usuario(usuario_id):
    try:
        conn = sqlite3.connect('biblioteca.db')
        cursor = conn.cursor()

        # Filtrar los detalles de permisos para el usuario específico
        cursor.execute('SELECT * FROM detalle_permisos WHERE id_usuario = ?', (usuario_id,))
        detalles_permisos = cursor.fetchall()

        conn.close()

        detalles_permisos_list = []
        for detalle_permiso in detalles_permisos:
            detalle_permiso_dict = {
                'id': detalle_permiso[0],
                'id_usuario': detalle_permiso[1],
                'id_permiso': detalle_permiso[2]
            }
            detalles_permisos_list.append(detalle_permiso_dict)

        return jsonify({'detalle_permisos': detalles_permisos_list})

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/api/detalle_permisos', methods=['POST'])
def agregar_detalles_permisos():
    nuevos_detalles_permisos = request.get_json()
    print(nuevos_detalles_permisos)
    conn = sqlite3.connect('biblioteca.db')
    cursor = conn.cursor()
    
    for nuevo_detalle_permisos in nuevos_detalles_permisos:
        cursor.execute("INSERT INTO detalle_permisos (id_permiso, id_usuario) VALUES (?, ?)",
                       (nuevo_detalle_permisos['id_permiso'], nuevo_detalle_permisos['id_usuario']))
    
    conn.commit()
    return jsonify({"mensaje": "Detalles de permisos agregados correctamente"})

@app.route('/api/detalle_permisos/<int:id_usuario>', methods=['PUT'])
def actualizar_permisos(id_usuario):
    try:
        conn = sqlite3.connect('biblioteca.db')
        cursor = conn.cursor()

        # Eliminar todos los permisos existentes para el usuario
        cursor.execute("DELETE FROM detalle_permisos WHERE id_usuario = ?", (id_usuario,))

        # Obtener permisos enviados en el cuerpo de la solicitud
        nuevos_permisos = request.get_json()
        # Insertar los nuevos permisos
        for permiso in nuevos_permisos:
            
            cursor.execute("INSERT INTO detalle_permisos (id_usuario, id_permiso) VALUES (?, ?)",
                           (permiso['id_usuario'], permiso['id_permiso']))

        conn.commit()
        return jsonify({"mensaje": "Permisos actualizados correctamente"}), 200

    except Exception as e:
  
        return jsonify({"error": "Error al actualizar permisos"}), 500

    finally:
        conn.close()
        
@app.route('/api/libros', methods=['GET'])
def get_libros():
    try:
        conn = sqlite3.connect('biblioteca.db')
        cursor = conn.cursor()
        cursor.execute('''
            SELECT
                libro.id,
                libro.titulo,
                libro.cantidad,
                autor.autor as nombre_autor,
                editorial.editorial as nombre_editorial,
                libro.anio_edicion,
                materia.materia as nombre_materia,
                libro.num_pagina,
                libro.descripcion,
                libro.imagen,
                libro.estado
            FROM
                libro
                JOIN autor ON libro.id_autor = autor.id
                JOIN editorial ON libro.id_editorial = editorial.id
                JOIN materia ON libro.id_materia = materia.id
        ''')
        libros = cursor.fetchall()
        conn.close()

        libros_list = []
        for libro in libros:
            libro_dict = {
                'id': libro[0],
                'titulo': libro[1],
                'cantidad': libro[2],
                'autor': libro[3],
                'editorial': libro[4],
                'anio_edicion': libro[5],
                'materia': libro[6],
                'num_pagina': libro[7],
                'descripcion': libro[8],
                'imagen': libro[9],
                'estado': libro[10]
            }
            libros_list.append(libro_dict)

        return jsonify({'libros': libros_list})

    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Ruta para obtener un libro por ID
@app.route('/api/libros/<int:libro_id>', methods=['GET'])
def get_libro(libro_id):
    try:
        conn = sqlite3.connect('biblioteca.db')
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM libro WHERE id = ?', (libro_id,))
        libro = cursor.fetchone()
        conn.close()

        if libro:
            libro_dict = {
                'id': libro[0],
                'titulo': libro[1],
                'cantidad': libro[2],
                'id_autor': libro[3],
                'id_editorial': libro[4],
                'anio_edicion': libro[5],
                'id_materia': libro[6],
                'num_pagina': libro[7],
                'descripcion': libro[8],
                'imagen': libro[9],
                'estado': libro[10]
            }
            return jsonify({'libro': libro_dict})
        else:
            return jsonify({'message': 'Libro no encontrado'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Ruta para crear un nuevo libro
@app.route('/api/libros', methods=['POST'])
def create_libro():
    try:
        data = request.get_json()
        titulo = data.get('titulo')
        cantidad = data.get('cantidad')
        id_autor = data.get('id_autor')
        id_editorial = data.get('id_editorial')
        anio_edicion = data.get('anio_edicion')
        id_materia = data.get('id_materia')
        num_pagina = data.get('num_pagina')
        descripcion = data.get('descripcion')
        imagen = ''
        estado = 1

        conn = sqlite3.connect('biblioteca.db')
        cursor = conn.cursor()
        cursor.execute('INSERT INTO libro (titulo, cantidad, id_autor, id_editorial, anio_edicion, id_materia, num_pagina, descripcion, imagen, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                       (titulo, cantidad, id_autor, id_editorial, anio_edicion, id_materia, num_pagina, descripcion, imagen, estado))
        conn.commit()
        conn.close()

        return jsonify({'message': 'Libro creado exitosamente'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Ruta para actualizar un libro por ID
@app.route('/api/libros/<int:libro_id>', methods=['PUT'])
def update_libro(libro_id):
    try:
        data = request.get_json()
        titulo = data.get('titulo')
        cantidad = data.get('cantidad')
        id_autor = data.get('id_autor')
        id_editorial = data.get('id_editorial')
        anio_edicion = data.get('anio_edicion')
        id_materia = data.get('id_materia')
        num_pagina = data.get('num_pagina')
        descripcion = data.get('descripcion')
        imagen = ''
        estado = data.get('estado', 1)

        conn = sqlite3.connect('biblioteca.db')
        cursor = conn.cursor()

        # Verificar si el libro existe antes de intentar actualizar
        cursor.execute('SELECT * FROM libro WHERE id = ?', (libro_id,))
        existing_libro = cursor.fetchone()
        if not existing_libro:
            conn.close()
            return jsonify({'message': 'Libro no encontrado'}), 404

        # Actualizar el libro
        cursor.execute('UPDATE libro SET titulo = ?, cantidad = ?, id_autor = ?, id_editorial = ?, anio_edicion = ?, id_materia = ?, num_pagina = ?, descripcion = ?, imagen = ?, estado = ? WHERE id = ?',
                       (titulo, cantidad, id_autor, id_editorial, anio_edicion, id_materia, num_pagina, descripcion, imagen, estado, libro_id))
        conn.commit()
        conn.close()

        return jsonify({'message': 'Libro actualizado exitosamente'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Ruta para eliminar un libro por ID
@app.route('/api/libros/<int:libro_id>', methods=['DELETE'])
def delete_libro(libro_id):
    try:
        conn = sqlite3.connect('biblioteca.db')
        cursor = conn.cursor()

        # Verificar si el libro existe antes de intentar eliminar
        cursor.execute('SELECT * FROM libro WHERE id = ?', (libro_id,))
        libro = cursor.fetchone()
        if not libro:
            conn.close()
            return jsonify({'message': 'Libro no encontrado'}), 404

        # Eliminar el libro
        cursor.execute('DELETE FROM libro WHERE id = ?', (libro_id,))
        conn.commit()
        conn.close()

        return jsonify({'message': 'Libro eliminado exitosamente'})

    except Exception as e:
        return jsonify({'error': str(e)}), 500        
          
if __name__ == '__main__':
    app.run(debug=True)