
// import abstractions //
import { GameEngine } from './abstractions/game mechanism/game_engine.js';
import { algorithms } from './abstractions/game mechanism/algorithms/algorithms.js';


// events in the game //

// resize window game (#) //
window.addEventListener('resize', changePlayFieldWidth);

// load game (0) //
window.addEventListener('load', startIntroGame);

// exprecton and prepare game (1) //
window.addEventListener('click', changeAlgirtmicConstruction);
window.addEventListener('keydown', changeAlgirtmicConstruction);



// functions //

// change play field width (#) //
function changePlayFieldWidth() {

    let play_field__wrapper = document.querySelector(`.play_field__wrapper`);

    if (window.screen.availWidth > 1600) {
        play_field__wrapper.style.width = 85 + 'vw';
        return;
    }

    if (window.screen.availWidth > 1000) {
        play_field__wrapper.style.width = 80 + 'vw';
        return;
    }

    play_field__wrapper.style.width = 100 + 'vw';

}
// start intro game (0) //
function startIntroGame() {

    GameEngine.start(
        algorithms.introduction_game
    );

}
// change algoritmic construction (1) //
function changeAlgirtmicConstruction(event) {

    let element = event.target;

    if (element.classList.contains('js-play_field__expection') ||
        (document.querySelector('.js-play_field__expection') && event.code == 'Space')) {

        GameEngine.start(
            algorithms.preparation_start_game
        );
        return;

    }

    if (element.classList.contains('js-play_field__expection_process_game') ||
        (document.querySelector('.js-play_field__expection_process_game') && event.code == 'Space')) {

        GameEngine.start(
            algorithms.start_game
        );

        expectionEndGame();
        
        return;

    }

}
// expextion (2) //
function expectionEndGame() {

    let play_field = document.getElementById('play_field');

    let expection_end_game = setInterval(

        function() {

            if(play_field.classList.contains('js-play_field__game_over')) {

                GameEngine.start(
                    algorithms.end_game
                );

                clearInterval(expection_end_game);

            }

        },
        5

    );


}