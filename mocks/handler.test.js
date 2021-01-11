import fetch from 'node-fetch';

const URL   = "http://localhost:3000/dev/handleEC2"

const bodyBuilder   = (region, id, action) => {
  const body  = { 
    "instanceRegion": region,
    "instanceId": id,
    "action": action
  }
  return body;
}

const fetchingData = async(data) => {
  try{
    const response = await fetch(URL, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {'Content-Type': 'application/json'}
    })
    const   json = await response.json()
    return  json.body;
  }catch(e){
    return "Something went wrong"
  }
}

test("Stop instance successfully", async () => {
  const body = bodyBuilder("us-east-2", "i-039d9a031280b4ce9", "stop")
  const fetching = await fetchingData(body)
  expect(fetching).toMatch(/Successfully stopped/);
})

test("Start instance successfully", async () => {
  const body = bodyBuilder("us-east-2", "i-039d9a031280b4ce9", "start")
  const fetching = await fetchingData(body)
  expect(fetching).toMatch(/Successfully started/);
})

test("No matching the action", async () => {
  const body = bodyBuilder("us-east-2", "i-039d9a031280b4ce9", "wrongAction")
  const fetching = await fetchingData(body)
  expect(fetching).toMatch(/No matching action required/);
})