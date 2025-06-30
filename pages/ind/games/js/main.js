<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sliding Puzzle</title>
    <style>
        #tiles {
            display: grid;
            grid-template-columns: repeat(3, 100px);
            grid-gap: 5px;
        }
        .btn {
            width: 100px;
            height: 100px;
            background-size: 300px 300px;
            border: none;
            cursor: pointer;
        }
        .selected {
            border: 3px solid #ff0000;
        }
    </style>
</head>
<body>

<div id="tiles"></div>

<script>
    let size = 3;
    let numberOfTiles = size ** 2;
    let highlighted = numberOfTiles;
    let shuffled = false;
    let imageUrl = "https://scontent.fccu11-1.fna.fbcdn.net/v/t1.15752-9/502084395_1416378359359569_5225687789309071857_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=106&ccb=1-7&_nc_sid=0024fc&_nc_ohc=Rc8tLwPjE5YQ7kNvwGaRkeH&_nc_oc=AdlPWeQyHmFYjT4zGITVkilsrPNigYknq5Ksndd2tWJ9HVNLD_GcP44ddxSOu2R2wpje0pt58EBuuM847Xyg-fM0&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent.fccu11-1.fna&oh=03_Q7cD2gG0ntt8oqtOUxWYjguamyCLdS7Psl_3TsgZU8GwI6FYqQ&oe=688A511F";

    let buttonContainer = document.getElementById('tiles');

    const RIGHT_ARROW = 39;
    const LEFT_ARROW = 37;
    const UP_ARROW = 40;
    const DOWN_ARROW = 38;
    window.onkeydown = function (event) {
        console.log(event.keyCode);
        if (event.keyCode === RIGHT_ARROW) {
            swap(highlighted + 1);
        } else if (event.keyCode === LEFT_ARROW) {
            swap(highlighted - 1);
        } else if (event.keyCode === UP_ARROW) {
            swap(highlighted + size);
        } else if (event.keyCode === DOWN_ARROW) {
            swap(highlighted - size);
        }
    };

    newGame();

    function newGame() {
        loadTiles(size);
        setTimeout(() => {
            shuffle();
        }, 500);
    }

    function loadTiles(n) {
        for (let b = 1; b <= numberOfTiles; b++) {
            var newTile = document.createElement('button');
            newTile.id = `btn${b}`;
            newTile.setAttribute('index', b);
            newTile.classList.add('btn');
            setTileBackground(newTile, b);
            newTile.addEventListener('click', function () {
                swap(parseInt(this.getAttribute('index')));
            });
            buttonContainer.append(newTile);
        }
        selectedTileId = 'btn' + highlighted;
        selectedTile = document.getElementById(selectedTileId);
        selectedTile.classList.add("selected");
    }

    function setTileBackground(tile, index) {
        let row = Math.floor((index - 1) / size);
        let col = (index - 1) % size;
        tile.style.backgroundImage = `url(${imageUrl})`;
        tile.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
    }

    function shuffle() {
        let minShuffles = 100;
        let totalShuffles = minShuffles + Math.floor(Math.random() * (200 - 100) + 100);

        for (let i = minShuffles; i <= totalShuffles; i++) {
            setTimeout(function timer() {
                let x = Math.floor(Math.random() * 4);
                let direction = 0;
                if (x == 0) {
                    direction = highlighted + 1;
                } else if (x == 1) {
                    direction = highlighted - 1;
                } else if (x == 2) {
                    direction = highlighted + size;
                } else if (x == 3) {
                    direction = highlighted - size;
                }
                swap(direction);
                if (i >= totalShuffles - 1) {
                    shuffled = true;
                }
            }, i * 10);
        }
    }

    function swap(clicked) {
        if (clicked < 1 || clicked > (numberOfTiles)) {
            return;
        }

        // Check if we are trying to swap right
        if (clicked == highlighted + 1) {
            if (clicked % size != 1) {
                setSelected(clicked);
            }
        // Check if we are trying to swap left
        } else if (clicked == highlighted - 1) {
            if (clicked % size != 0) {
                setSelected(clicked);
            }
        // Check if we are trying to swap up
        } else if (clicked == highlighted + size) {
            setSelected(clicked);
        // Check if we are trying to swap down 
        } else if (clicked == highlighted - size) {
            setSelected(clicked);
        }

        if (shuffled) {
            if (checkHasWon()) {
                alert("Winner!");
            }
        }
    }

    function checkHasWon() {
        for (let b = 1; b <= numberOfTiles; b++) {
            currentTile = document.getElementById(`btn${b}`);
            currentTileIndex = currentTile.getAttribute('index');
            currentTileValue = currentTile.style.backgroundPosition;
            let row = Math.floor((b - 1) / size);
            let col = (b - 1) % size;
            let expectedPosition = `-${col * 100}px -${row * 100}px`;

            if (currentTileValue !== expectedPosition) {
                return false;
            }
        }
        return true;
    }

    // Applies stylings to the selected tile
    function setSelected(index) {
        currentTile = document.getElementById(`btn${highlighted}`);
        currentTile.classList.remove('selected');
        newTile = document.getElementById(`btn${index}`);
        let temp = currentTile.style.backgroundPosition;
        currentTile.style.backgroundPosition = newTile.style.backgroundPosition;
        newTile.style.backgroundPosition = temp;
        newTile.classList.add("selected");
        highlighted = index;
    }
</script>

</body>
</html>
