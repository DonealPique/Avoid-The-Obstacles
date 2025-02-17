document.addEventListener("DOMContentLoaded", function() {
    let gameContainer = document.createElement("div");
    gameContainer.style.position = "absolute";
    gameContainer.style.top = "0";
    gameContainer.style.left = "0";
    gameContainer.style.width = "100%";
    gameContainer.style.height = "100%";
    gameContainer.style.overflow = "hidden";

    gameContainer.innerHTML = `
        <iframe id="gameFrame" src="https://donealpique.github.io/Avoid-The-Obstacles/" 
            style="width: 100%; height: 100%; border: none;" allowfullscreen></iframe>
    `;
    
    document.body.appendChild(gameContainer);
    
    console.log("Game IFrame Loaded!");

    window.addEventListener("resize", function() {
        let iframe = document.getElementById("gameFrame");
        if (iframe) {
            iframe.style.width = "100%";
            iframe.style.height = "100%";
        }
    });

    if (Microsoft.Dynamics.NAV.InvokeExtensibilityMethod) {
        Microsoft.Dynamics.NAV.InvokeExtensibilityMethod("OnGameLoaded", []);
    }
});
