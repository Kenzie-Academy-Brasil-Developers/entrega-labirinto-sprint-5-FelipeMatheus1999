const game = document.querySelector('.root__game');

const map = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W F",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW",
];

const buildGame = () => {
    for (let i = 0; i < map.length; i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        game.appendChild(line);

        for (let j = 0; j < map[i].length; j++) {
            let index = `${i};${j}`;
            
            if (map[i][j] === 'W') {
                const wall = document.createElement('div');
                wall.id = index;
                wall.classList.add('gameWall');
                line.appendChild(wall);
            }
            
            else if (map[i][j] === 'S') {
                const walk = document.createElement('div');
                const start = document.createElement('div');
                walk.id = index;
                walk.classList.add('gameWalk')
                start.classList.add('start');
                walk.appendChild(start);
                line.appendChild(walk);
            }
            
            else if (map[i][j] === 'F') {
                const end = document.createElement('div');
                end.id = index;
                end.classList.add('end');
                line.appendChild(end)
            }
            
            else {
                const walk = document.createElement('div');
                walk.id = index;
                walk.classList.add('gameWalk');
                line.appendChild(walk)
            }
        }
    }
}

const walking = () => {
    document.addEventListener('keydown', (event) => {

        let pool = document.querySelector('.start');
        let parentPool = pool.parentElement;
        let graph = parentPool.id.split(";")
        let numberY = Number(graph[0]);
        let numberX = Number(graph[1])
        let keyName = event.key;

        if (keyName === 'ArrowUp') {
            let sum = numberY - 1;
            const futureParent = document.getElementById(`${sum};${numberX}`);

            if (futureParent.className === 'gameWalk') {
                futureParent.appendChild(pool);
            }
        }

        if (keyName === 'ArrowDown') {
            let sum = numberY + 1;
            const futureParent = document.getElementById(`${sum};${numberX}`);

            if (futureParent.className === 'gameWalk') {
                futureParent.appendChild(pool);
            }
        }

        if (keyName === 'ArrowLeft') {
            let sum = numberX - 1;
            const futureParent = document.getElementById(`${numberY};${sum}`);

            if (futureParent.className === 'gameWalk') {
                futureParent.appendChild(pool);
            }

            if (futureParent.className === null) {

            }
        }

        if (keyName === 'ArrowRight') {
            let sum = numberX + 1;
            const futureParent = document.getElementById(`${numberY};${sum}`);

            if (futureParent.className === 'gameWalk') {
                futureParent.appendChild(pool);
            }

            else if (futureParent.className === 'end') {
                futureParent.appendChild(pool);
                victoryAnimation();
            }
        }

    })
}

const victoryAnimation = () => {
    const victory = document.createElement('div');
    victory.classList.add('victory');
    victory.innerText = 'You managed to get out of the dungeon';
    game.appendChild(victory);
    setTimeout(function() {document.location.reload(true)}, 1000);
}

buildGame();
walking();