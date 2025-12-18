import "./QuienesSomos.css";

function QuienesSomos() {
  return (
    <div className="quienes-container">
      <h2 className="quienes-titulo">¿Quiénes Somos?</h2>

      <p className="quienes-texto">
        Este sistema fue desarrollado por el{" "}
        <strong>
          grupo de estudiantes del programa ANALISIS Y DESARROLLO DE SOFTWARE
          FICHA 3113325 GRUPO 9
        </strong>{" "}
        del SENA, como parte de su formación técnica en desarrollo de software.
        Nuestro objetivo es brindar una solución funcional, elegante y adaptada
        a las necesidades en un Sistema de Inventarios.
      </p>

      <p className="quienes-texto">
        Cada componente ha sido diseñado con dedicación, aplicando buenas
        prácticas de programación, diseño institucional y documentación técnica.
        El proyecto refleja nuestro compromiso con el aprendizaje práctico, el
        trabajo colaborativo y la mejora continua.
      </p>

      <p className="quienes-texto">
        Agradecemos el acompañamiento de nuestros instructores en la validación
        de requerimientos. Este sistema es más que una aplicación: es el
        resultado de esfuerzo, formación y visión profesional.
      </p>

      <h3 className="quienes-subtitulo">Autores</h3>
      <ul className="quienes-lista">
        <li>JORGE ARMANDO JUAJINOY </li>
        <li>ALEXANDER CHAVARRO CHAVARRO </li>
      </ul>

      <h3 className="quienes-subtitulo">Instructores</h3>
      <ul className="quienes-lista">
        <li>LUIS CARLOS OSPINA </li>
        <li>USEIN GONZALES </li>
      </ul>

      <p className="quienes-texto">SERVICIO NACIONAL DE APRENDEIZAJE - SENA</p>
      <p className="quienes-texto">2025</p>
    </div>
  );
}

export default QuienesSomos;
