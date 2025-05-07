Gestión de Usuarios - Prueba Técnica React



Aplicación React para prueba técnica que implementa un CRUD completo de usuarios con conexión a API REST, paginación y diseño responsive.

Características principales:

✅ Listado de usuarios con paginación

✅ Filtrado automático por status=true

<!-- ✅ Funcionalidad CRUD completa (Crear, Leer, Actualizar, Eliminar) -->

<!-- ✅ Validación de formularios -->

✅ Diseño responsive (mobile, tablet, desktop)

<!-- ✅ Confirmación antes de eliminar registros -->

✅ Despliegue en Netlify

Tecnologías utilizadas

React

Vite

Tailwind CSS

Lucide Icons

Toastify

GitHub

Estructura del proyecto
src/
├── components/
|   |── AddUser.jsx        # Botón flotante para agregar usuarios solo para mobile
|   |── ConfirmationModal.jsx     # Modal para confirmar la eliminación de un usuario
|   |── Loading.jsx        # Componente de carga
|   |── UserForm.jsx       # Componente para agregar un usuario
│   ├── UserTable.jsx      # Componente de tabla de usuarios
│   ├── PaginationTable.jsx       # Paginador
│   └── PaginationControlers.jsx  # Controles de paginación para el limite de usuarios
├── App.jsx                # Componente principal
└── main.jsx               # Punto de entrada

Instalación y uso
Clonar el repositorio:

bash
git clone https://github.com/Osorio3408/PruebaTecnica
Instalar dependencias:

bash
cd prueba_tecnica
npm install
Ejecutar en desarrollo:

bash
npm run dev
Construir para producción:

bash
npm run build
Requisitos cumplidos
Requisito	Estado
Conexión a API	✅

Mostrar tabla	✅

Filtrar por status=true	✅

CRUD completo	✅

Eliminar con confirmación	✅

Estilos con Tailwind	✅

Subido a GitHub	✅

Desplegado en Netlify	✅


Funcionalidades adicionales

Paginación inteligente con límite configurable

Diseño responsive adaptativo
