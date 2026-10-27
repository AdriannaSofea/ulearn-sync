// ULearn Sync: Get file list for one course
// Runs in Power Automate Desktop: "Run JavaScript function on web page"
// Page: https://ulearn.utp.edu.my/mod/resource/index.php?id=COURSE_ID
// (Moodle's file index page, which lists every file in the course in one table)
// Returns one line per file in the format: FileID|FileName

function ExecuteScript() {
  var seen = {};
  var lines = [];
  var links = document.querySelectorAll('a[href*="/mod/resource/view.php?id="]');
  for (var i = 0; i < links.length; i++) {
    var a = links[i];
    var id = a.href.split('id=')[1].split('&')[0];
    var name = a.textContent.replace(/\s+/g, ' ').trim();
    name = name.replace(/\//g, '-').replace(/:/g, ' ').replace(/[\\*?"<>|]/g, '').trim();
    if (!seen[id] && name !== '') {
      seen[id] = true;
      lines.push(id + '|' + name);
    }
  }
  return lines.join('\r\n');
}
