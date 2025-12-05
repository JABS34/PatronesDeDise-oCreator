// ==============================================================================
// 1. COMPONENTE: Interfaz ICafe (Contrato Base)
// ROL: Define la interfaz que garantiza la transparencia del patrón.
// ==============================================================================
interface ICafe {
    // Método clave 1: Retorna el costo acumulado de la bebida y sus decoraciones.
    costo(): number; 
    // Método clave 2: Retorna la descripción completa de la bebida (base + condimentos).
    getDescripcion(): string; 
}

// ==============================================================================
// 2. COMPONENTES CONCRETOS: Bebidas Base
// ROL: Los objetos base que serán envueltos.
// ==============================================================================
class Expresso implements ICafe {
    // [Implementación]: Provee el costo base sin delegar.
    costo(): number {
        return 2.50; 
    }
    // [Implementación]: Provee la descripción inicial.
    getDescripcion(): string {
        return "Café Expresso";
    }
}

class Descafeinado implements ICafe {
    costo(): number {
        return 3.00;
    }
    getDescripcion(): string {
        return "Café Descafeinado";
    }
}

// ==============================================================================
// 3. DECORADOR BASE: CondimentoDecorator (El Envoltorio / Delegador)
// ROL: Clase abstracta que implementa ICafe y contiene la referencia al Componente.
// ==============================================================================
abstract class CondimentoDecorator implements ICafe {
    // [Composición]: Referencia protegida al objeto ICafe envuelto (el que está "debajo").
    protected cafe: ICafe; 

    // [Constructor]: Fuerza a que el decorador reciba el objeto a decorar al crearse.
    constructor(cafe: ICafe) {
        this.cafe = cafe;
    }

    // [Delegación]: Se fuerzan a implementar en las clases concretas para añadir su lógica.
    abstract costo(): number;
    abstract getDescripcion(): string;
}

// ==============================================================================
// 4. DECORADORES CONCRETOS: Condimentos (Añaden Responsabilidad)
// ROL: Heredan del decorador base y añaden el comportamiento específico.
// ==============================================================================
class Leche extends CondimentoDecorator {
    costo(): number {
        // [Acumulación]: Llama recursivamente a this.cafe.costo() para obtener el valor del objeto envuelto.
        // Después, suma su propio costo (0.75) al resultado devuelto.
        return this.cafe.costo() + 0.75;
    }

    getDescripcion(): string {
        // [Acumulación]: Llama recursivamente a getDescripcion() para obtener la descripción anterior.
        // Después, concatena su propia descripción (", con Leche").
        return this.cafe.getDescripcion() + ", con Leche";
    }
}

class Crema extends CondimentoDecorator {
    costo(): number {
        // Se repite el patrón de delegación y acumulación.
        return this.cafe.costo() + 1.00;
    }

    getDescripcion(): string {
        // Se repite el patrón de delegación y concatenación.
        return this.cafe.getDescripcion() + ", con Crema";
    }
}

// ==============================================================================
// 5. DEMOSTRACIÓN DE USO: Composición Dinámica
// ROL: Mostrar cómo el cliente construye la funcionalidad en tiempo de ejecución.
// ==============================================================================

// Pedido 1: Expresso simple.
let pedido1: ICafe = new Expresso();
console.log(`Pedido 1: ${pedido1.getDescripcion()} - $${pedido1.costo().toFixed(2)}`); 

// Pedido 2: Descafeinado con Leche.
// Se envuelve el objeto base (new Descafeinado()) con el decorador (new Leche()).
let pedido2: ICafe = new Leche(new Descafeinado());
console.log(`Pedido 2: ${pedido2.getDescripcion()} - $${pedido2.costo().toFixed(2)}`); 

// Pedido 3: Expresso con Leche y Crema (Doble Envoltura).
// El Expresso se envuelve en Leche, y ESE resultado (la composición) se envuelve en Crema.
let pedido3: ICafe = new Expresso();
pedido3 = new Leche(pedido3); // El objeto pedido3 ahora es 'Expresso con Leche'
pedido3 = new Crema(pedido3); // El objeto 'Expresso con Leche' es envuelto por 'Crema'
console.log(`Pedido 3: ${pedido3.getDescripcion()} - $${pedido3.costo().toFixed(2)}`);