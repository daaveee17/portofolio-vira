const fs = require('fs');

// Check byte size and look at Canva's crop:
// In Canva Slide 2:
// el.a.B.B was:
// crop: {"A":-349.59,"B":-121.42,"D":720.08,"C":1079.28,"E":0}
// pos: w=556, h=729
console.log('Canva element position: w=556, h=729');

// In Canva, the photo frame was 556px wide by 729px tall!
// And in our style.css:
// .edu-photo { max-width: 440px; }
// And what did 6a89e636b3d7f581a7342344d2700f6c.png contain?

