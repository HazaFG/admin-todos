import { PrismaClient } from '../generated/prisma';


let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
}

export default prisma;

/*
// Importa la clase PrismaClient que fue generada por `npx prisma generate`
// La ruta es relativa a la ubicación de este archivo.
// Por ejemplo, si este archivo está en `src/lib/prisma.ts`,
// y Prisma Client se genera en `src/generated/prisma`, entonces `../generated/prisma` es correcto.
import { PrismaClient } from '../generated/prisma';
// Si también estás usando la extensión Prisma Accelerate, la importas aquí:
// import { withAccelerate } from '@prisma/extension-accelerate';


// Declara una variable `prisma` que almacenará la única instancia de PrismaClient.
// `: PrismaClient` es una anotación de tipo de TypeScript que asegura la seguridad de tipos.
let prisma: PrismaClient;

// Esta es una característica clave para el Hot Reloading en desarrollo.
// En entornos Node.js, `global` es un objeto global que persiste
// a lo largo de la vida de la aplicación. Lo usamos para almacenar
// la instancia de PrismaClient de forma que sea accesible globalmente.
// `as unknown as` es una forma de decirle a TypeScript que vamos a
// añadir una propiedad `prisma` a `global`, aunque por defecto no la tenga.
const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

// **Lógica de Inicialización del Prisma Client (Patrón Singleton)**

// Verifica si el entorno es de producción.
// `process.env.NODE_ENV` es una variable de entorno estándar:
// - 'production' cuando la app está desplegada y en vivo.
// - 'development' cuando estás desarrollando localmente.
if (process.env.NODE_ENV === 'production') {
  // Si estamos en producción, simplemente creamos una nueva instancia de PrismaClient.
  // En producción, no hay Hot Reloading que cause problemas de múltiples instancias.
  prisma = new PrismaClient();
} else {
  // Si estamos en desarrollo (donde el Hot Reloading está activo):

  // 1. Comprobamos si ya existe una instancia de PrismaClient en el objeto `global`.
  //    Si el Hot Reloading recarga este módulo, esta condición verificará si ya
  //    habíamos creado una instancia en una recarga anterior.
  if (!(globalForPrisma.prisma)) {
    // 2. Si NO existe una instancia en `global`, la creamos.
    //    Esta es la primera vez que se carga este módulo o la primera recarga
    //    después de un reinicio completo del servidor.
    //    Si usas Prisma Accelerate, sería:
    //    globalForPrisma.prisma = new PrismaClient().$extends(withAccelerate());
    globalForPrisma.prisma = new PrismaClient();
  }
  // 3. Asignamos la instancia (ya sea la recién creada o la ya existente de `global`)
  //    a nuestra variable local `prisma`.
  //    Esto asegura que siempre usemos la misma instancia única de PrismaClient
  //    a través de las recargas en caliente.
  prisma = globalForPrisma.prisma;
}

// Exporta la instancia de PrismaClient para que pueda ser utilizada
// en otras partes de tu aplicación (por ejemplo, en tus API routes o servicios).
export default prisma;

 
*/
