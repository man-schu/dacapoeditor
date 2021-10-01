'use strict';

//taken from https://gist.github.com/tsuriga/2aeedf9579bc55037519
//'note' replaced by 'abc'

const fs = require('fs'),
  remote = require('remote'),
  dialog = remote.require('dialog');

document.addEventListener('DOMContentLoaded', function() {
  var btnLoad = document.getElementById('load'),
    btnSave = document.getElementById('save'),
    abc = document.getElementById('abc');

  btnLoad.addEventListener('click', function () {
    dialog.showOpenDialog(function (filePaths) {
      if (filePaths === undefined) {
        return;
      }

      var filePath = filePaths[0];

      try {
        abcfile.value = fs.readFileSync(filePath, 'utf-8');

        console.log('Loaded file:' + filePath)
      } catch (err) {
        console.log('Error reading the file: ' + JSON.stringify(err));
      }
    });
  });

  btnSave.addEventListener('click', function () {
    dialog.showSaveDialog(function (filePath) {
      if (filePath === undefined) {
        return;
      }

      fs.writeFile(filePath, abcfile.value, function (err) {
        if (err === undefined) {
          dialog.showMessageBox({
            message: 'The file has been saved!',
            buttons: ['OK']
          });
        } else {
          dialog.showErrorBox('File save error', err.message);
        }
      });
    });
  });
});
