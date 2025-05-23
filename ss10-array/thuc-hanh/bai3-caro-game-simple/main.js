const size = 10;
    let board = [];
    let currentPlayer = "x";
    let gameOver = false;
    let winCells = [];
    let score = JSON.parse(localStorage.getItem("caroScore")) || { x: 0, o: 0 };

    const clickSound = document.getElementById("clickSound");
    const winSound = document.getElementById("winSound");

    const initBoard = () => {
      board = Array.from({ length: size }, () => Array(size).fill(0));
      currentPlayer = "x";
      gameOver = false;
      winCells = [];
    };

    const renderBoard = () => {
      let html = "<table>";
      for (let i = 0; i < size; i++) {
        html += "<tr>";
        for (let j = 0; j < size; j++) {
          const value = board[i][j];
          const classList = [];
          if (value === "x") classList.push("x");
          if (value === "o") classList.push("o");
          if (winCells.some(cell => cell[0] === i && cell[1] === j)) classList.push("win");
          html += `<td class="${classList.join(" ")}" onclick="handleClick(${i}, ${j})">${value === 0 ? "" : value}</td>`;
        }
        html += "</tr>";
      }
      html += "</table>";
      document.getElementById("carogame").innerHTML = html;
      document.getElementById("status").innerText = gameOver
        ? `🎉 Nguoi choi \"${currentPlayer}\" thang!`
        : `🕹️ Luot hien tai: ${currentPlayer.toUpperCase()}`;
      document.getElementById("score").innerText = `👤 Ban: ${score.x} | 🤖 May: ${score.o}`;
    };

    const handleClick = (i, j) => {
      if (gameOver || board[i][j] !== 0 || currentPlayer !== "x") return;
      playMove(i, j);
      if (!gameOver) setTimeout(aiMove, 300);
    };

    const playMove = (i, j) => {
      if (board[i][j] !== 0 || gameOver) return;
      board[i][j] = currentPlayer;
      clickSound.play();

      if (checkWin(i, j)) {
        gameOver = true;
        winSound.play();
        score[currentPlayer]++;
        localStorage.setItem("caroScore", JSON.stringify(score));
      } else {
        currentPlayer = currentPlayer === "x" ? "o" : "x";
      }
      renderBoard();
    };

    const aiMove = () => {
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          if (board[i][j] === 0) {
            playMove(i, j);
            return;
          }
        }
      }
    };

    const checkWin = (x, y) => {
      const player = board[x][y];
      const directions = [
        [[0, -1], [0, 1]],
        [[-1, 0], [1, 0]],
        [[-1, -1], [1, 1]],
        [[-1, 1], [1, -1]]
      ];
      for (const dir of directions) {
        let count = 1;
        let cells = [[x, y]];
        for (const [dx, dy] of dir) {
          let i = x + dx, j = y + dy;
          while (i >= 0 && i < size && j >= 0 && j < size && board[i][j] === player) {
            cells.push([i, j]);
            count++;
            i += dx;
            j += dy;
          }
        }
        if (count >= 5) {
          winCells = cells;
          return true;
        }
      }
      return false;
    };

    const resetGame = () => {
      initBoard();
      renderBoard();
    };

    initBoard();
    renderBoard();