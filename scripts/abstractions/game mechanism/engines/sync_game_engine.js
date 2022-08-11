
// syncGameEngine //
const syncGameEngine = {

    // public object properties //
    algorithms: {
        all_algorithms: null,
        current_algorithm: null,
        get initial_algorithm() {

            let algorithm_names = [];

            for (let algorithm_name in this.all_algorithms) {
                algorithm_names.push(algorithm_name);
            }

            let names_next_algorithms = [];

            for (
                let index = algorithm_names.length - 1;
                index >= 0;
                index--
            ) {

                let algorithm_name = algorithm_names[index];
                let name_next_algorithm = this.all_algorithms[algorithm_name].name_next_algorithm;
                let index_link = names_next_algorithms.indexOf(name_next_algorithm);

                if (index_link == -1) {
                    names_next_algorithms.push(name_next_algorithm);
                }

            }

            let initial_algorithm;

            for (
                let index = algorithm_names.length - 1;
                index >= 0;
                index--
            ) {

                let algorithm_name = algorithm_names[index];
                let presence_algorithm_name = names_next_algorithms.indexOf(
                    algorithm_name
                );

                if (presence_algorithm_name == -1) {
                    initial_algorithm = this.all_algorithms[algorithm_name];
                }

            }

            return initial_algorithm; F

        },
        get next_algorithm() {

            return this.all_algorithms[
                this.current_algorithm.name_next_algorithm
            ];

        },
        launch_next_algorithm: false
    },

    components: {
        get all_components() {
            return syncGameEngine.algorithms.current_algorithm.components;
        },
        get number_components() {
            return this.all_components.length - 1;
        },
        get current_component() {

            return this.all_components[
                this.number_current_component++
            ];

        },
        number_current_component: 0,
    },

    // public methods //

    // start
    start(algorithms) {

        this.algorithms.all_algorithms = algorithms;
        this.algorithms.current_algorithm = this.algorithms.initial_algorithm;

        this._launchWorkAlgorithm();

    },

    // stop
    stop(value) {
        this._stopWorkEngine = value;
    },

    // private object methods for the internal mechanism //

    // launch
    _launchWorkAlgorithm() {

        this.components.current_component();

        if (
            this.components.number_current_component >
            this.components.number_components &&
            !this.algorithms.launch_next_algorithm
        ) {
            
            this.launch_next_algorithm = true;
            this.algorithms.current_algorithm = this.algorithms.next_algorithm;
            this.components.number_current_component = 0;
            return;

        }


        let id_interval = setInterval(

            function () {

                if (syncGameEngine._stopWorkEngine) return;

                clearInterval(id_interval);
                syncGameEngine._launchWorkAlgorithm();

            }, 20

        );

    },

}

// export //
export { syncGameEngine };


// Note //
// n.1

// algorithms: {
//     all_algorithms: null,
//     previous_algorithm: nul,
//     get current_algorithm() {

//         if (!this.all_algorithms) return;

//         if (this.launch_next_algorithm) {

//             this.launch_next_algorithm = false;
//             this.number_current_component = 0;

//             return this.next_algorithm;

//         } else {
//             return this.initial_algorithm;
//         }

//     },
//     get initial_algorithm() {

//         let algorithm_names = [];

//         for (let algorithm_name in this.all_algorithms) {
//             algorithm_names.push(algorithm_name);
//         }

//         let names_next_algorithms = [];

//         for (
//             let index = algorithm_names.length - 1;
//             index >= 0;
//             index--
//         ) {

//             let algorithm_name = algorithm_names[index];
//             let name_next_algorithm = this.all_algorithms[algorithm_name].name_next_algorithm;
//             let index_link = names_next_algorithms.indexOf(name_next_algorithm);

//             if (index_link == -1) {
//                 names_next_algorithms.push(name_next_algorithm);
//             }

//         }

//         let initial_algorithm;

//         for (
//             let index = algorithm_names.length - 1;
//             index >= 0;
//             index--
//         ) {

//             let algorithm_name = algorithm_names[index];
//             let presence_algorithm_name = names_next_algorithms.indexOf(
//                 algorithm_name
//             );

//             if (presence_algorithm_name == -1) {
//                 initial_algorithm = this.all_algorithms[algorithm_name];
//             }

//         }

//         return initial_algorithm; F

//     },
//     get next_algorithm() {

//         return this.all_algorithms[
//             this.current_algorithm.name_next_algorithm
//         ];

//     },
//     launch_next_algorithm: false
// },

// components: {
//     get all_components() {
//         return syncGameEngine.algorithms.current_algorithm.components;
//     },
//     get number_components() {
//         return this.all_components.length - 1;
//     },
//     get current_component() {

//         if (this.number_current_component == null) {
//             this.number_current_component = 0;
//         }

//         return this.all_components[
//             this.number_current_component++
//         ];

//     },
//     number_current_component: 0,
// },