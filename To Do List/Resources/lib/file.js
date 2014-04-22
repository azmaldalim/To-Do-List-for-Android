 
exports.add = function(title, description) {
 
var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'file.txt');
 
f.write(title + '\n' + description + '\n', true);
 
};
 
 
exports.deleteData = function() {
var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'file.txt');
f.deleteFile();
};
 
exports.updateData = function(title, description) {
 
var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'file.txt');
 
f.write(title + '\n' + description + '\n');
 
};
 
exports.readData = function() {
var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'file.txt');
var contents = f.read();
if ( contents instanceof Object) {
return contents.text;
} else
return '';
};