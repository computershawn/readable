

// Maybe move this to a 'helpers' or 'utils' file/folder?
export function convertDate( timestamp = Date.now()) {
  let d = new Date(timestamp)
  let weekdays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  let months = ['January','February','March','April','May','June','July','August','September','October','November','December']
  let formatted = weekdays[d.getDay()].substring(0,3) + " " + months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear()
  return formatted
}


export function capitalize(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}
