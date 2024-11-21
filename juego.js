export class Juego { // Definición de la clase Juego
    constructor() {
        this.userScore = 0; // Puntuación del usuario (encapsulación)
        this.computerScore = 0; // Puntuación de la computadora (encapsulación)
        this.choices = ['r', 'p', 't']; // Opciones de elección (encapsulación)
    }

    getComputerChoice() { // Genera una elección aleatoria para la computadora (encapsulación)
        const randomNumber = Math.floor(Math.random() * 3); // Genera un número aleatorio
        return this.choices[randomNumber]; // Devuelve la elección aleatoria
    }

    convertToWord(letter) { // Convierte una letra a palabra completa (encapsulación)
        switch (letter) {
            case "r": return "piedra"; // Convierte 'r' a "piedra"
            case "p": return "papel"; // Convierte 'p' a "papel"
            case "t": return "tijera"; // Convierte 't' a "tijera"
        }
    }

    resetScores() { // Reinicia las puntuaciones (encapsulación)
        this.userScore = 0; // Reinicia la puntuación del usuario
        this.computerScore = 0; // Reinicia la puntuación de la computadora
    }
}

// Notas:
// - Encapsulación: Se implementa en las propiedades y métodos que controlan el estado del juego.
// - Herencia: No se utiliza en este código; la clase Juego no es extendida por ninguna otra clase.
// - Polimorfismo: No se utiliza en este código; no hay métodos sobrescritos de una clase base en una clase derivada.
