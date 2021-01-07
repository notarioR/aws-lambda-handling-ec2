import fetch from 'node-fetch';

const body = { 
  "instanceRegion": "us-east-2",
  "instanceId": "i-039d9a031280b4ce9",
  "action": "start"
}

const fetching1 = async() => {
  try{
    const response = await fetch("http://localhost:3000/dev/handleEC2", {
      method: 'post',
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json'}
    })
    const   json = await response.json()
    return  json.body;
  }catch(e){
    return "Something went wrong"
  }
}

test("Start instance successfully", async () => {
  const fetching = await fetching1()
  expect(fetching).toMatch(/Successfully started/);
})