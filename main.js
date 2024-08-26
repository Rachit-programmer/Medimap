function startNavigation() {
    const hospital = document.getElementById('hospital').value;
    const rcode = document.getElementById('rcode').value;
    const currentLocation = document.getElementById('currentLocation').value;
    const destination = document.getElementById('destination').value;

    if (hospital === 'NA' || currentLocation === 'NA' || destination === 'NA') {
        alert('Please fill in all the fields');
        return;
    }

    let instructions = `Navigating from ${currentLocation} to ${destination} in ${hospital}. `;

    // Example logic for navigation directions
    if (currentLocation === 'Reception' && destination === 'OPD') {
        instructions += 'Go straight and take the first left.';
    } else if (currentLocation === 'Reception' && destination === 'ICU') {
        instructions += 'Go straight, take the elevator to the second floor, and turn right.';
    } else {
        instructions += 'Follow the signs to your destination.';
    }

    // Store instructions in localStorage to display on the navigation page
    localStorage.setItem('navigationInstructions', instructions);

    // Redirect to the navigation page
    window.location.href = 'navigation.html';
}

// On the navigation page, display the stored instructions
window.onload = function() {
    const instructions = localStorage.getItem('navigationInstructions');
    if (instructions) {
        document.getElementById('instructions').textContent = instructions;
    }
};
