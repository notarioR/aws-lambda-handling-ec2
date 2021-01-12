const URL     = 'http://localhost:3000'
const region  = "us-east-2"
const delay   = ms => new Promise(resolve => setTimeout(resolve, ms));

const getList = () => {
  fetch(URL + '/dev/describe', {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then((arrayJson) => {
    var ul = document.getElementById("list");
    for (var index = 0; index < arrayJson.body.length; index++) {
      var li    = document.createElement("li");
      var btn   = document.createElement("button")
      var elementData = arrayJson.body[index]
      btn.setAttribute("id", elementData.ID); 
      btn.setAttribute("name", "state");
      btn.setAttribute("value", elementData.State.Name);   
      btn.appendChild(document.createTextNode(
        elementData.State.Name === "running" ? "Stop" : "Start"
      ));
      li.appendChild(document.createTextNode(
        elementData.ID +" - "+ elementData.Type + " ----------------> "
      ));
      btn.onclick = (e) => {
        var action = undefined
        e.target.value === "running" ? action = "stop" : action = "start"
        handleInstance(e.target.id, e.target.value, action)
      };
      li.appendChild(btn)
      ul.appendChild(li);
    }
    }).catch(err => console.error(err))
};

const handleInstance = (id, state, action) => {
  const data = {
    "instanceRegion": region,
    "instanceId": id,
    "action": action
  }
  fetch(URL + '/dev/handle', {
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then((response) => {
    const responsesDiv = document.getElementById("responses");
    responsesDiv.style === "none" ? responsesDiv.style = "block" : responsesDiv.style = "none"
    responsesDiv.innerHTML = response.body
  })
  return delay(5000).then(() => {
    document.getElementById("responses").style.display = "none"
  })

}
