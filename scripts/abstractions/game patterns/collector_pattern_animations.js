
// pattern animation //
class ConstructorAnimations {

    // public methods for the internal mechanism //

    // constructor //
    constructor({
        collector_commands
    }) {

        this._replacement_value;
        this._execution_command;
        this._involved_elements;
        this.COLLECTOR_COMMANDS = collector_commands;

    }



    //  internal mechanism of the animation_transparency //

    // prepare //
    _prepareToAnimation(
        execution_command,
        involved_elements,
        start_position,
        final_position
    ) {

        this._execution_command = execution_command;
        this._involved_elements = involved_elements;

        if (final_position !== undefined && start_position !== undefined) {

            this._start_value = start_position;
            this._change_distance = final_position - start_position;

            if (this._change_distance < 0) {
                this._change_distance = -this._change_distance;
            }

        }

    }

    // animation //
    _animation(
        duration_animation,
        current_animation,
        next_function,
    ) {

        let start_animation = performance.now();

        let requestID = window.requestAnimationFrame(function animate(timestamp) {

            let time_fraction = (timestamp - start_animation) / duration_animation;
            if (time_fraction > 1) time_fraction = 1;

            current_animation._calculate(time_fraction);
            current_animation._draw();

            if (time_fraction < 1) {
                window.requestAnimationFrame(animate);
            } else {
                current_animation._startNextFunction(next_function);
                window.cancelAnimationFrame(requestID);
            }

        });

    }

    // calculate //
    _calculate(time_fraction) {

        for (let command in this.COLLECTOR_COMMANDS) {

            if (this._execution_command == this.COLLECTOR_COMMANDS[command].name) {

                this._replacement_value = this.COLLECTOR_COMMANDS[command].calculate(
                    time_fraction
                );

            }

        }

    }

    // draw //
    _draw() {

        for (let command in this.COLLECTOR_COMMANDS) {

            if (this._execution_command == this.COLLECTOR_COMMANDS[command].name) {
                this.COLLECTOR_COMMANDS[command].draw();
            }

        }

    }

    // start next function //
    _startNextFunction(next_function) {

        if (next_function) {
            next_function();
        }

    }

};

// pattern animation with values of magnitude //
class AnimationWithValuesOfMagnitude extends ConstructorAnimations {

    // public methods for the internal mechanism //

    // constructor //
    constructor({ collector_commands }) {

        super({ collector_commands });

        this._change_distance;

    }

    // start //
    start({
        execution_command,
        involved_elements,
        start_position,
        final_position,

        duration_animation,
        next_function,
    }) {

        this._prepareToAnimation(
            execution_command,
            involved_elements,
            start_position,
            final_position
        );

        this._animation(
            duration_animation,
            this,
            next_function,
        );

    }

};

// pattern animation without values of magnitude //
class AnimationWithoutValuesOfMagnitude extends ConstructorAnimations {

    // public methods for the internal mechanism //

    // constructor //
    constructor({ collector_commands }) {
        super({ collector_commands });
    }

    // start //
    start({
        execution_command,
        involved_elements,
        duration_animation,
        next_function,
    }) {

        this._prepareToAnimation(
            execution_command,
            involved_elements,
        );

        this._animation(
            duration_animation,
            this,
            next_function,
        );

    }

};

// collector animation //
const collector_pattern_animations = {
    AnimationWithValuesOfMagnitude,
    AnimationWithoutValuesOfMagnitude
};


// export //
export { collector_pattern_animations };