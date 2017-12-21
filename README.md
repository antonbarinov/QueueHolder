# QueueHolder
Asynchronous queue

## Install
```
npm i queue-holder
```

## Exmaple #1

```
const QueueHolder = require('queue-holder');
const queue = new QueueHolder();

async function doSome(index, sleep = false) {
    await queue.hold(); // hold our queue

    if (sleep) {
        console.log(`job[${index}] with sleep started`);
        await queue.sleep(0.5); // sleep for 0.5 seconds
        console.log(`job[${index}] do some stuff`);
        await queue.sleep(0.5); // sleep for 0.5 seconds
        console.log(`job[${index}] do some stuff again`);
        await queue.sleep(0.5); // sleep for 0.5 seconds
        console.log(`job[${index}] with sleep done`);
    } else {
        console.log(`job[${index}] without sleep`);
    }

    // release our queue and let next job do some stuff
    queue.release();
}

for(let i = 0; i < 10; i++) {
    doSome(i, i <= 1);
}
```

Output:
```
job[0] with sleep started
job[0] do some stuff
job[0] do some stuff again
job[0] with sleep done
job[1] with sleep started
job[1] do some stuff
job[1] do some stuff again
job[1] with sleep done
job[2] without sleep
job[3] without sleep
job[4] without sleep
job[5] without sleep
job[6] without sleep
job[7] without sleep
job[8] without sleep
job[9] without sleep
```

## Exmaple #2

```
const QueueHolder = require('queue-holder');
const queue = new QueueHolder();

(async () => {
    await queue.hold();
    console.log(1);
    await queue.sleep(1);
    queue.release();
    await queue.hold();
    console.log(2);
    await queue.sleep(1);
    queue.release();
})();

(async () => {
    await queue.hold();
    console.log(3);
    await queue.sleep(1);
    queue.release();
    await queue.hold();
    console.log(4);
    await queue.sleep(1);
    queue.release();
})();
```

Output:

```
1
3
2
4
```

## API
- .hold() - hold queue. This function return Promise.
- .release() - release our queue and let next job do some stuff.
- .sleep(seconds = 1) - sleep for `seconds` seconds. This function return Promise.
- .inQueue() - how much tasks in queue.
