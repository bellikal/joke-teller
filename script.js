// Constants
const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';

// Get DOM elements
const jokeButton = document.getElementById('button');
const bubbleElement = document.querySelector('.bubble');
const speechAudio = document.getElementById('audio');

// Toggle button disabled state
const toggleButtonDisabledState = () => {
    jokeButton.disabled = !jokeButton.disabled;
};

// Use VoiceRSS API to speak a joke
const speakJoke = (joke) => {
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
};

// Fetch a joke from the Joke API and display it
const fetchAndDisplayJoke = async () => {
    try {
        const response = await fetch(apiUrl);
        const { setup, delivery, joke } = await response.json();
        const finalJoke = setup ? `${setup} ... ${delivery}` : joke;

        // Displaying joke in the Speech-Bubble
        bubbleElement.textContent = finalJoke;
        // Text-to-Speech
        speakJoke(finalJoke);
        // Disable Button
        toggleButtonDisabledState();
    } catch (error) {
        // Catch Errors Here
        console.log('Error fetching joke:', error);
        bubbleElement.textContent = "Sorry, the joke could not be loaded. Please try again!";
    }
}

// Event Listeners
jokeButton.addEventListener('click', fetchAndDisplayJoke);
speechAudio.addEventListener('ended', toggleButtonDisabledState);