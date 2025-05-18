# 💼 Ejercicio Práctico: Dashboard de Portfolio Financiero

## 🎯 Objetivo

Desarrollar una aplicación web con **Angular Moderno** que permita visualizar un **portfolio financiero personal**, mostrando los diferentes activos del usuario, su valor total y una estimación del valor actualizado en función de precios simulados.

---

## 🧱 Requisitos funcionales

1. **Visualización del portfolio**

   - Mostrar todos los activos (`assets`) del usuario, incluyendo nombre, tipo, símbolo y cantidad.
   - Mostrar el valor total del portfolio en la barra de navegación (`value`), calculado con los precios actuales.

2. **Autenticación**

   - Simular un flujo básico de autorización para obtener el portfolio de un usuario autenticado.
   - Los datos se obtendrán desde un **servidor Node local**. Inicialmente simulado.

3. **Simulación de precios**

   - Utilizar un **interceptor HTTP** en Angular para interceptar las peticiones a precios y devolver valores simulados con el siguiente formato:
     ```ts
     export type Rate = {
       symbol: string;
       name: string;
       price: number;
       timestamp: number;
     };
     ```

4. **Filtrado por tipo de activo**

   - Permitir al usuario filtrar entre: efectivo, criptomonedas y acciones (`cash`, `crypto`, `stoks`). y actualizar valor en consecuencia.

5. **Actualización**

   - Permitir actualizar las unidades de cada asset y re-calcular automáticamente el valor total del portfolio.

6. **Accesibilidad y semántica**
   - Usar solo HTML estándar semántico, sin frameworks de estilos ni librerías externas para maquetación.

---

## 🧾 Modelos de datos

```ts
export type Asset = {
  id: number;
  name: string;
  type: "cash" | "crypto" | "stoks";
  symbol: string;
  quantity: number;
};

export type Portfolio = {
  id: number;
  userId: number;
  currency: string;
  date: Date;
  assets: Asset[];
  value: number;
};

export type Rate = {
  symbol: string;
  name: string;
  price: number;
  timestamp: number;
};
```

---

## ⚙️ Requisitos técnicos

- **Frontend**: Angular (última versión).
- **Estilos**: HTML semántico sin frameworks CSS.
- **Backend**: Servidor Node local que expone endpoints REST para:
  - Autenticación simulada
  - Recuperación del portfolio
- **Precios**: Simulados mediante un interceptor Angular que responde a las peticiones de precios.

---

## 🔄 Flujo esperado

1. Usuario accede a la aplicación y se autentica (simulado).
2. El sistema obtiene el portfolio desde un endpoint local (`/api/portfolio`).
3. Por cada símbolo, se consulta un endpoint de precios (`/api/prices/:symbol`), interceptado para devolver precios aleatorios.
4. Se calcula el valor total del portfolio y se muestra.
5. El usuario puede:
   - Filtrar activos por tipo
   - Actualizar precios para recalcular el valor total

## Rutas

- `/` : home con el dashboard del portfolio
- `/auth` : formulario de autenticación
- `/asset/:symbol` : detalles de un activo
- `/asset/:symbol/edit` : formulario para editar un activo
- `/portfolio/search?q=` : consulta y filtrado de activos con parámetros de tipo y ordenación
