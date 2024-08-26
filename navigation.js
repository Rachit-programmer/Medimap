// Define a simple map of the hospital layout
const map = {
    reception: { adjacent: ['opd', 'ipd'] },
    opd: { adjacent: ['reception', 'ipd'] },
    ipd: { adjacent: ['reception', 'opd', 'icu'] },
    icu: { adjacent: ['ipd', 'ot'] },
    ot: { adjacent: ['icu', 'lab'] },
    lab: { adjacent: ['ot', 'pharmacy'] },
    pharmacy: { adjacent: ['lab'] }
};

// Function to draw the path on the canvas
function drawPath(path) {
    const canvas = document.getElementById('navigationCanvas');
    const ctx = canvas.getContext('2d');

    // Adjust canvas size to match the container
    const mapContainer = document.querySelector('.map-container');
    canvas.width = mapContainer.clientWidth;
    canvas.height = mapContainer.clientHeight;

    // Clear previous drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#FF0000';
    ctx.lineWidth = 4;

    ctx.beginPath();
    
    path.forEach((room, index) => {
        const roomElement = document.getElementById(room);
        const rect = roomElement.getBoundingClientRect();
        const parentRect = mapContainer.getBoundingClientRect();

        // Get the center of the room
        const x = rect.left + rect.width / 2 - parentRect.left;
        const y = rect.top + rect.height / 2 - parentRect.top;

        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();
}

// Function to highlight the path
function highlightPath(start, end) {
    // Clear previous highlights
    const rooms = document.querySelectorAll('.room');
    rooms.forEach(room => room.classList.remove('highlight', 'path'));

    // Highlight the start and end rooms
    document.getElementById(start).classList.add('highlight');
    document.getElementById(end).classList.add('highlight');

    // Generate instructions and highlight path
    let currentRoom = start;
    const path = [start];
    const visited = new Set();
    visited.add(start);

    while (currentRoom !== end) {
        const nextRoom = map[currentRoom].adjacent.find(room => !visited.has(room));
        if (nextRoom) {
            path.push(nextRoom);
            visited.add(nextRoom);
            currentRoom = nextRoom;
        } else {
            document.getElementById('instructions').innerText = 'No path found!';
            return;
        }
    }

    // Draw the path
    drawPath(path);

    // Display navigation instructions
    const instructions = path.map(room => `Go to ${room.charAt(0).toUpperCase() + room.slice(1)}`).join(' -> ');
    document.getElementById('instructions').innerText = instructions;
}

// Function to handle navigation
function navigate(room) {
    const start = 'reception'; // Assume starting from reception
    const end = room;

    if (start === end) {
        document.getElementById('instructions').innerText = 'You are already here!';
    } else {
        highlightPath(start, end);
    }
}