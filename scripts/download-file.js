// ULearn Sync: Check file type and download
// Runs in Power Automate Desktop: "Run JavaScript function on web page"
// %FileID% is replaced by Power Automate with the real file ID before running.
//
// 1. Sends a HEAD request (headers only, no file content) to find the real file address
// 2. Skips anything that is not PDF or PowerPoint
// 3. Adds Moodle's forcedownload=1 so Chrome saves the file instead of displaying it
//
// Returns: the real file name, "SKIPPED" for other file types,
// or "ERROR" if the real file address could not be found.

function ExecuteScript() {
  var xhr = new XMLHttpRequest();
  xhr.open('HEAD', 'https://ulearn.utp.edu.my/mod/resource/view.php?id=%FileID%&redirect=1', false);
  xhr.send();
  var url = xhr.responseURL;
  if (url.indexOf('pluginfile.php') === -1) { return 'ERROR'; }

  var parts = url.split('?')[0].split('/');
  var fileName = decodeURIComponent(parts[parts.length - 1]);
  var ext = fileName.split('.').pop().toLowerCase();
  var allowed = ['pdf', 'ppt', 'pptx'];
  if (allowed.indexOf(ext) === -1) { return 'SKIPPED'; }

  var link = document.createElement('a');
  link.href = url + (url.indexOf('?') > -1 ? '&' : '?') + 'forcedownload=1';
  link.download = '';
  document.body.appendChild(link);
  link.click();
  link.remove();
  return fileName;
}
