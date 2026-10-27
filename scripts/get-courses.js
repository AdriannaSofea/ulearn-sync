// ULearn Sync: Get course list
// Runs in Power Automate Desktop: "Run JavaScript function on web page"
// Page: https://ulearn.utp.edu.my/my/courses.php
// Returns one line per course in the format: CourseID|CourseName
// Course names are cleaned so they can be used as Windows folder names.

function ExecuteScript() {
  var seen = {};
  var lines = [];
  var links = document.querySelectorAll('a[href*="/course/view.php?id="]');
  for (var i = 0; i < links.length; i++) {
    var a = links[i];
    var id = a.href.split('id=')[1].split('&')[0];
    var name = a.textContent.replace(/\s+/g, ' ').trim();
    // Keep only the text starting from the course code, e.g. TEB3033
    var m = name.match(/[A-Z]{3}\d{4}.*/);
    if (m) { name = m[0]; }
    // Replace characters Windows does not allow in folder names
    name = name.replace(/\//g, '-').replace(/:/g, ' ').replace(/[\\*?"<>|]/g, '').trim();
    if (!seen[id] && name !== '') {
      seen[id] = true;
      lines.push(id + '|' + name);
    }
  }
  // Windows line endings so Power Automate's "Split text" works
  return lines.join('\r\n');
}
