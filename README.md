# 🌟 Proyecto Integrador – Sexto Ciclo

**Sistema de Inventarios con Lector de Código de Barras para SurtiMarket**  

📚 **Universidad de los Andes**  
👨‍💻 **Realizado por:**  
- Cristhian Gabriel Pinos  
- Christian Felipe Torres  

---

## 📖 Descripción
Este proyecto es un **Sistema de Inventarios moderno** que permite administrar productos, categorías y existencias de manera sencilla.  
Incluye un **lector de código de barras** que agiliza la gestión de entradas y salidas de inventario.

- **FrontEnd:** [Angular](https://angular.io/)  
- **Backend / Base de Datos:** [Supabase](https://supabase.com/)  
- **Funcionalidad principal:** Control completo de inventarios (CRUD), registro de productos, movimientos de stock y escaneo de códigos de barras.

---

## 🚀 Características
✅ Interfaz moderna y responsiva con Angular  
✅ Lector de códigos de barras en tiempo real  
✅ Operaciones de inventario rápidas y fáciles (Altas, Bajas, Modificaciones)  
✅ Integración con Supabase para autenticación, almacenamiento y base de datos  
✅ Arquitectura escalable para futuros módulos

---

## ⚡ Requerimientos previos
Asegúrate de tener instalados:

- [Node.js](https://nodejs.org/) (v18 o superior recomendado)
- [Angular CLI](https://angular.io/cli)
- Una cuenta en [Supabase](https://supabase.com/)

---

## 🛠️ Instrucciones para correr el proyecto

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/TU-USUARIO/SurtiMarket-Inventory.git
cd SurtiMarket-Inventory
```

### 2️⃣ Instalar dependencias
```bash
npm install
```

### 3️⃣ Configurar variables de entorno
Crea un archivo **`src/environments/environment.ts`** con tu configuración de Supabase:

```typescript
export const environment = {
  production: false,
  supabaseUrl: 'https://<TU_SUPABASE_URL>',
  supabaseKey: '<TU_SUPABASE_ANON_KEY>'
};
```

> 💡 También crea `environment.prod.ts` para producción si lo necesitas.

### 4️⃣ Ejecutar el proyecto en modo desarrollo
```bash
ng serve
```
Luego abre en tu navegador:
```
http://localhost:4200
```

---

## 📦 Construir para producción
Para generar una versión lista para desplegar:
```bash
ng build --configuration production
```
Los archivos finales estarán en la carpeta **`/dist`**.

---

## 🔧 Supabase – Configuración básica
1. Crear un nuevo proyecto en [Supabase](https://supabase.com/).
2. Crear las tablas necesarias para Inventarios y Productos.
3. Configurar **Policies** y **RLS (Row Level Security)** si deseas seguridad por usuario.
4. Obtener la **URL** y la **Anon Key** para tu conexión.

---

## 💡 Notas
- El sistema está diseñado para **SurtiMarket**, pero puede adaptarse a otros negocios.  
- El lector de código de barras puede funcionar con dispositivos USB o cámaras compatibles.  
- Se recomienda usar navegadores modernos para mejor experiencia.

---

## 🎯 Objetivo Académico
Este proyecto fue desarrollado como parte del **Proyecto Integrador del Sexto Ciclo** de la Universidad de los Andes, demostrando la aplicación de tecnologías web modernas para resolver problemas de gestión empresarial.

---

✨ **¡Gracias por revisar nuestro proyecto!**