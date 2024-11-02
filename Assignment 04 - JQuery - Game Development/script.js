$(document).ready(function() {
    let score = 0;
    let lives = 3;
    let gameInterval;
    let fallingSpeed = 700;
    let gameEnded = false;

    const catcher = $("#catcher");
    const gameArea = $(".game-area");
    const gameAreaWidth = gameArea.width();

    function startGame() {
        score = 0;
        lives = 3;
        gameEnded = false;
        $("#score").text(score);
        $("#lives").text(lives);

        if (gameInterval) clearInterval(gameInterval);
        gameInterval = setInterval(spawnObject, fallingSpeed);
    }

    function spawnObject() {
        if (gameEnded) return;

        const object = $("<div class='falling-object'></div>");
        gameArea.append(object);

        let startPosition = Math.random() * (gameAreaWidth - 30);
        object.css({ left: startPosition + "px", top: "0px" });

        object.click(function() {
            score++;
            $("#score").text(score);
            $(this).stop().remove();
        });

        object.animate({ top: "400px" }, 2000, "linear", function() {
            $(this).remove();
            lives--;
            if (lives < 0) {
                lives = 0;
            }
            $("#lives").text(lives);

            if (lives <= 0 && !gameEnded) {
                endGame();
            }
        });

        checkCollision(object);
    }

    function checkCollision(object) {
        const checkInterval = setInterval(function() {
            const objectPosition = object.position();
            const catcherPosition = catcher.position();

            if (
                objectPosition.top + 30 >= catcherPosition.top &&
                objectPosition.left + 30 >= catcherPosition.left &&
                objectPosition.left <= catcherPosition.left + catcher.width()
            ) {
                score++;
                $("#score").text(score);
                object.stop().remove();
            }

            if (!object.parent().length) {
                clearInterval(checkInterval);
            }
        }, 100);
    }

    function endGame() {
        gameEnded = true;
        clearInterval(gameInterval);
        alert("Game Over! Your score: " + score);
        updateScoreboard();
    }

    function updateScoreboard() {
        let scoreboard = JSON.parse(localStorage.getItem("scoreboard") || "[]");
        scoreboard.push({ score });
        localStorage.setItem("scoreboard", JSON.stringify(scoreboard));
        displayScoreboard();
    }

    function displayScoreboard() {
        let scoreboard = JSON.parse(localStorage.getItem("scoreboard") || "[]");
        $("#scoreboard").empty();
        scoreboard.forEach((entry, index) => {
            $("#scoreboard").append(`<p>Player ${index + 1}: ${entry.score} points</p>`);
        });
    }

    $("#start-game").click(startGame);

    $("#apply-settings").click(function() {
        const newSpeed = parseInt($("#falling-speed").val());
        if (newSpeed < 700) {
            fallingSpeed = 700;
            $("#falling-speed").val(fallingSpeed);
            alert("Falling speed cannot be less than 700 ms! Settings reverted to 700 ms.");
        } else {
            fallingSpeed = newSpeed;
            alert("Settings applied! Falling speed: " + fallingSpeed + " ms");
        }
    });

    $(document).keydown(function(event) {
        const leftPosition = catcher.position().left;

        if (event.key === "ArrowLeft" && leftPosition > 0) {
            catcher.css("left", leftPosition - 20 + "px");
        } else if (event.key === "ArrowRight" && (leftPosition + catcher.width()) < gameAreaWidth) {
            catcher.css("left", leftPosition + 20 + "px");
        }
    });
});
