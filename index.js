var consoleFinishTrigger = "Sending client info"

function log() {
  var args = Array.prototype.slice.call(arguments, 0)
  var el = document.getElementById('console-log')
  if (args.length) {
    for (i = 0; i < args.length; i++) {
      const newDiv = document.createElement('div')
      newDiv.innerText = args[i]

      if (args[i].startsWith('[Details]')) newDiv.classList.add('detail')
      if (args[i].startsWith('[Status]')) newDiv.classList.add('status')
      if (args[i].startsWith('[Download]')) newDiv.classList.add('download')
      if (args[i].startsWith('[Misc]')) newDiv.classList.add('misc')
      el.append(newDiv)
    }
  } else throw new Error("The message can't be empty for log!!!")

  var container = document.getElementById('console-container')
  container.scrollTop = container.scrollHeight
}

function GameDetails( servername, serverurl, mapname, maxplayers, steamid, gamemode, volume, language )
{
  log(
    `[Details]: Server Name: ${servername}`,
    `[Details]: Map Name: ${mapname}`,
    `[Details]: Gamemode: ${gamemode}`,
    `[Details]: Max Players: ${maxplayers}`,
    `\n`
  )
}

function SetFilesTotal(total)
{
  log(`[Misc]: Set file total to ${total}`)
}

function DownloadingFile(filename)
{
  log(`[Download]: ${filename}`)
}

function SetStatusChanged(status)
{
  log(`[Status]: ${status}`)

  // if (status.includes(consoleFinishTrigger)) {
  //   document.getElementById('console-container').style.backgroundColor = "rgba(1,206,243, 0.5)";
  // }
}

function SetFilesNeeded(needed)
{
  log(`[Misc]: Set files needed to ${needed}`)
}

var totalNumOfImages = 5
var showImage = 1

// create the images

window.addEventListener("DOMContentLoaded", e => {
  for (i = 1; i <= totalNumOfImages; i++) {
    var newDiv = document.createElement("div")
    newDiv.classList.add('bg-image', 'hidden')
    newDiv.id = "bg-image" + i
    newDiv.style.backgroundImage = `url('images/${i}.jpg')`;

    document.body.insertBefore(newDiv, document.body.firstElementChild)
  }

  window.setTimeout(() => {
    document.getElementById(`bg-image1`).classList.remove('hidden')
  }, 1000)

  window.setInterval(() => {
    var activeBg = document.getElementById(`bg-image${showImage}`)
    var oldBg = Array.prototype.filter.call(document.getElementsByClassName('bg-image'), e => {
      return !e.className.includes('hidden')
    })[0]

    activeBg.classList.remove('hidden')
    if (oldBg) oldBg.classList.add('hidden')

    showImage++
    if (showImage > totalNumOfImages) showImage = 1
  }, 18000)
})

const options = [
  SetStatusChanged,
  DownloadingFile
]

function startADebugChain() {
  window.setTimeout(() => {
    options[Math.round(Math.random())]("Debug Text")
    startADebugChain()
  }, (Math.random() * 750))
}

function startDebug() {
  GameDetails( "TopHat Debug", "serverurl", "map_name", 32, "steam_id", "gamemode", "volume", "english" )
  startADebugChain()
}

setInterval(() => {
  var date = new Date()
  var text = date.toLocaleTimeString()

  var el = document.getElementById('datetime')
  el.innerText = text
}, 100)