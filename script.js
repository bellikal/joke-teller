const jokeButton = document.getElementById('button');
const speechAudio = document.getElementById('audio');

// Disable/Enable Button
function toggleButtonDisabledState() {
    jokeButton.disabled = !jokeButton.disabled;
}

// Passing Joke to VoiceRSS API
function speakJoke(joke) {
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
async function fetchAndDisplayJoke() {
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
        speakJoke(joke);
        // Disable Button
        toggleButtonDisabledState();
    } catch (error) {
        // Catch Errors Here
        console.log('Error fetching joke:', error);
        bubbleElement.textContent = "Failed to fetch joke.";
    }
}

// Event Listeners
jokeButton.addEventListener('click', fetchAndDisplayJoke);
speechAudio.addEventListener('ended', toggleButtonDisabledState);