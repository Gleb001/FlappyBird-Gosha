
// import //
import { patterns_game_elements } from '../../../abstractions/game patterns/patterns_game_elements.js';

// suggestion to start the game class //
class SuggestionStartGame extends patterns_game_elements.GameElement {

    // constructor //
    constructor({ ...group_objects_with_settings }) {
        super(group_objects_with_settings);
    }

    // public object methods //

    // stop show
    stopShow() {
        this.ANIMATIONS_SETTINGS.ANIMATIONS.appear.end();
        this.ANIMATIONS_SETTINGS.ANIMATIONS.disappear.end();
        this.deleteHTML();
        this.endExecutionCurrentFunction();
    }

};

// suggestion to start the game object //
const suggestion_start_game = new SuggestionStartGame({

    HTML_SETTINGS: {

        ID_NAME: 'suggestion_start_game',

        tag_name: 'span',
        class_name: 'main_text',
        start_styles: 'opacity: 0',
        html_value:
            `
            <span class="arrow_to_right"></span>
            Click or press "Space"
        `,

    },

    DOM_TREE_SETTINGS: {

        involved_element: '#game_name',
        insert_command: 'after'

    },

    ANIMATIONS_SETTINGS: {

        ANIMATIONS: {

            get appear() {

                return suggestion_start_game.createAnimation({

                    changing_properties: [

                        {
                            name: 'opacity',
                            start_value: 0,
                            final_value: 1,
                            unit_of_measurement: '',
                        },

                    ],
                    changing_element: suggestion_start_game.HTML_LINK, 
                    duration: 1000,
                    timing_function: suggestion_start_game.ANIMATIONS_SETTINGS.TIMING_FUNCTIONS.linear,
                    next_function: function () {
                        suggestion_start_game.ANIMATIONS_SETTINGS.ANIMATIONS.disappear.start();
                    }

                });

            },

            get disappear() {

                return suggestion_start_game.createAnimation({

                    changing_properties: [

                        {
                            name: 'opacity',
                            start_value: 1,
                            final_value: 0,
                            unit_of_measurement: '',
                        },

                    ],
                    changing_element: suggestion_start_game.HTML_LINK, 
                    duration: 1000,
                    timing_function: suggestion_start_game.ANIMATIONS_SETTINGS.TIMING_FUNCTIONS.linear,
                    next_function: function () {
                        suggestion_start_game.ANIMATIONS_SETTINGS.ANIMATIONS.appear.start();
                    },

                });

            },

        }

    },

});

// export //
export { suggestion_start_game };