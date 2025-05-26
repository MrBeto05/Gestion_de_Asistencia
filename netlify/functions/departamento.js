const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "departamento.txt");

// Función para leer el valor actual
function leerDepartamento() {
  try {
    return fs.readFileSync(filePath, "utf8") || "Ingeniería de Sistemas y Computación";
  } catch {
    return "Ingeniería de Sistemas y Computación";
  }
}

exports.handler = async (event) => {
  try {
    if (event.httpMethod === "GET") {
      const nombre = leerDepartamento();
      return {
        statusCode: 200,
        body: JSON.stringify({ nombre }),
      };
    }

    if (event.httpMethod === "POST") {
      if (!event.body) {
        return { statusCode: 400, body: "Falta el cuerpo de la solicitud" };
      }

      let data;
      try {
        data = JSON.parse(event.body);
      } catch (e) {
        return { statusCode: 400, body: "JSON inválido" };
      }

      if (!data.nombre || data.nombre.trim() === "") {
        return { statusCode: 400, body: "Falta nombre en el cuerpo" };
      }

      fs.writeFileSync(filePath, data.nombre.trim());

      return {
        statusCode: 200,
        body: JSON.stringify({ mensaje: "Departamento actualizado con éxito", nombre: data.nombre.trim() }),
      };
    }

    return {
      statusCode: 405,
      body: "Método no permitido",
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Error interno del servidor",
    };
  }
};