import { Juego } from './juego.js';

// Clase que hereda de Juego y encapsula la lógica específica de Piedra, Papel o Tijera
export class JuegoPiedraPapelTijera extends Juego {
    constructor() {
        super(); // Herencia: llama al constructor de la clase base Juego
        
        // Encapsulación: Propiedades privadas (usando convención de prefijo "_")
        this._userScore_span = document.getElementById("user-score"); // Marcador del usuario (elemento HTML)
        this._computerScore_span = document.getElementById("computer-score"); // Marcador de la computadora (elemento HTML)
        this._result_p = document.querySelector(".result > p"); // Resultado del juego (elemento HTML)
        this._piedra_div = document.getElementById("r"); // Botón "piedra" (elemento HTML)
        this._papel_div = document.getElementById("p"); // Botón "papel" (elemento HTML)
        this._tijera_div = document.getElementById("t"); // Botón "tijera" (elemento HTML)
        this._resetButton = document.getElementById("reset-btn"); // Botón de reinicio (elemento HTML)

        // Encapsulación: Método inicial para configurar el juego, llamado al crear una instancia
        this._main();
    }

    // Encapsulación: Método privado que determina el resultado de cada ronda del juego
    _game(userChoice) { 
        const computerChoice = this.getComputerChoice(); // Herencia: obtiene elección de la computadora desde la clase base
        switch (userChoice + computerChoice) {
            case "rt":
            case "pr":
            case "tp":
                this._win(userChoice, computerChoice); // Llama al método privado _win si el usuario gana
                break;
            case "rp":
            case "pt":
            case "tr":
                this._lose(userChoice, computerChoice); // Llama al método privado _lose si el usuario pierde
                break;
            default:
                this._draw(userChoice, computerChoice); // Llama al método privado _draw si hay empate
                break;
        }
    }

    // Encapsulación: Método privado que maneja el caso en el que el usuario gana
    _win(userChoice, computerChoice) { 
        this.userScore++; // Herencia: incrementa el marcador del usuario, definido en la clase base
        this._updateScoreboard(); // Encapsulación: actualiza marcador en pantalla
        this._showResult(`${this.convertToWord(userChoice)} beats ${this.convertToWord(computerChoice)}. You win!`, 'green-glow', userChoice);
    }

    // Encapsulación: Método privado que maneja el caso en el que el usuario pierde
    _lose(userChoice, computerChoice) { 
        this.computerScore++; // Herencia: incrementa el marcador de la computadora, definido en la clase base
        this._updateScoreboard(); // Encapsulación: actualiza marcador en pantalla
        this._showResult(`${this.convertToWord(computerChoice)} beats ${this.convertToWord(userChoice)}. You lose.`, 'red-glow', userChoice);
    }

    // Encapsulación: Método privado que maneja el caso en el que hay un empate
    _draw(userChoice, computerChoice) { 
        this._showResult(`${this.convertToWord(userChoice)} equals ${this.convertToWord(computerChoice)}. It's a draw.`, 'gray-glow', userChoice);
    }

    // Encapsulación: Método privado que actualiza el marcador en pantalla
    _updateScoreboard() { 
        this._userScore_span.innerHTML = this.userScore; // Muestra el marcador actualizado del usuario
        this._computerScore_span.innerHTML = this.computerScore; // Muestra el marcador actualizado de la computadora
    }

    // Encapsulación: Método privado que muestra el resultado en pantalla con efectos visuales
    _showResult(message, effectClass, userChoice) { 
        this._result_p.innerHTML = message; // Actualiza el mensaje de resultado
        const userChoice_div = document.getElementById(userChoice); // Elemento HTML correspondiente a la elección del usuario
        this._removeNeonEffect(userChoice); // Remueve el efecto de neón previo
        userChoice_div.classList.add(effectClass); // Añade el efecto visual de resultado (ganar/perder/empate)
        setTimeout(() => {
            userChoice_div.classList.remove(effectClass); // Remueve el efecto después de un tiempo
            userChoice_div.classList.add('neon-default'); // Restablece el efecto de neón
        }, 300);
    }

    // Encapsulación: Método privado que configura los eventos del juego y aplica el efecto inicial
    _main() { 
        this._addNeonEffectToChoices(); // Aplica el efecto visual de neón inicial a las opciones
        this._piedra_div.addEventListener('click', () => this._game("r")); // Evento para "piedra"
        this._papel_div.addEventListener('click', () => this._game("p")); // Evento para "papel"
        this._tijera_div.addEventListener('click', () => this._game("t")); // Evento para "tijera"
        this._resetButton.addEventListener('click', () => this._resetGame()); // Evento para reiniciar el juego
    }

    // Encapsulación: Método privado que reinicia el juego a su estado inicial
    _resetGame() { 
        this.resetScores(); // Herencia: llama al método de la clase base para reiniciar los puntajes
        this._updateScoreboard(); // Actualiza el marcador en pantalla
        this._result_p.innerHTML = "¡Juego reiniciado! Selecciona tu movimiento."; // Mensaje de reinicio
        this._addNeonEffectToChoices(); // Aplica el efecto de neón a las opciones nuevamente
    }

    // Encapsulación: Método privado que aplica el efecto de neón a todas las opciones
    _addNeonEffectToChoices() { 
        const choices = document.querySelectorAll(".choice"); // Selecciona todos los elementos de elección
        choices.forEach(choice => {
            choice.classList.add('neon-default'); // Aplica el efecto de neón
        });
    }

    // Encapsulación: Método privado que remueve temporalmente el efecto de neón de una opción
    _removeNeonEffect(userChoice) { 
        const userChoice_div = document.getElementById(userChoice); // Elemento de la opción seleccionada por el usuario
        userChoice_div.classList.remove('neon-default'); // Remueve el efecto de neón para dar paso al nuevo efecto
    }
}

// Notas:
// - Encapsulación: Se implementa en las propiedades y métodos que controlan el estado del juego. Todas las propiedades son accesibles solo a través de métodos dentro de la clase.
// - Herencia: No se utiliza en este código; la clase Juego no es extendida por ninguna otra clase.
// - Polimorfismo: No se utiliza en este código; no hay métodos que se redefinan de una clase base en una clase derivada.