
// import //

// abstractions
import { syncGameEngine } from './abstractions/game mechanism/engines/sync_game_engine.js';
import { asyncGameEngine } from './abstractions/game mechanism/engines/async_game_engine.js';
import { algorithms } from './abstractions/game mechanism/algorithms/algorithms.js';

// components
import { player } from './components/player/player.js';
import { play_field } from './components/play field/play_field.js';


// events in the game //

// resize
window.addEventListener('resize', function changeWidthPlayField() {

    let play_field__wrapper = document.querySelector('.play_field__wrapper');;

    if (window.screen.availWidth > 1600) {
        return play_field__wrapper.style.width = 85 + 'vw';
    }

    if (window.screen.availWidth > 1000) {
        return play_field__wrapper.style.width = 80 + 'vw';
    }

    play_field__wrapper.style.width = 100 + 'vw';

});

// load
window.addEventListener('load', function startGameEngines() {

    syncGameEngine.start(
        algorithms.syncronous
    );

    asyncGameEngine.start(
        algorithms.asyncronous
    );

});

// gamer's actions in the game
window.addEventListener('click', function (event) {

    if (event.target.className == '') return;

    checkPlayFieldClass();

});
window.addEventListener('keydown', function (event) {

    if (event.code != undefined && event.code != 'Space') return;

    checkPlayFieldClass();

});

function checkPlayFieldClass() {

    let presence_pointer = getComputedStyle(
        play_field.HTML_LINK.parentElement
    ).cursor == 'pointer';

    if (!presence_pointer) return;

    let expection_prepare_game = play_field.HTML_LINK.classList.contains(
        play_field.statuses.expection_prepare_game.class
    );
    let expection_process_game = play_field.HTML_LINK.classList.contains(
        play_field.statuses.expection_process_game.class
    )
    let process_game = play_field.HTML_LINK.classList.contains(
        play_field.statuses.process_game.class
    )

    if (expection_prepare_game) {

        syncGameEngine._launchWorkAlgorithm();

    } else if (expection_process_game) {

        syncGameEngine._launchWorkAlgorithm();
        expectionEndGame();

    } else if (process_game) {

        if (document.querySelector('.player_fall')) {
            player.ANIMATIONS_SETTINGS.ANIMATIONS.fly.start();
        }

    }

}

function expectionEndGame() {

    let expection_end_game = setInterval(

        function () {

            let checking_class = play_field.HTML_LINK.classList.contains(
                play_field.statuses.game_over.class
            );

            if (checking_class) {

                clearInterval(expection_end_game);
                syncGameEngine._launchWorkAlgorithm();

            }

        }, 25

    );

}
