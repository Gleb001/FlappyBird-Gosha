
// main =============================================== //

// set default settings ------------------------------- //
function setPropsWithDefaultValues(
    object,
    new_props = {},
    default_props = {},
) {

    // 1. check presence the object
    if (!object) {
        console.error(
            "Отсутствует объект, которому Вы " +
            "желаете задать дефолтные свойства при " +
            "условии, что у него (объекта) они (свойства) " +
            "отсутствуют!"
        );
        return;
    }

    // 2. set new props for the object
    Object.assign(object, new_props);

    // 3. set new properties over default ones
    for (let key in default_props) {

        // 3.1 get new prop
        let default_prop = default_props[key];
        let new_prop = new_props[key];

        // 3.2 quick check -> quick end
        if (!new_prop) {
            object[key] = default_prop;
        } else if (Array.isArray(new_prop)) {
            object[key] = new_prop.map(
                prop => {

                    if (
                        typeof prop != "object" ||
                        Array.isArray(prop) ||
                        prop.tagName
                    ) return prop;

                    return Object.assign(
                        {}, default_prop, prop
                    );

                }
            );
        } else if (typeof new_prop == "object") {
            object[key] = Object.assign(default_prop, new_prop);
        }

    }

}

// export ============================================= //
export { setPropsWithDefaultValues };






// NOTE:

    // // 2. set the default props for the object
    // Object.assign(object, default_props);

    // // 3. set new properties over default ones
    // for (let key in new_props) {

    //     // 3.1 get new prop
    //     let new_prop = new_props[key];

    //     // 3.2 quick check -> quick end
    //     if (
    //         !default_props[key] ||
    //         typeof new_prop != "object" ||
    //         new_prop.tagName
    //     ) {
    //         object[key] = new_prop;
    //         continue;
    //     }

    //     // 3.3 work with array or object
    //     if (Array.isArray(new_prop)) {
    //         object[key] = new_prop.map(
    //             prop => {

    //                 // 3.3.1 return new prop
    //                 if (
    //                     typeof prop == "object" ||
    //                     prop.tagName ||
    //                     Array.isArray(prop)
    //                 ) {
    //                     return Object.assign(object[key], prop);
    //                 } else {
    //                     return prop;
    //                 }

    //             }
    //         );
    //         return;
    //     } else {
    //         Object.assign(object[key], new_prop);
    //     }

    // }