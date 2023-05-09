Prueba técnica
Generar una API (en NodeJS + TypeScript o Laravel) en la que haya un servicio de registro,
autentificación (login) y validación de toquen.
Se puede utilizar MongoDB o MySql como base de datos
El toquen será utilizado con JWT
Cada parámetro debe ser validado. (Se valora separar código y la reutilización del mismo)
Se debe utilizar GIT</br></br>
Tendremos 4 endpoints </br></br>
 ✅Register: Registro de usuario</br>
<ul>
<li>Se le pedirán los siguientes datos:
<ul>
<li> name (Validación de más de 3 caracteres)
<li>surname (Validación de más de 3 caracteres)
<li>email (Formato email y requerido)
<li>phone (Solo números, requerido y de 9 caracteres)
<li>password (requerido, mínimo 8 caracteres, mínimo 1 número, 1 letra y
una mayúscula)
<li>repeatPassword (requerido, mínimo 8 caracteres, mínimo 1 número, 1
letra y una mayúscula y que coincidan los dos passwords)
</ul>
<li> Hay que devolver la sesión de JWT de validez 30 días
</ul></br>
✅Login: crear una sesión de usuario con el email y la contraseña</br></br>
<ul>
<li> Hay que devolver la sesión de JWT de validez 30 días
<li> Comprobar que
<ul>
<li> email (Formato email y requerido)
<li> password (sea el mismo)
</ul>
<li> Recuperar el usuario de la DB
</ul>
</br></br>
✅ Profile Se le enviará una, id por parámetro y devolverá todos los datos del mismo usuario</br></br>
<ul>
<li>Hay que validar el token con un middleware. Si no supera la validación,
retornar error
</ul>
✅ Modificar usuario</br></br>
<ul>
<li> Igual que Registro, pero tendrá que validar que es el usuario con su token y
modificar los datos que se envíen (No hace falta enviarlos todos)
</ul>
Se puede enviar el proyecto con GitHub, GitLab o archivo comprimido
</br></br>

<h1>Puesta en marcha del proyecto</h1>
<h3>Requisitos previos</h3>
Para ejecutarlo en tu máquina local, debes tener instalado lo siguiente:
<ul>
	<li>Node.js</li>
  <li>Docker Descktop</li>
</ul></br></br>
<p> Para inicializar el proyecto primero debemos instalar todas las dependencias </br>
<code>npm install</code></br></br>
<p>Crea un archivo <code>.env</code> en la raíz del directorio del servidor y agrega las siguientes variables de entorno:</p>
  <code>
  URL_DATABASE = mongodb://jorge:cuaresma@localhost:27027/prueba_tecnica?authSource=admin </br>
  JWT_SECRET = talentfy
  </code></br></br>
<p> Ahora debemos levantar el contenedor docker que viene configurado en el archivo docker-compose.yaml</p>
<code>npm docker-compose up -D</code></br></br>
<p>A continuación pondremos el servidor en marcha con conexion a la BBDD (este comando levanta el servidor y si efectuamos cualquier cambio en los archivos mediante ts-node-dev se vuelve a compilar TS a JS y tendremos de nuevo el servidor disponible con los nuevos cambios en el código)</p>
<code>npm run start:dev</code></br></br>


