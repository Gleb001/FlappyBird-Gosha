
// import //
import { patterns_game_elements } from '../../../abstractions/game patterns/patterns_game_elements.js';
import { play_field } from '../../../components/play field/play_field.js';

// suggestion to start the game class //
class SuggestionMakeStart extends patterns_game_elements.GameElement {

    // public object methods //

    // constructor
    constructor({ ...group_objects_with_settings }) {
        super(group_objects_with_settings);
    }

    // stop showing
    reactionOnExpectionPlayField() {

        let suggestion_make_action = this;
        let statuse_expection = play_field.statuses.expection_prepare_game.class;

        if (
            play_field.HTML_LINK.classList.contains(statuse_expection) &&
            !suggestion_make_action.HTML_LINK
        ) {

            this._disappear_suggestion = true;

            suggestion_make_action.createHTML();
            suggestion_make_action.ANIMATIONS_SETTINGS.ANIMATIONS.move_right.start();

        }

        if (
            !play_field.HTML_LINK.classList.contains(statuse_expection) &&
            suggestion_make_action.HTML_LINK &&
            this._disappear_suggestion
        ) {

            this._disappear_suggestion = false;

            suggestion_make_action.ANIMATIONS_SETTINGS.ANIMATIONS.disappear.start();

        }

    }

};

// suggestion to start the game object //
const suggestion_make_action = new SuggestionMakeStart({

    HTML_SETTINGS: {

        ID_NAME: 'suggestion_make_action__wrapper',

        tag_name: 'span',
        start_styles: `left: ${-175}px`,
        get html_value() {

            if (window.screen.availWidth > 1024) {

                return `
                <div class="suggestion_make_action">
                    <img src='./images/suggestion make action/click_mouse.png' class="click_mouse">
                </div>
                <div class="suggestion_make_action">
                    <img src='./images/suggestion make action/button_space.png' class="button_space">
                </div>
                `;

            } else

                return `
                <div class="suggestion_make_action">
                    <img src='./images/suggestion make action/click_arm.png' class="click_arm">
                </div>
                `;

        }

    },

    DOM_TREE_SETTINGS: {

        involved_element: '#play_field',
        insert_command: 'prepend'

    },

    ANIMATIONS_SETTINGS: {

        ANIMATIONS: {

            get appear() {

                return suggestion_make_action.createAnimation({

                    changing_properties: [

                        {
                            name: 'opacity',
                            start_value: 0,
                            final_value: 1,
                            unit_of_measurement: '',
                        },

                    ],
                    timing_function: {
                        name: suggestion_make_action.ANIMATIONS_SETTINGS.TIMING_FUNCTIONS.linear,
                        coefficient: 1
                    },
                    changing_element: suggestion_make_action.HTML_LINK,
                    duration: 1250,

                });

            },

            get disappear() {

                return suggestion_make_action.createAnimation({

                    changing_properties: [

                        {
                            name: 'opacity',
                            start_value: 1,
                            final_value: 0,
                            unit_of_measurement: '',
                        },

                    ],
                    timing_function: {
                        name: suggestion_make_action.ANIMATIONS_SETTINGS.TIMING_FUNCTIONS.linear,
                        coefficient: 1
                    },
                    changing_element: suggestion_make_action.HTML_LINK,
                    duration: 500,
                    next_function: function () {
                        suggestion_make_action.deleteHTML();
                    }

                });

            },

            get move_right() {

                return suggestion_make_action.createAnimation({

                    changing_properties: [

                        {
                            name: 'left',
                            start_value: suggestion_make_action.HTML_LINK.offsetLeft,
                            final_value: 15,
                            unit_of_measurement: 'px',
                        },

                    ],
                    timing_function: {
                        name: suggestion_make_action.ANIMATIONS_SETTINGS.TIMING_FUNCTIONS.bounce_end,
                        coefficient: 5
                    },
                    changing_element: suggestion_make_action.HTML_LINK,
                    duration: 900,
                    delay: 1500

                });

            },

            get move_left() {

                return suggestion_make_action.createAnimation({

                    changing_properties: [

                        {
                            name: 'left',
                            start_value: suggestion_make_action.HTML_LINK.offsetLeft,
                            final_value: -80,
                            unit_of_measurement: 'px',
                        },

                    ],
                    timing_function: {
                        name: suggestion_make_action.ANIMATIONS_SETTINGS.TIMING_FUNCTIONS.bounce_start,
                        coefficient: 3
                    },
                    changing_element: suggestion_make_action.HTML_LINK,
                    duration: 1000,
                    next_function: function () {
                        suggestion_make_action.deleteHTML();
                    }

                });

            },

        }

    },

});

// export //
export { suggestion_make_action };