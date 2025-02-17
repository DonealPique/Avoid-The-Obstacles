document.addEventListener("DOMContentLoaded", function() {
    let gameContainer = document.createElement("div");
    gameContainer.innerHTML = `
        <iframe id="gameFrame" src="https://donealpique.github.io/Avoid-The-Obstacles/" 
            width="100%" height="600" frameborder="0"></iframe>
    `;
    document.body.appendChild(gameContainer);
});
