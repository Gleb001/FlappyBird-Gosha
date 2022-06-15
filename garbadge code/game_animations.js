
// pattern animation //
class ConstructorAnimation {

    // public methods for the internal mechanism //

    // constructor //
    constructor({
        collector_commands
    }) {

        this._replacement_value;
        this._execution_command;
        this._involved_elements;
        this._collector_commands = collector_commands;

    }



    //  internal mechanism of the animation_transparency //

    // animation //
    _animation({
        duration_animation,
        calculate,
        draw,
        startNextFunction,
        next_function,
    }) {

        let start_animation = performance.now();

        window.requestAnimationFrame(function animate(timestamp) {

            let time_fraction = (timestamp - start_animation) / duration_animation;
            if (time_fraction > 1) time_fraction = 1;

            calculate(time_fraction);
            draw();

            if (time_fraction < 1) {
                window.requestAnimationFrame(animate);
            } else {
                startNextFunction(next_function);
            }

        });

    }

    // calculate //
    _calculate(time_fraction) {

        this.collector_commands.forEach(command => {

            if (this._execution_command == command.name) {
                this._replacement_value = command.calculate(time_fraction);
            }

        });

    }

    // draw //
    _draw() {

        this.collector_commands.forEach(command => {

            if (this._execution_command == command.name) {
                command.draw(this._replacement_value);
            }

        });

    }

    // start next function //
    _startNextFunction(next_function) {

        if (next_function) {
            next_function();
        }

    }

};

// pattern animation with values of magnitude //
class AnimationWithValuesOfMagnitude extends ConstructorAnimation {

    // public methods for the internal mechanism //

    // constructor //
    constructor({ collector_commands }) {

        super({ collector_commands });

        this._change_distance;

    }

    // start //
    start({
        execution_command,
        involved_element,
        start_position,
        final_position,

        duration_animation,
        next_function,
    }) {

        this._prepare(
            execution_command,
            involved_element,
            start_position,
            final_position,
        );

        this._animation({
            duration_animation,
            calculate: this._calculate,
            draw: this._draw,
            startNextFunction: this._startNextFunction,
            next_function,
        });

    }


    //  internal mechanism of the animation_transparency //

    // prepare //
    _prepare(
        execution_command,
        involved_element,
        final_position,
        start_position
    ) {

        this._execution_command = execution_command;
        this._involved_element = involved_element;

        if (final_position !== null && start_position !== null) {
            this._change_distance = final_position - start_position;
        } else {
            this._change_distance = 0;
        }

    }

}

// pattern animation without values of magnitude //
class AnimationWithoutValuesOfMagnitude extends ConstructorAnimation {

    // public methods for the internal mechanism //

    // constructor //
    constructor({ collector_commands }) {
        super({ collector_commands });
    }

    // start //
    start({
        execution_command,
        involved_element,

        duration_animation,
        next_function,
    }) {

        this._prepare(
            execution_command,
            involved_element,
        );

        this._animation({
            duration_animation,
            calculate: this._calculate,
            draw: this._draw,
            startNextFunction: this._startNextFunction,
            next_function,
        });

    }


    //  internal mechanism of the animation_transparency //

    // prepare //
    _prepare(
        execution_command,
        involved_element,
    ) {

        this._execution_command = execution_command;
        this._involved_element = involved_element;

    }

}

let animation_transparency1 = new AnimationWithoutValuesOfMagnitude({
    collector_commands: {

        disappear: {
            name: 'disappear',
            calculate: function () {

            },
            draw: function () {

            }
        },

        appear: {
            name: 'appear',
            calculate: function () {

            },
            draw: function () {

            }
        },

        disappear: {
            name: 'disappear',
            calculate: function () {

            },
            draw: function () {

            }
        },

    }

});





// animation transparency
let animation_transparency = {

    // properties used by the animation transparency //
    // with default properties //
    _opacity_value: null,
    _execution_command: null,
    _array_involved_elements: null,



    // getting start //
    start(
        execution_command,
        array_involved_elements,

        duration_animation,
        next_function,
    ) {

        this._preparingToTransparency(execution_command, array_involved_elements);
        this._transparency(duration_animation, next_function);

    },


    //  internal mechanism of the animation_transparency //

    // prepare //
    _preparingToTransparency(execution_command, array_involved_elements) {

        this._opacity_value = 0;
        this._execution_command = execution_command;
        this._array_involved_elements = array_involved_elements;

    },

    // transparency //
    _transparency(duration_animation, next_function) {

        let start_animation = performance.now();

        window.requestAnimationFrame(function animate(timestamp) {

            let time_fraction = (timestamp - start_animation) / duration_animation;
            if (time_fraction > 1) time_fraction = 1;

            animation_transparency._setOpacityValue(time_fraction);
            animation_transparency._changeOpacity();

            if (time_fraction < 1) {
                window.requestAnimationFrame(animate);
            } else {
                animation_transparency._startNextFunction(next_function);
            }

        });

    },

    // set
    _setOpacityValue(time_fraction) {

        switch (this._execution_command) {

            case 'disappear':
                this._opacity_value = 1 - time_fraction;
                break;

            case 'appear':
                this._opacity_value = time_fraction;
                break;

        }

    },

    // change
    _changeOpacity() {

        for (let index = this._array_involved_elements.length - 1; index >= 0; index--) {

            let game_element = this._array_involved_elements[index];
            game_element.style.opacity = this._opacity_value;

        }

    },

    // start next function
    _startNextFunction(next_function) {

        if (next_function == null) { return }

        next_function();

    }

};

// animation movement
let animation_movement = {

    // properties used by the animation transparency //
    // with default properties //

    // private properties
    _replacement_value: null,
    _execution_command: null,
    _involved_element: null,
    _distance_movement: null,



    // getting start //
    start(
        execution_command,
        duration_animation,
        involved_element,
        distance_movement,
        next_function
    ) {

        this._preparingToMovement(execution_command, involved_element, distance_movement);
        this._movement(duration_animation, next_function);

    },

    //  internal mechanism of the animation_movement //

    // prepare //
    _preparingToMovement(execution_command, involved_element, distance_movement) {

        this._execution_command = execution_command;
        this._involved_element = involved_element;
        this._distance_movement = distance_movement;

        this._setCoordinateInvolvedElement();
        this._setPointsPosition();

    },

    // movement //
    _movement(duration_animation, next_function) {

        let start_animation = performance.now();

        window.requestAnimationFrame(function animate(timestamp) {

            let time_fraction = (timestamp - start_animation) / duration_animation;
            if (time_fraction > 1) time_fraction = 1;

            animation_movement._setReplacementValue(time_fraction);
            animation_movement._changePosition();

            if (time_fraction < 1) {
                window.requestAnimationFrame(animate);
            } else {
                animation_movement._startNextFunction(next_function);
            }

        });

    },

    // set
    _setCoordinateInvolvedElement() {

        this._involved_element.position_left = this._involved_element.offsetLeft;
        this._involved_element.position_right =
            window.screen.width - (this._involved_element.position_left
                + this._involved_element.offsetWidth);

        this._involved_element.position_top = this._involved_element.offsetTop;
        this._involved_element.position_bottom =
            window.screen.height - (this._involved_element.position_top
                + this._involved_element.offsetHeight);

    },

    _setPointsPosition() {

        switch (this._execution_command) {

            case 'move up':
                this._involved_element.start_position = 0;
                this._involved_element.final_position =
                    this._involved_element.start_position - this._distance_movement;
                break;

            case 'move down':
                this._involved_element.start_position = 0;
                this._involved_element.final_position =
                    this._involved_element.start_position + this._distance_movement;
                break;

            case 'move left':
                this._involved_element.start_position = this._involved_element.position_left;
                this._involved_element.final_position =
                    this._involved_element.position_left - this._distance_movement;
                break;

            case 'move right':
                this._involved_element.start_position = this._involved_element.position_right;
                this._involved_element.final_position =
                    this._involved_element.start_position + this._distance_movement;
                break;

        }

    },

    _setReplacementValue(time_fraction) {

        let y = Math.sin(time_fraction * Math.PI / 2);
        this._replacement_value = y *
            (this._involved_element.final_position - this._involved_element.start_position);

    },

    // change
    _changePosition() {

        let new_position = this._involved_element.start_position + this._replacement_value;

        switch (this._execution_command) {

            case 'move up':
            case 'move down':
                this._involved_element.style.top = new_position + 'px';
                break;

            case 'move left':
            case 'move right':
                this._involved_element.style.top = new_position + 'px';

        }


    },

};

// animation transform
let animation_transform = {

    // properties used by the animation transparency //
    // with default properties //

    // private properties
    _replacement_value: null,
    _execution_command: null,
    _involved_element: null,
    _final_position: null,
    _start_position: null,
    _duration_animation: null,



    // getting start //
    start(
        execution_command,
        duration_animation,
        involved_element,
        final_position,
        start_position,
        next_function
    ) {

        this._preparingToAnimation(
            execution_command,
            involved_element,
            final_position,
            start_position
        );

        switch (execution_command) {

            case 'scale':
                this._scale(duration_animation, next_function);
                break;

            case 'narrow':
                this._narrow(duration_animation, next_function);
                break;

        }

    },

    //  internal mechanism of the animation_transparency //

    // prepare //
    _preparingToAnimation(
        execution_command,
        involved_element,
        final_position,
        start_position
    ) {

        this._execution_command = execution_command;
        this._involved_element = involved_element;
        this._final_position = final_position;
        this._start_position = start_position;

    },

    // scale //
    _scale(duration_animation, next_function) {

        let start_animation = performance.now();

        window.requestAnimationFrame(function animate(timestamp) {

            let time_fraction = (timestamp - start_animation) / duration_animation;
            if (time_fraction > 1) time_fraction = 1;

            animation_transform._setReplacementValue(time_fraction);
            animation_transform._changeSizesAndPosition();

            if (time_fraction < 1) {
                window.requestAnimationFrame(animate);
            } else {
                animation_transform._clearSetProperties();
                animation_transform._startNextFunction(next_function);
            }

        });

    },

    // narrow //
    _narrow(duration_animation, next_function) {

        let start_animation = performance.now();

        window.requestAnimationFrame(function animate(timestamp) {

            let time_fraction = (timestamp - start_animation) / duration_animation;
            if (time_fraction > 1) time_fraction = 1;

            animation_transform._setReplacementValue(time_fraction);
            animation_transform._changeSizesAndPosition();

            if (time_fraction < 1) {
                window.requestAnimationFrame(animate);
            } else {
                animation_transform._clearSetProperties();
                animation_transform._startNextFunction(next_function);
            }

        });

    },

    // set 
    _setReplacementValue(time_fraction) {

        let y;

        switch (this._execution_command) {

            case 'scale':
                y = time_fraction;
                break;

            case 'narrow':
                y = time_fraction;
                break;

            default:
                y = 0;
                break;

        }

        this._replacement_value = y * (this._final_position - this._start_position);

    },

    // change
    _changeSizesAndPosition() {

        switch (this._execution_command) {

            case 'scale':
                let diameter = this._involved_element.offsetWidth + this._replacement_value;
                let new_position = this._involved_element.offsetLeft - this._replacement_value / 2;

                this._involved_element.style.width = diameter + 'px';
                this._involved_element.style.height = diameter + 'px';
                this._involved_element.style.left = new_position + 'px';
                break;

            case 'narrow':
                let new_size = this._start_position + this._replacement_value;

                this._involved_element.style.width = new_size + 'vw';
                break;

        }

    },

    // start next function
    _startNextFunction(next_function) {

        if (next_function == null) { return }
        next_function();

    },

};

// export //
export {
    animation_transparency,
    animation_movement,
    animation_transform
};