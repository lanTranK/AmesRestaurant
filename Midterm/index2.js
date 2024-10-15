const changeBackground = document.getElementById("background");
changeBackground.addEventListener("click", changeBackgroundColor);

function changeBackgroundColor(event) {
    let colorList = ["#F08080", "#FFA07A", "#FAEBD7", "#FFFFE0", "#FFB6C1", "#ADD8E6", "#E6E6FA", "#FFDAB9"];

    if (event.target.tagName == 'BUTTON' || event.target.tagName == 'A') {
        return;
    }
    const randomIndex = Math.floor(Math.random() * colorList.length);
    background.style.backgroundColor = colorList[randomIndex];
}

function myFunction(event) {
    const btn = event.target;
    const content = btn.parentElement;

    const less = content.getElementsByClassName("less")[0];
    const moreText = content.getElementsByClassName("more")[0];

      if (less.style.display === "none") {
          less.style.display = "inline";
          btn.innerHTML = "Read more";
          moreText.style.display = "none";
      } else {
          less.style.display = "none";
          btn.innerHTML = "Read less";
          moreText.style.display = "inline";
    }
}