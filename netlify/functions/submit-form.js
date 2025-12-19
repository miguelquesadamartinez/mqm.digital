// Netlify Function para manejar el envío del formulario de contacto
// La access_key se guarda de forma segura en las variables de entorno de Netlify

exports.handler = async (event, context) => {
  // Solo permitir POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
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
        body: JSON.stringify({
          success: false,
          message: "Missing required fields",
        }),
      };
    }

    // Preparar los datos para Web3Forms
    const formData = new URLSearchParams({
      access_key: process.env.WEB3FORMS_ACCESS_KEY,
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
      body: formData,
    });

    const result = await response.json();

    return {
      statusCode: response.ok ? 200 : 400,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error("Error processing form:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: "Internal server error",
      }),
    };
  }
};
