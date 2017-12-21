class QueueHolder {
    constructor() {
        this.__queue = [];
        this.__busy = false;
    }

    async hold() {
        if (this.__busy) {
            let promise = new Promise((resolve) => {
                this.__queue.push(resolve);
            });

            await promise;

            return true;
        }

        this.__busy = true;

        return true;
    }

    release() {
        if (this.__queue.length) {
            this.__queue.shift()(true);
            return true;
        } else  {
            return false;
        }
    }

    async sleep(seconds = 1) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(true);
            }, seconds * 1000);
        });
    }
    
    inQueue() {
        return this.__queue.length;
    }
}

module.exports = QueueHolder;
