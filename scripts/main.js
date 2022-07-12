
// import abstractions //
import { GameEngine } from './abstractions/game mechanism/game_engine.js';
import { algorithms } from './abstractions/game mechanism/algorithms/algorithms.js';

// import components //
import { player } from './components/player/player.js';


// events in the game //

// resize window game //
window.addEventListener('resize', changeWidthPlayField);

// load game //
window.addEventListener('load', startIntroGame);

// actions gamer in the game //
window.addEventListener('click', function (event) {

    if (event.target.className == '') return;

    eventsDependingOnStatePlayField();

});
window.addEventListener('keydown', function (event) {

    if (event.code != undefined && event.code != 'Space') return;

    eventsDependingOnStatePlayField();

});


// functions //

// change play field width (#) //
function changeWidthPlayField() {

    let play_field__wrapper = document.querySelector('.play_field__wrapper');;

    if (window.screen.availWidth > 1600) return play_field__wrapper.style.width = 85 + 'vw';

    if (window.screen.availWidth > 1000) return play_field__wrapper.style.width = 80 + 'vw';

    play_field__wrapper.style.width = 100 + 'vw';

}
// start intro game //
function startIntroGame() {

    GameEngine.start(
        algorithms.introduction_game
    );

}
// events depending on the state of the game floor //
function eventsDependingOnStatePlayField() {

    let play_field = document.getElementById('play_field');
    let play_field__wrapper = document.querySelector('.play_field__wrapper');

    if (getComputedStyle(play_field__wrapper).cursor != 'pointer') return;

    // start preparation start game //
    if (play_field.classList.contains(
        'js-play_field__expection'
    )) {

        GameEngine.start(
            algorithms.preparation_start_game
        );
        return;

    }

    // start expection process game //
    if (play_field.classList.contains(
        'js-play_field__expection_process_game'
    )) {

        GameEngine.start(
            algorithms.start_game
        );

        expectionEndGame();
        return;

    }

    // player fly //
    if (play_field.classList.contains(
        'js-play_field__process_game'
    )) {

        if (document.querySelector('.player_fall')) {
            player.ANIMATIONS_SETTINGS.ANIMATIONS.fly.start();
        }
        return;

    }

}
// expextion end game //
function expectionEndGame() {

    let play_field = document.getElementById('play_field');
    let interval_expection = 15;

    let expection_end_game = setInterval(

        function () {

            if (play_field.classList.contains(
                'js-play_field__game_over'
            )) {

                GameEngine.start(
                    algorithms.end_game
                );

                clearInterval(expection_end_game);

            }

        },
        interval_expection

    );

}