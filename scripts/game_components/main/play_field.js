
// main ======================================================== //

// utilities --------------------------------------------------- //
import createElementHTML from "../../utility/work_with_html.js";

// elements ---------------------------------------------------- //
import player from "./player.js";


// main ======================================================== //

// play field -------------------------------------------------- //
const play_field = {

    // html ---------------------------------------------------- //
    HTML: createElementHTML({
        attributes: { id: "play_field" },
        inner_value:
            `
            <span id="game_author" class="main_under_title">
                © Lichagin Gleb
            </span>
        `,
    }),

    // narrowing value ----------------------------------------- //
    get narrowing_value() {
        if (window.screen.availWidth > 1600) return 20;
        if (window.screen.availWidth > 1200) return 15;
        return 0;
    },

    // statuses ------------------------------------------------ //
    statuses: {
        expection: "js-play_field__expection",
        process_game: "js-play_field__process_game",
    },

};


// Events ====================================================== //

// change the width of the playing field if the window changes size
window.addEventListener(
    'resize',
    function changeWidthPlayField() {
        let width_play_field = (100 - play_field.narrowing_value);
        play_field.HTML.style.width = width_play_field + "vw"
    }
);

// keydown on play field --------------------------------------- //
window.addEventListener(
    "keydown",
    function (event) {
        if (event.code == 'Space') play_field.HTML.click();
    }
);

// click on play_field - remove the expection class (status)
// from the play field ----------------------------------------- //
play_field.HTML.onclick = function () {

    let class_play_field = play_field.HTML.classList;

    if (class_play_field.contains(play_field.statuses.expection)) {
        play_field.HTML.classList.remove(play_field.statuses.expection);
    }
    if(class_play_field.contains(play_field.statuses.process_game)) {
        let animation_fly = player.ANIMATIONS.fly;
        if(animation_fly) animation_fly.start();
    }

};


// export ====================================================== //
export default play_field;