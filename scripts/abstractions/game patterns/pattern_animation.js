
// pattern animation //
class Animation {

    // private class properies //
    static TIMING_FUNCTIONS = {
        ease: 'ease',
        ease_in: 'ease-in',
        ease_out: 'ease-out',
        linear: 'linear'
    }

    // public object properies //
    // with default values //
    changing_properties = [

        // pattern property description 
        {
            name: null,
            start_value: 0,
            final_value: 0,
            unit_of_measurement: null,
            function_value:  null,
        }

    ];
    duration = 0;
    changing_element = null;
    timing_function = null;
    next_function = null;

    // constructor //
    constructor(group_objects_with_settings) {

        // replacing default settings with the specified settings
        for (let object in group_objects_with_settings) {

            this[object] = group_objects_with_settings[object];

        }

    }



    // public methods //

    // start
    start() {

        let current_animation = this;
        let start_animation = performance.now();

        this.ID_ANIMATION = window.requestAnimationFrame(function animate(timestamp) {

            let time_fraction = (timestamp - start_animation) / current_animation.duration;
            if (time_fraction > 1) time_fraction = 1;

            current_animation._changeEachPropertyInOrder(time_fraction);

            if (time_fraction < 1) {
                window.requestAnimationFrame(animate);
            } else {
                current_animation._startNextFunction();
                current_animation.end();
            }

        });

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
        let distance = property.final_value - property.start_value;

        switch (this.timing_function) {

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

        }

        return y * distance;

    }

    // draw
    _draw(replacement_value, property) {

        let game_element = this.changing_element;
        let new_value = property.start_value + replacement_value;
        let unit_of_measurement = property.unit_of_measurement;
        let function_value = property.function_value;

        if(!game_element) return;

        if(function_value) {
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