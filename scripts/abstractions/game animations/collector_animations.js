
// import //
import { collector_pattern_animations } from '../game patterns/collector_pattern_animations.js';

// animation transparency //
const animation_transparency = new collector_pattern_animations.AnimationWithoutValuesOfMagnitude({

     collector_commands: {

        disappear: {
            name: 'disappear',
            calculate: function (time_fraction) {
                return 1 - time_fraction;
            },
            draw: function () {

                for (
                    let index = animation_transparency._involved_elements.length - 1;
                    index >= 0;
                    index--
                ) {

                    let game_element = animation_transparency._involved_elements[index];
                    game_element.style.opacity = animation_transparency._replacement_value;
                    // game_element.style.color = 'rgba(128, 128, 128,' + animation_transparency._replacement_value + ')';

                }

            }
        },

        appear: {
            name: 'appear',
            calculate: function (time_fraction) {
                return time_fraction;
            },
            draw: function () {

                for (
                    let index = animation_transparency._involved_elements.length - 1;
                    index >= 0;
                    index--
                ) {

                    let game_element = animation_transparency._involved_elements[index];
                    game_element.style.opacity = animation_transparency._replacement_value;

                }

            }
        },

    }

});

// animation transform //
const animation_transform = new collector_pattern_animations.AnimationWithValuesOfMagnitude({

    collector_commands: {

        scale: {
            name: 'scale',
            calculate: function (time_fraction) {

                let y = time_fraction * 0.2;
                return y * animation_transform._change_distance;

            },
            draw: function () {

                for (
                    let index = animation_transform._involved_elements.length - 1;
                    index >= 0;
                    index--
                ) {

                    let game_element = animation_transform._involved_elements[index];
                    let diameter = game_element.offsetWidth + animation_transform._replacement_value;
                    let new_value = game_element.offsetLeft - animation_transform._replacement_value / 2;

                    game_element.style.width = diameter + 'px';
                    game_element.style.height = diameter + 'px';
                    game_element.style.left = new_value + 'px';

                }

            }
        },

        narrow: {
            name: 'narrow',
            calculate: function (time_fraction) {

                let y = time_fraction;
                return y * animation_transform._change_distance;

            },
            draw: function () {

                for (
                    let index = animation_transform._involved_elements.length - 1;
                    index >= 0;
                    index--
                ) {

                    let game_element = animation_transform._involved_elements[index];
                    let new_value = animation_transform._start_value - animation_transform._replacement_value;

                    game_element.style.width = new_value + 'vw';

                }

            }
        },

        rotation_clockwise: {
            name: 'rotation_clockwise',
            calculate: function (time_fraction) {

                let y = time_fraction;
                return y * animation_transform._change_distance;

            },
            draw: function () {

                for (
                    let index = animation_transform._involved_elements.length - 1;
                    index >= 0;
                    index--
                ) {

                    let game_element = animation_transform._involved_elements[index];
                    let new_value = animation_transform._start_value + animation_transform._replacement_value;

                    game_element.style.transform = `rotate(${new_value}deg)`;

                }

            }
        },

        rotation_counterclockwise: {
            name: 'rotation_counterclockwise',
            calculate: function (time_fraction) {

                let y = time_fraction;
                y = -y;
                return y * animation_transform._change_distance;

            },
            draw: function () {

                for (
                    let index = animation_transform._involved_elements.length - 1;
                    index >= 0;
                    index--
                ) {

                    let game_element = animation_transform._involved_elements[index];
                    let new_value = animation_transform._start_value + animation_transform._replacement_value;

                    game_element.style.transform = `rotate(${new_value}deg)`;

                }

            }
        },

        // changeColor: {

        //     backgroundColor:{

        //         to_right: {
        //             name: 'to_right',
        //             calculate: function (time_fraction) {
        
        //                 let y = time_fraction;
        //                 return y * animation_transform._change_distance;
        
        //             },
        //             draw: function () {
        
        //                 for (
        //                     let index = animation_transform._involved_elements.length - 1;
        //                     index >= 0;
        //                     index--
        //                 ) {
        
        //                     let game_element = animation_transform._involved_elements[index];
        //                     let new_value = animation_transform._start_value + animation_transform._replacement_value;
        
        //                     game_element.style.background = `linear_gradient(to right, )`;
        
        //                 }
        
        //             }
        //         },


        //     },

        //     textColor:{

                

        //     }

        // },

    }

});

// animation transform //
const animation_move = new collector_pattern_animations.AnimationWithValuesOfMagnitude({

    collector_commands: {

        move_down: {
            name: 'move_down',
            calculate: function (time_fraction) {

                let y = Math.sin(time_fraction * Math.PI / 2);
                return y * animation_move._change_distance;

            },
            draw: function () {

                for (
                    let index = animation_move._involved_elements.length - 1;
                    index >= 0;
                    index--
                ) {

                    let game_element = animation_move._involved_elements[index];
                    let new_value = animation_move._start_value + animation_move._replacement_value;

                    game_element.style.top = new_value + 'px';

                }

            }
        },

        to_right: {
            name: 'to_right',
            calculate: function (time_fraction) {

                let y = time_fraction;
                return y * animation_move._change_distance;

            },
            draw: function () {

                for (
                    let index = animation_move._involved_elements.length - 1;
                    index >= 0;
                    index--
                ) {

                    let game_element = animation_move._involved_elements[index];
                    let new_value = animation_move._start_value + animation_move._replacement_value;

                    game_element.style.left = new_value + 'px';

                }

            }
        },

        to_left: {
            name: 'to_left',
            calculate: function (time_fraction) {

                let y = time_fraction;
                return y * animation_move._change_distance;

            },
            draw: function () {

                for (
                    let index = animation_move._involved_elements.length - 1;
                    index >= 0;
                    index--
                ) {

                    let game_element = animation_move._involved_elements[index];
                    let new_value = animation_move._start_value + animation_move._replacement_value;

                    // console.log('start_value = ' + animation_move._start_value);
                    // console.log('replacement_value = ' + animation_move._replacement_value);
                    // console.log('change_distance = ' + animation_move._change_distance);

                    game_element.style.right = new_value + 'px';

                }

            }
        },

    }

});

// animation transform //
const animation_actions_player = new collector_pattern_animations.AnimationWithValuesOfMagnitude({

    collector_commands: {

        fall: {
            name: 'fall',
            calculate: function (time_fraction) {

                let y = Math.pow(time_fraction, 2);
                return y * animation_actions_player._change_distance;

            },
            draw: function () {

                for (
                    let index = animation_actions_player._involved_elements.length - 1;
                    index >= 0;
                    index--
                ) {

                    let game_element = animation_actions_player._involved_elements[index];
                    let new_value = animation_actions_player._start_value + animation_actions_player._replacement_value;

                    game_element.style.top = new_value + 'px';

                }

            }
        },

        losing_fall: {
            name: 'losing_fall',
            calculate: function (time_fraction) {

                let y = Math.pow(time_fraction, 2);
                return y * animation_actions_player._change_distance;

            },
            draw: function () {

                for (
                    let index = animation_actions_player._involved_elements.length - 1;
                    index >= 0;
                    index--
                ) {

                    let game_element = animation_actions_player._involved_elements[index];
                    let new_value = animation_actions_player._start_value + animation_actions_player._replacement_value;

                    game_element.style.top = new_value + 'px';

                }

            }
        },

        fly: {
            name: 'fly',
            calculate: function (time_fraction) {

                let y = Math.sin(time_fraction * Math.PI / 2);
                y = -y;
                return y * animation_actions_player._change_distance;

            },
            draw: function () {

                for (
                    let index = animation_actions_player._involved_elements.length - 1;
                    index >= 0;
                    index--
                ) {

                    let game_element = animation_actions_player._involved_elements[index];
                    let new_value = animation_actions_player._start_value + animation_actions_player._replacement_value;

                    game_element.style.top = new_value + 'px';

                }

            }
        },

    }

});

// collector animations  //
const collector_animations = {
    transparency: animation_transparency,
    transform: animation_transform,
    move: animation_move,
    actions_player: animation_actions_player,
};

// export //
export { collector_animations };



// Note //

// n.1
// _updatingGameComponentsAndElements() {
//     this.array_update_entities.forEach(game_entity => {
//         game_element.setHTML_LINK();
//     });
//     GameEngine.endCurrentFunction = true;
// },

// n.2
// _checkExecutionCommand() {
//     if (this._execution_command == 'disappear') {
//         this._array_involved_elements.forEach(involved_elements => {
//             involved_elements.style.opacity = 0;
//         });
//     }
// },