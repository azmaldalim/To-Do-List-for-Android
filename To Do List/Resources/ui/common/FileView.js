function FileView() {
 
var win = Ti.UI.createWindow({
layout : 'vertical',
backgroundColor : 'black',
title : 'Information Saving System',
});
 
// Create a Label.
var titlelabel = Ti.UI.createLabel({
text : 'Title',
color : 'white',
font : {
fontSize : 20
},
height : Ti.UI.SIZE,
width : Ti.UI.FILL,
top : 10,
left : 10,
 
});
// Add to the parent view.
win.add(titlelabel);
 
// Create a TextField.
var title = Ti.UI.createTextField({
height : Ti.UI.SIZE,
top : 10,
left : 10,
width : Ti.UI.FILL,
hintText : 'Enter title ',
keyboardType : Ti.UI.KEYBOARD_DEFAULT,
returnKeyType : Ti.UI.RETURNKEY_DEFAULT,
borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
 
// Add to the parent view.
win.add(title);
 
// Create a Label.
var descriptionLabel = Ti.UI.createLabel({
text : 'Description:',
color : 'white',
font : {
fontSize : 20
},
height : Ti.UI.SIZE,
width : Ti.UI.FILL,
top : 10,
left : 10,
});
// Add to the parent view.
win.add(descriptionLabel);
 
// Create a TextField.
var description = Ti.UI.createTextField({
height : Ti.UI.SIZE,
top : 10,
left : 10,
width : Ti.UI.FILL,
hintText : 'Enter Description ',
keyboardType : Ti.UI.KEYBOARD_DEFAULT,
returnKeyType : Ti.UI.RETURNKEY_DEFAULT,
borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});
 
// Add to the parent view.
win.add(description);
 
var buttonView = Ti.UI.createView({
height : 50,
width : Ti.UI.FILL,
top : 0
});
 
win.add(buttonView);
 
// Create a Button.
var save = Ti.UI.createButton({
title : 'save',
height : 50,
width : Ti.UI.SIZE,
left : 10
});
 
//var data = [];
// Listen for click events.
save.addEventListener('click', function() {
var File = require('lib/file');
if (title.value == '' || description.value == '') {
    alert('Please fillup Fields');
} else {
         if (File.readData().length > 0) {
             File.add(title.value, description.value);
         } else {
             File.updateData(title.value, description.value);
         }
Ti.App.fireEvent('tableUpdate');
}
 
 
title.setValue('');
description.setValue('');
title.blur();
 
});
// Add to the parent view.
buttonView.add(save);

// Create a TableView.
var tableView = Ti.UI.createTableView({
top : 0,
   });
win.add(tableView);
 
var Array = function() {
var word = [];
var File = require('lib/file');
var text = File.readData().split('\n');
 
for (var i = 0; i < text.length - 1; i = i + 2) {
word.push({
title : text[i],
description : text[i + 1]
});
};
 
return word;
};
 
Ti.App.addEventListener('tableUpdate', refresh);
refresh();
function refresh() {
tableData = [];
 
var word = Array();
//alert('function ar modha=' + word.length);
for (var i = 0; i < word.length; i++) {
 
var row = Ti.UI.createTableViewRow({
selectedBackgroundColor : 'white',
rowIndex : i, // custom property, useful for determining the row during events
height : 'auto',
titleValue : word[i].title,
details : word[i].description,
 
});
 
var titleValue = Ti.UI.createLabel({
color : 'red',
font : {
fontFamily : 'Arial',
fontSize : 25,
fontWeight : 'normal'
},
text : "Title: "+word[i].title,
top : 30,
left : 10,
right : 75
 
});
row.add(titleValue);
 
var discriptionText = Ti.UI.createLabel({
color : 'red',
font : {
fontFamily : 'Arial',
fontSize : 25,
fontWeight : 'normal'
},
text :"Description: "+ word[i].description,
top : 60,
left : 10,
right : 60
 
});
row.add(discriptionText);
 
var del = Ti.UI.createButton({
title : 'Delete',
right : 2,
height : 40,
id : "delrow",
width : 50,
myrow : row
});
row.add(del);
 
tableData.push(row);
 
}
tableView.setData(tableData);
}

 
// Create a Button.
var update = Ti.UI.createButton({
title : 'update',
height : 50,
width : Ti.UI.SIZE,
right : 10
});
// Listen for click events.
update.addEventListener('click', function() {
var titleVal = Ti.App.Properties.getString('title');
var details = Ti.App.Properties.getString('description');
//alert(title + '\n' + details);
 
var word = Array();
//alert(word.length);
var File = require('lib/file');
 
if (title.value == '' || description.value == '') {
alert('please update somethings');
 
} else {
for (var i = 0; i < word.length; i++) {
if (titleVal == word[i].title && details == word[i].description) {
var data = ( {
title : title.value,
description : description.value
});
word.splice(i, 1, data);
var File = require('lib/file');
File.deleteData();
for (var i = 0; i < word.length; i++) {
if (File.readData().length > 0) {
File.add(word[i].title, word[i].description);
} else {
File.updateData(word[i].title, word[i].description);
}
 
};
Ti.App.fireEvent('tableUpdate');
title.setValue('');
description.setValue('');
title.blur();
}
};
}
 
});
// Add to the parent view.
buttonView.add(update);
 
 
 
tableView.addEventListener('click', function(e) {
if (e.source.id == "delrow") {
	
var word = Array();
var File = require('lib/file');
for (var i = 0; i < word.length; i++) {
if (e.rowData.titleValue == word[i].title && e.rowData.details == word[i].description) {
word.splice(i, 1);
var File = require('lib/file');
File.deleteData();
        for (var i = 0; i < word.length; i++) {
          if (File.readData().length > 0) {
             File.add(word[i].title, word[i].description);
            } else {
             File.addValue(word[i].title, word[i].description);
           }
       };
Ti.App.fireEvent('tableUpdate');
   }
};
 
} else {
title.setValue(e.rowData.titleValue);
description.setValue(e.rowData.details);
Ti.App.Properties.setString('title', e.rowData.titleValue);
Ti.App.Properties.setString('description', e.rowData.details);
 
}
 
});
// Add to the parent view.
 
return win;
}
 
module.exports = FileView;