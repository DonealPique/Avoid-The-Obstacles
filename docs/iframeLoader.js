document.addEventListener("DOMContentLoaded", function() {
    let gameContainer = document.createElement("div");
    gameContainer.style.width = "100%";
    gameContainer.style.height = "100vh";
    gameContainer.style.display = "flex";
    gameContainer.style.justifyContent = "center";
    gameContainer.style.alignItems = "center";
    gameContainer.innerHTML = `
        <iframe id="gameFrame" src="https://donealpique.github.io/Avoid-The-Obstacles/" 
            style="width: 100%; height: 100%;" frameborder="0"></iframe>
    `;
    document.body.appendChild(gameContainer);

    window.addEventListener("resize", function() {
        let iframe = document.getElementById("gameFrame");
        if (iframe) {
            iframe.style.width = "100%";
            iframe.style.height = "100vh"; 
        }
    });
});
