# Ecommerce NextJS

Este proyecto es una aplicación web mobile desarrollada con NextJS, Material-UI (MUI), y AWS Amplify para la gestión de artículos en un sistema de comercio electrónico. La aplicación permite crear, actualizar, eliminar y visualizar artículos, siguiendo las especificaciones y consideraciones detalladas en el documento de proyecto.

## Requisitos

- Node.js (v14.1.0 o superior)
- npm (v6.14.0 o superior)

## Instalación

1. Clona este repositorio: git clone [URL_DEL_REPOSITORIO]
2. Entra al directorio del proyecto: cd ecommerce-nextjs
3. Instala las dependencias: npm install

## Configuración de AWS Amplify

Este proyecto utiliza AWS Amplify para la autenticación y el almacenamiento de datos. Asegúrate de configurar tu entorno de Amplify antes de ejecutar la aplicación. Ejecuta los siguientes comandos en la terminal:

amplify configure # Sigue las instrucciones para configurar tu cuenta de AWS
amplify init # Configura tu entorno de Amplify
amplify add api # Añade una API GraphQL para el almacenamiento de datos
amplify push # Implementa los cambios en tu entorno Amplify

## Ejecución

Una vez configurado Amplify, puedes ejecutar la aplicación con el siguiente comando:

npm run dev
La aplicación estará disponible en http://localhost:3000.

## Estructura del Proyecto

- app/: Contiene las páginas de NextJS.
- components/: Almacena componentes reutilizables.
- amplify/: Este directorio almacena todo el código del backend, incluyendo la configuración de AWS Amplify.

## Características Técnicas

- Typescript: El proyecto está escrito en TypeScript para mejorar la robustez del código.
- Linters: Se utilizan linters para garantizar buenas prácticas de codificación.
- Next.js: La aplicación se construye sobre Next.js, aprovechando el SSR para una mejor experiencia de usuario.
- Material-UI (MUI): Se utiliza MUI para los estilos y componentes visuales.

## Características Funcionales Adicionales

- Persistencia de Artículos: Los artículos se guardan localmente para preservarlos entre sesiones.
- Validación de Nombre Único: Se impide el registro de artículos con nombres duplicados.
- Autenticación de Usuarios: Se implementa la autenticación de usuarios con AWS Cognito.
- Publicación en Internet: La aplicación se puede desplegar en un servidor web para acceder a ella a través de Internet.

## Pruebas Unitarias

Se alienta la implementación de pruebas unitarias para garantizar la calidad del código. Puedes ejecutar las pruebas con el siguiente comando:

npm test

## Notas Adicionales

- Asegúrate de tener las credenciales de AWS configuradas correctamente antes de utilizar Amplify.
- Si surgen problemas durante la configuración o ejecución, consulta la documentación específica de cada tecnología utilizada.
- ¡Esperamos tu revisión y retroalimentación! Gracias por considerar este proyecto.
