🚀 MiInventarioExpress - Aplicación Web de Gestión de Productos y Chat en Tiempo Real

MiInventarioExpress es una aplicación web que permite gestionar productos, realizar autenticación de usuarios, y comunicarse en tiempo real mediante un chat interactivo. Utiliza Node.js, Express, MongoDB, Socket.io y Multer para crear una experiencia robusta y moderna.

🌟 Características Principales

💻 Gestión de Productos: CRUD (Crear, Leer, Actualizar, Eliminar) de productos con imágenes.

🔐 Autenticación de Usuarios: Registro, Login y Logout con sesiones.

💬 Chat en Tiempo Real: Comunicación en vivo usando Socket.io.

📸 Carga de Imágenes: Los productos pueden tener imágenes asociadas, cargadas fácilmente con Multer.

🛠️ Tecnologías Utilizadas

Node.js + Express: Para crear el servidor y manejar las rutas.

MongoDB + Mongoose: Para la base de datos NoSQL y ORM.

Socket.io: Para habilitar la comunicación en tiempo real (chat).

Multer: Para la carga de imágenes de productos.

bcryptjs: Para la encriptación de contraseñas.

⚡ Cómo Empezar

Clonar el repositorio:

git clone https://github.com/JoelGrefa/MiInventarioExpress.git
cd MiInventarioExpress


Instalar dependencias:

npm install


Configurar MongoDB:

Si usas MongoDB local, asegúrate de tener MongoDB corriendo en mongodb://localhost:27017/miInventario.

O configura MongoDB Atlas para usarlo en la nube.

Iniciar el servidor:

npm start


El servidor estará corriendo en http://localhost:3000.

📂 Rutas Principales

📜 Registro de usuario:

POST /auth/register: Crear una cuenta de usuario.

🔑 Login de usuario:

POST /auth/login: Iniciar sesión con email y contraseña.

💬 Chat en tiempo real:

GET /chat: Acceder al chat una vez autenticado.

📦 Productos (CRUD):

GET /api/productos: Ver todos los productos.

POST /api/productos: Crear un nuevo producto.

PUT /api/productos/:id: Actualizar un producto.

DELETE /api/productos/:id: Eliminar un producto.

💡 Prueba la aplicación

Regístrate: Entra a http://localhost:3000/register.html y crea tu cuenta.

Inicia sesión: Ve a http://localhost:3000/login.html e ingresa con tu cuenta.

Accede al Panel: Después de iniciar sesión, serás redirigido a http://localhost:3000/dashboard, donde puedes acceder a los productos y al chat en tiempo real.

CRUD de Productos: Desde http://localhost:3000/productos-ui, puedes crear, editar y eliminar productos.

🛠️ Funcionalidades Futuras

🔔 Notificaciones en tiempo real para alertar sobre nuevos mensajes en el chat.

🛡️ Roles de usuario: Diferenciar permisos entre administradores y usuarios comunes.

🌐 Despliegue en la nube: Utilizar Heroku o Render para hacer la app accesible desde cualquier parte.