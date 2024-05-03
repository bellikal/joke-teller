const buttonElement = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
function toggleButton() {
    buttonElement.disabled = !buttonElement.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
    console.log('tell me:', joke);
    VoiceRSS.speech({
        key: 'fd73e79b4011402b97dd9a4faa304864',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke-API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    const bubbleElement = document.querySelector('.bubble');

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Displaying joke in the Speech-Bubble
        bubbleElement.textContent = joke;
        // Text-to-Speech
        tellMe(joke);
        // Disable Button
        toggleButton();
    } catch (error) {
        // Catch Errors Here
        console.log('whoops', error);
        bubbleElement.textContent = "Failed to fetch joke.";
    }
}

// Event Listeners
buttonElement.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);