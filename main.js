// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 300,
    height: 750,
    icon: __dirname + '/Icon/icons.ico',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    autoHideMenuBar: true,

  })
  // Load a remote URL
  mainWindow.loadURL('http://49.231.40.187:8099/')
  // mainWindow.loadURL('http://127.0.0.1:8099/')



  // var authButton = document.getElementById("auth-button");
  // authButton.addEventListener("click",function(){alert("clicked!");});
  const fs = require('fs');

  let rawdata = fs.readFileSync( __dirname +'/Extention.json');
  let extention = JSON.parse(rawdata);
  console.log(extention);


  var y=extention.ext;

  mainWindow.webContents.on('did-finish-load', () => {

    let code = "document.getElementById('in_ext').value= "+y+" ;"
    // code += "var styleElement = document.createElement('style');"
    // code += "styleElement.id = 'remove-scroll-style';"
    // code += "styleElement.textContent = "
    // code += " 'html::-webkit-scrollbar{display:none !important}' + "
    // code += " 'body::-webkit-scrollbar{display:none !important}'; "
    // code += " document.getElementsByTagName('body')[0].appendChild(styleElement); "
             
    mainWindow.webContents.executeJavaScript(code);

  });
 
  // mainWindow.openDevTools();

  // and load the index.html of the app.
  // mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}
// mainWindow.loadFile("'C:\\ProgramData\\3CXPhone for Windows\\PhoneApp\\3CXWin8Phone.exe'")

// function inputData(){
//   document.getElementById("in_ext").value= 1003;
// }

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.whenReady().then(() => {
  createWindow()


  // let x = document.getElementById('in_ext');
  // x.value = 1003;  

  // receive message from index.html 
  // ipcMain.on('in_ext', (event, arg) => {
  //   console.log( "arg" );

  //   console.log( arg );

  //   // send message to index.html
  //   event.sender.send('in_ext', 'hello' );
  //   });


  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
