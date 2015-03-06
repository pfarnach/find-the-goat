(function() {

	// grabs DOM elements for goat wrapper, wrapper, and sound and randomly generates wrapper coordinates
	var goat_wrapper = document.querySelector('#goat-wrapper'),
		goat = document.querySelector('#goat'),
		modal = document.querySelector('#modal'),
		play = document.querySelector('#play'),
		timer = document.querySelector('#timer'),
		//sounds
		goat_sound = document.getElementById('goat-sound'),
		buzz_sound = document.getElementById('buzz-sound'),
		success = document.getElementById('success'),
		// goat wrapper location
		top = Math.random() * innerHeight * 0.85,
		left = Math.random() * innerWidth * 0.85,
		// timer
		seconds = 0,
		tenths = 0;

	// modal event listener
	play.addEventListener('click', play_game);

	// modal play game event
	function play_game(e) {
		modal.parentNode.removeChild(modal);
		goat_wrapper.style.display = 'block';
		main();
	}

	// counts in seconds and tenths of seconds
	function countUp(){
		tenths++;
		if (tenths >= 10) {
			seconds++;
			tenths = 0;
		}
		timer.innerHTML = seconds + "." + tenths;
	}

	// places goat, adds in event listeners, calls timer and defines sound fxns
	function main() {

		// places goat wrapper based on random coordinates
		goat_wrapper.style.top = top + 'px';
		goat_wrapper.style.left = left + 'px';

		// event listerns for hovering over goat wrapper and goat
		goat_wrapper.addEventListener('mouseover', play_buzz);
		goat_wrapper.addEventListener('mouseout', pause_buzz);
		goat.addEventListener('mouseover', play_goat);
		goat.addEventListener('mouseout', pause_goat);
		goat.addEventListener('click', found);

		// timer
		var timer_id = setInterval(countUp, 100);

		// sound functions
		function play_buzz() {
			buzz_sound.play(); }

		function pause_buzz() {
			buzz_sound.pause();
			buzz_sound.currentTime = 0; }

		function play_goat(e) {
			goat_sound.play();
			e.stopPropagation(); }

		function pause_goat() {
			goat_sound.pause();
			goat_sound.currentTime = 0; }

		// what happens when goat is found
		function found(e) {
			goat_sound.pause();
			success.play();
			goatfound = true;
			goat_wrapper.style.opacity = 1.0;
			goat_wrapper.style.backgroundColor = 'transparent';
			goat_wrapper.removeEventListener('mouseover', play_buzz);
			goat.removeEventListener('mouseover', play_goat);
			goat.removeEventListener('click', found);
			clearInterval(timer_id);
			e.stopPropagation();
		}
	}


})();