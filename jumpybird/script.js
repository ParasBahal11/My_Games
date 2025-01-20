let move_speed = 3;
let gravity = 10;

// References
let bird = document.querySelector('.bird');
let bird_props = bird.getBoundingClientRect();
let background = document.querySelector('.background').getBoundingClientRect();
let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');

// Game state
let game_state = 'Start';

// Responsive adjustments
const adjustForScreenSize = () => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  if (screenWidth <= 480) {
    move_speed = 2;
    gravity = 8;
    bird.style.width = '80px';
    bird.style.height = '50px';
    bird.style.top = `${screenHeight * 0.4}px`;
  } else if (screenWidth <= 768) {
    move_speed = 3;
    gravity = 9;
    bird.style.width = '120px';
    bird.style.height = '70px';
    bird.style.top = `${screenHeight * 0.4}px`;
  } else {
    move_speed = 4;
    gravity = 10;
    bird.style.width = '160px';
    bird.style.height = '100px';
    bird.style.top = `${screenHeight * 0.4}px`;
  }

  bird_props = bird.getBoundingClientRect(); // Update bird properties after adjustment
};

// Apply initial screen size adjustments
adjustForScreenSize();
window.addEventListener('resize', adjustForScreenSize);

// Start game with touch
document.addEventListener('click', () => {
  if (game_state !== 'Play') {
    document.querySelectorAll('.villain_bird').forEach((e) => e.remove());
    bird.style.top = '40vh';
    game_state = 'Play';
    message.innerHTML = '';
    message.style.left = '0';
    score_title.innerHTML = 'Score : ';
    score_val.innerHTML = '0';
    play();
  }
});

function play() {
  let bird_dy = 0;
  let score = 0;

  // Handle jumping with touch
  const jump = () => {
    if (game_state === 'Play') {
      bird_dy = -160; // Adjust upward thrust
    }
  };

  document.addEventListener('click', jump);

  // Move villain birds
  function move() {
    if (game_state !== 'Play') return;

    let villain_birds = document.querySelectorAll('.villain_bird');

    villain_birds.forEach((villain) => {
      let villain_props = villain.getBoundingClientRect();
      bird_props = bird.getBoundingClientRect();

      if (villain_props.right <= 0) {
        villain.remove();
        score++;
        score_val.innerHTML = score;
      } else if (
        bird_props.left < villain_props.left + villain_props.width &&
        bird_props.left + bird_props.width > villain_props.left &&
        bird_props.top < villain_props.top + villain_props.height &&
        bird_props.top + bird_props.height > villain_props.top
      ) {
        game_state = 'End';
        message.innerHTML = 'Game Over! Tap To Restart';
        message.style.left = '28vw';
        document.removeEventListener('click', jump);
        return;
      }
      villain.style.left = villain_props.left - move_speed + 'px';
    });

    requestAnimationFrame(move);
  }
  requestAnimationFrame(move);

  // Apply gravity
  function apply_gravity() {
    if (game_state !== 'Play') return;

    bird_dy += gravity;

    if (bird_props.top <= 0 || bird_props.bottom >= background.bottom) {
      game_state = 'End';
      message.innerHTML = 'Game Over! Tap To Restart';
      message.style.left = '28vw';
      document.removeEventListener('click', jump);
      return;
    }

    bird.style.top = bird_props.top + bird_dy + 'px';
    bird_props = bird.getBoundingClientRect();
    requestAnimationFrame(apply_gravity);
  }
  requestAnimationFrame(apply_gravity);

  let villain_seperation = 0;

  // Create villain birds
  function create_villain_bird() {
    if (game_state !== 'Play') return;

    if (villain_seperation > 150) {
      villain_seperation = 0;
      let villain_posi = Math.floor(Math.random() * 70) + 10;
      let villain_bird = document.createElement('div');
      villain_bird.className = 'villain_bird';
      villain_bird.style.top = villain_posi + 'vh';
      villain_bird.style.left = '100vw';
      villain_bird.style.backgroundImage = "url('./images&video/villen2-removebg-preview.png')";
      villain_bird.style.backgroundSize = 'contain';
      villain_bird.style.backgroundRepeat = 'no-repeat';

      if (window.innerWidth <= 480) {
        villain_bird.style.width = '80px';
        villain_bird.style.height = '50px';
      } else if (window.innerWidth <= 768) {
        villain_bird.style.width = '130px';
        villain_bird.style.height = '80px';
      } else {
        villain_bird.style.width = '180px';
        villain_bird.style.height = '120px';
      }

      document.body.appendChild(villain_bird);
    }
    villain_seperation++;
    requestAnimationFrame(create_villain_bird);
  }
  requestAnimationFrame(create_villain_bird);
}
  