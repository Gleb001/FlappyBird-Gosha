
// main ======================================================== //

// game engine ------------------------------------------------- //
const miniSyncEngine = {

    // methods of working with a synchronous game engine ------- //

    // algorithm
    algorithm: {

        // work with the list ---------------------------------- //
        list: {},
        // adding an algorithm to the list
        add({ name = "", name_next = "", components = [], trigger }) {

            // 1. check the arguments for validity
            let message = _isValidArguments();
            if (message) return console.error(message);

            // 2. set algorithm
            this.list[name] = { components, trigger, name_next };


            // *. additional function
            function _isValidArguments() {

                // name algorithm
                if (typeof name != "string") {
                    return "Name algorithm isn't string";
                }
                // name previous algorithm
                if (typeof name_next != "string") {
                    return "Name of previous algorithm isn't string";
                }
                // components
                if (
                    !Array.isArray(components) ||
                    !components.every(comp => typeof comp == "function")
                ) {
                    return "No valid components of the algorithm";
                }
                // trigger
                if (
                    typeof trigger != "undefined" &&
                    (typeof trigger != "function" ||
                        typeof trigger() != "boolean")
                ) {
                    return "Trigger isn't valid";
                }

            }

        },

        // getting the name of the initial algorithm
        get name_initial() {

            let checking_algorithm = [];
            let referenced_algorithm = [];

            // This loop checks the algorithm to see if there is
            // a link to it from other algorithm:
            // 1) If there is - this is not the initial algorithm
            // 2) If not, this is the initial algorithm (because
            // there is no link to it)
            // As a result , we get two arrays:
            // *) checking_algorithm - which contains, presumably,
            // the initial algorithm
            // *) referenced_algorithm - which contains links to
            // algorithm
            for (let algorithm in this.list) {

                let name_next = this.list[algorithm].name_next;
                let index_next_alg_check_alg = checking_algorithm.indexOf(name_next);

                if (referenced_algorithm.indexOf(algorithm) == -1) {
                    checking_algorithm.push(algorithm);
                } else if (index_next_alg_check_alg != -1) {
                    checking_algorithm.splice(index_next_alg_check_alg, 1);
                }

                referenced_algorithm.push(name_next);

            }

            // return the first algorithm that comes to hand
            return checking_algorithm[0];

        },

        // work with the current algorithm --------------------- //
        current: {

            index_component: 0,

            get() { return this._self; },
            set(name_algorithm) {
                if (!miniSyncEngine.algorithm.list[name_algorithm]) return;
                this._self = miniSyncEngine.algorithm.list[name_algorithm];
            },

        },

    },

    // start
    start() {

        // 1. checking for status
        if (this._status.get()) return;

        // 2. set an initial algorithm similar to the current one
        this.algorithm.current.set(this.algorithm.name_initial);

        // 3. launch the algorithm trigger
        this._launchTrigger();
        this._catchEndAlgorithm();


    },

    // execution delay
    executionDelay(async_function, duration_delay) {

        // 1. pause mini sync engine
        this._status.set(this._status.list.pause);

        // 2. launch asynchronous function
        async_function();

        // 3. start after pause mini sync engine
        setTimeout(() => {
            this._status.set(this._status.list.work);
            this._launchAlgorithm();
        }, duration_delay);

    },



    // the mechanism of operation of the synchronous engine ---- //

    // status
    _status: {
        // list
        list: {
            // PS: each property contains its own name, so that when
            // switching properties it is easier to check if the
            // engine has this status
            algorithm_finished: "algorithm_finished", // the algorithm has finished its execution
            work: "work",                             // algorithm execution
            pause: "pause",                           // suspending the execution of the algorithm
        },
        // current
        set(new_status) {

            if (this.list[new_status]) {
                this._current = new_status;
            } else {
                console.error(
                    `given status(${new_status}) cannot be set to a` +
                    `synchronous game engine`
                );
            }

        },
        get() { return this._current; },
    },

    // launch trigger
    _launchTrigger() {

        // 1. set status work
        this._status.set(this._status.list.work);

        // 2. waiting for trigger execution to complete
        let trigger = this.algorithm.current.get().trigger;
        let id_interval = setInterval(() => {

            if (!trigger || trigger()) {
                console.log("resolve");
                clearInterval(id_interval);
                this._launchAlgorithm()
            }

        }, 30);

    },

    // launch algorithm
    _launchAlgorithm() {

        // 1. getting and checking the current algorithm
        let algorithm = this.algorithm.current;
        let components = algorithm.get().components;

        // 2. check index the current component
        if (algorithm.index_component == components.length) {
            this._status.set(this._status.list.algorithm_finished);
            return;
        }

        // 3. execution the component algorithm
        components[algorithm.index_component++]();

        // 4. check status game engine
        if (this._status.get() != this._status.list.pause) {
            this._launchAlgorithm();
        }

    },

    // change algorithm
    _changeAlgorithm() {

        // 1. get name next algorithm
        let name_next_algorithm = this.algorithm.current.get().name_next;

        // 2. check availability next algorithm
        if (!this.algorithm.list[name_next_algorithm]) {
            console.log("Алгоритмы закончились!");
            return;
        }

        // 3. switch to the next algorithm
        this.algorithm.current.index_component = 0;
        this.algorithm.current.set(name_next_algorithm);

        this._launchTrigger();
        this._catchEndAlgorithm();

    },

    // catching the end of the algorithm execution
    _catchEndAlgorithm() {

        let id_interval = setInterval(() => {

            if (
                this._status.get() ==
                this._status.list.algorithm_finished
            ) {
                clearInterval(id_interval);
                this._changeAlgorithm();
            }

        }, 150);

    }

};

// export ====================================================== //
export default miniSyncEngine;
