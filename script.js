class GifSlider {
    constructor(gifUrl, slideSpeed) {
      this.gifUrl = gifUrl;
      this.slideSpeed = slideSpeed;
      this.gifElement = null;
      this.intervalId = null;
    }
  
    slide() {
      const containerWidth = document.getElementById('gifSection').offsetWidth;
      let position = -this.gifElement.offsetWidth;
  
      this.gifElement.style.left = position + 'px';
      this.gifElement.style.display = 'block';
  
      this.intervalId = setInterval(() => {
        position += this.slideSpeed;
        this.gifElement.style.left = position + 'px';
  
        if (position >= containerWidth) {
          clearInterval(this.intervalId);
          this.gifElement.style.display = 'none';
        }
      }, 10);
    }
  }
  
  let score = 0;

  class Button {
    constructor(text, action) {
        this.text = text;
        this.buttonElement = null;
        this.scoreElement = null;
        this.power = 0;
        this.cost = 15;
        this.action = action;
    }

    updateScore() {
        this.scoreElement.textContent = `Herta has been Kurued ${score} times!`;
    }
  
    spawnGif() {
      const baseGifCount = 1;
      const additionalGifCount = this.power;
      
      for (let i = 0; i < baseGifCount + additionalGifCount; i++) {
      const hertaURL = getRandomHerta();
      const gifSlider = new GifSlider(hertaURL, getRandomSlideSpeed());
      const soundUrl = getRandomSoundUrl();
  
      const audio = new Audio(soundUrl);
      audio.play();
  
      gifSlider.gifElement = document.createElement('img');
      gifSlider.gifElement.src = gifSlider.gifUrl;
      gifSlider.gifElement.style.position = 'absolute';
      gifSlider.gifElement.style.top = getRandomHeightOffset() + '%';
      gifSlider.gifElement.style.transform = 'translateY(-50%)';
      gifSlider.gifElement.style.display = 'none';
  
      document.getElementById('gifSection').appendChild(gifSlider.gifElement);
  
      gifSlider.slide();
    }
      score += this.power;
      this.updateScore();
}
  }
  
  const clickButton = new Button('Click me to Kurukuru!', 'click');
  clickButton.buttonElement = document.createElement('button');
  clickButton.buttonElement.textContent = clickButton.text;
  
  const powerUpButton = new Button('Power Up!', 'powerup');
  powerUpButton.buttonElement = document.createElement('button');
  powerUpButton.buttonElement.textContent = powerUpButton.text;
  
  const scoreElement = document.createElement('div');
  scoreElement.textContent = 'Herta has been Kurued ' + score + ' times!';
  
  function getRandomHeightOffset() {
    return Math.floor(Math.random() * (50 - 10 + 1) + 10);
  }
  
  function getRandomSlideSpeed() {
    let minSpeed = 5;
    let maxSpeed = 20;
    return Math.floor(Math.random() * (maxSpeed - minSpeed + 1) + minSpeed);
  }
  
  function getRandomSoundUrl() {
    const soundUrls = ['sound1.mp3', 'sound2.mp3'];
    const randomIndex = Math.floor(Math.random() * soundUrls.length);
    return soundUrls[randomIndex];
  }
  
  function getRandomHerta() {
    const soundUrls = ['herta.gif', 'herta2.gif'];
    const randomIndex = Math.floor(Math.random() * soundUrls.length);
    return soundUrls[randomIndex];
  }


document.getElementById('buttonSection').appendChild(scoreElement);
document.getElementById('buttonSection').appendChild(clickButton.buttonElement);
document.getElementById('buttonSection').appendChild(powerUpButton.buttonElement);

clickButton.scoreElement = scoreElement;
clickButton.updateScore(); 

powerUpButton.scoreElement = scoreElement;
powerUpButton.updateScore(); 

clickButton.buttonElement.addEventListener('click', () => {
    clickButton.spawnGif(); // Always spawn a GIF when the button is clicked.
    for (let i = 0; i < clickButton.power; i++) { // Spawn additional GIFs based on the power.
        clickButton.spawnGif();
    }
    score += 1; // Add one to the shared score.
    clickButton.updateScore(); // Update the score based on the shared score.
});


 

powerUpButton.buttonElement.addEventListener('click', () => {
    if (score >= powerUpButton.cost) { // Check if the shared score is greater or equal to the cost.
        clickButton.power += 1; // Increase the power of clickButton
        score -= powerUpButton.cost; // Subtract the cost from the shared score.
        powerUpButton.cost = Math.floor(powerUpButton.cost * 1.15); // Update the cost.
        powerUpButton.updateScore(); // Update the score based on the shared score.
    }
});
