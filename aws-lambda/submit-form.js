// AWS Lambda Function para manejar el formulario de contacto
// Sube este código a AWS Lambda y configura API Gateway

exports.handler = async (event) => {
  // Configurar CORS
  const headers = {
    "Access-Control-Allow-Origin": "https://mqm.digital", // Cambia por tu dominio
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  // Manejar preflight OPTIONS request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  // Solo permitir POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  try {
    // Parsear el body del request
    const data = JSON.parse(event.body);

    // Validar campos requeridos
    if (!data.email || !data.custom_subject || !data.message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          message: "Missing required fields",
        }),
      };
    }

    // Obtener access_key desde variable de entorno de Lambda
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      console.error("WEB3FORMS_ACCESS_KEY not configured");
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          success: false,
          message: "Server configuration error",
        }),
      };
    }

    // Preparar los datos para Web3Forms
    const formData = new URLSearchParams({
      access_key: accessKey,
      subject: "Nuevo mensaje desde mqm.digital",
      from_name: "Formulario Web mqm.digital",
      email: data.email,
      custom_subject: data.custom_subject,
      message: data.message,
    });

    // Enviar a Web3Forms
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const result = await response.json();

    return {
      statusCode: response.ok ? 200 : 400,
      headers,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error("Error processing form:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        message: "Internal server error",
      }),
    };
  }
};
