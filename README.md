# RESTAPIDocs Movies

API Rest desarrollada en NodeJS con Express, principlamente para temas de pruebas y consumir desde cualquier cliente de preferencia. No requiere de autenticación.

La URL principal del API está en 'https://movies-app-nine.vercel.app/'.

## Endpoints (No requieren autorización)

Vale la pena aclarar que por no requerir autenticación en los endpoints de la aplicación se pueden tener inconsistencias con respecto a datos que no sean peliculas.

Si usted va a utilizar utilizar la API REST para fines de aprendizaje o pruebas, especialmente para registrar datos, hagalo respetando la temática de películas para una mejor experencia suya y de los demás usuarios que hagan uso de de la API.

Endpoints libres que no requieren de autenticación.

- Listado de peliculas: `GET /api/movies` - `GET /api/movies?tags=thriller`
- Película por id : `GET /api/movies/:id/`
- Devolver una película : `POST /api/movies/`

  Formato `JSON` de las películas:

  ````{
  "movie": {
     "title": "Notti bianche, Le (White Nights)",
     "year": "2019",
     "cover": "http://dummyimage.com/800x600.png/ff4444/ffffff",
     "description":
     "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.",
     "duration": "66",
     "contentRating": "G",
     "source": "https://ovh.net/semper/rutrum/nulla/nunc.jsp",
     "tags": [
     "Action",
     "Adventure",
     "Horror",
     "Thriller"
     ]
  }

  }```

  ````

- Actualizar una película por id (body con el formato anterior): `PUT /api/movies/:id`
- Eliminar película por id : `DELETE /api/movies/:id/`
