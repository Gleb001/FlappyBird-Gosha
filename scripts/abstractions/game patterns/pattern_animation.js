
// import //
import { syncGameEngine } from "../game mechanism/engines/sync_game_engine.js";

// pattern animation //
class Animation {

    // private class properies //
    static TIMING_FUNCTIONS = {
        ease: 'ease',
        ease_in: 'ease-in',
        ease_out: 'ease-out',
        linear: 'linear',
        bounce_start: 'bounce_start',
        bounce_end: 'bounce_end',
    };

    // public object properies //
    // with default values //
    changing_properties = [

        // pattern property description 
        {
            name: null,
            start_value: 0,
            final_value: 0,
            unit_of_measurement: null,
            function_value: null
        }

    ];
    timing_function = {
        name: null,
        coefficient: 1
    }
    duration = 0;
    delay = 0;
    synchronous = false;
    changing_element = null;
    wait_next_function = false;
    next_function = null;

    // public object methods //

    // constructor
    constructor(group_objects_with_settings) {

        // replacing default settings with the specified settings
        for (let object in group_objects_with_settings) {
            this[object] = group_objects_with_settings[object];
        }

    }

    // start
    start() {

        if (this.synchronous) {
            syncGameEngine.stop(this.synchronous);
        }

        let current_animation = this;
        let start_animation = performance.now();

        this.ID_ANIMATION = window.requestAnimationFrame(

            function animate(timestamp) {

                let time_fraction = (timestamp - start_animation) / current_animation.duration;
                if (time_fraction > 1) time_fraction = 1;

                current_animation._changeEachPropertyInOrder(time_fraction);

                if (time_fraction < 1) {
                    window.requestAnimationFrame(animate);
                } else {

                    current_animation._startNextFunction();
                    current_animation.end();

                    if (current_animation.synchronous) syncGameEngine.stop(false);

                }

            }

        );

    }

    // end
    end() {
        window.cancelAnimationFrame(this.ID_ANIMATION);
    }



    // private object methods //

    // change
    _changeEachPropertyInOrder(time_fraction) {

        for (
            let index = 0;
            index < this.changing_properties.length;
            index++
        ) {

            let property = this.changing_properties[index];

            let replacement_value = this._calculate(time_fraction, property);
            this._draw(replacement_value, property);

        }

    }

    // calculate
    _calculate(time_fraction, property) {

        let y;
        let x = time_fraction;
        let k = this.timing_function.coefficient;
        let distance = property.final_value - property.start_value;

        switch (this.timing_function.name) {

            case 'ease':
                // y = sin (x * π/4)
                y = Math.sin(x * Math.PI / 4);
                break;

            case 'ease-in':
                // y = x^2
                y = Math.pow(x, 2);
                break;

            case 'ease-out':
                // y = √x
                y = Math.sqrt(x);
                break;

            case 'linear':
                // y = x
                y = x;
                break;

            case 'bounce_start':
                // y = (k + 1) * x^3 - k * x^2
                y = (k + 1) * Math.pow(x, 3) - k * Math.pow(x, 2)
                break;

            case 'bounce_end':
                // y = (1 - k) * x^3 + k * x^2
                y = (1 - k) * Math.pow(x, 3) + k * Math.pow(x, 2)
                break;

        }

        return y * distance;

    }

    // draw
    _draw(replacement_value, property) {

        let game_element = this.changing_element;
        let new_value = property.start_value + replacement_value;
        let unit_of_measurement = property.unit_of_measurement;
        let function_value = property.function_value;

        if (!game_element) return;

        if (function_value) {
            game_element.style[property.name] = `${function_value}(${new_value}${unit_of_measurement})`;
        } else {
            game_element.style[property.name] = new_value + unit_of_measurement;
        }

    }

    // start
    _startNextFunction() {

        if (this.next_function) {
            this.next_function();
        }

    }

};

// export //
export { Animation };



// Notes //

// n.1


        // let wait_launch_animation = new Promise(function (resolve, reject) {

        //     if (this.delay >= 0) {

        //         let id_timeout = setTimeout(

        //             function () {

        //                 clearTimeout(id_timeout);
        //                 resolve();

        //             }, this.delay

        //         );

        //     } else reject();

        // });

        // let current_animation = this;

        // wait_launch_animation.then(

        //     resolve => {
        //         this._launchAniamtion(current_animation);
        //     },
        //     reject => {
        //         new Error('Your delay < 0');
        //         if (this.synchronous) {
        //             syncGameEngine.stop(this.synchronous);
        //         }
        //     }

        // );
