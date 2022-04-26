const http = require('http')
const axios = require('axios')

//PCread
const pid = 'a2518bfc-0fd7-4a2e-a897-7de913616335'
const cps = {
  a10_tpm_send_ssl: {
    key: '/var/attestation/iotpis',
    timeout: 20,
    username: 'pi',
  },
}
//hardcoded raspberry 7 id
const eid = '6d7129b9-ced7-4a4d-a1f9-54219b23c1bb'
const url = 'http://194.157.71.11:8520/v2'
const headers = { headers: { 'Content-Type': 'application/json' } }

const GetElements = () => {
  try {
    http.get(`${url}/elements`, (res) => {
      console.log('kukkuu')
      res.on('data', (data) => {
        console.log(JSON.parse(data))
      })
    })
  } catch (error) {
    console.log('error', error)
  }
}

const openSession = async () => {
  try {
    const results = await axios.post(`${url}/sessions/open`)
    console.log('succesfully opened a session', results.data.itemid)
    return results.data.itemid
  } catch (error) {
    console.log('error opening a session', error)
  }
}

const closeSession = async (sid) => {
  try {
    const results = await axios.delete(`${url}/session/${sid}`)
    console.log('succesfully closed session', results.data)
  } catch (error) {
    console.log('error closing down the session', error)
  }
}

const runAttest = async (sid) => {
  try {
    const body = JSON.stringify({
      eid: eid,
      pid: pid,
      cps: cps,
      sid: sid,
    })
    const results = await axios.post(`${url}/attest`, body, headers)
    console.log('succesfully ran attest', results.data)
    return results.data.claim
  } catch (error) {
    console.log('error attesting', error)
  }
}

const runVerify = async (cid, sid) => {
  try {
    const rul = [
      'tpm2rules/PCRsAllUnassigned',
      {
        'bank': 'sha256',
      }
    ]
    const body = JSON.stringify({
      cid: cid,
      rule: rul,
      sid: sid,
    })
    const results = await axios.post(`${url}/verify`, body, headers)
    console.log('succesfully ran verify', results.data)
    return results.data.result
  } catch (error) {
      console.log('something went wrong running verify', error)
  }
}

const getResult = async (resultId) => {
    try {
        const results = await axios.get(`${url}/result/${resultId}`)
        console.log('succesfully got results', results.data)
        return results.data
    } catch (error) {
       console.log('something wrong with getting the result', error) 
    }
}

const runStart = async () => {
  try {
    const sessionId = await openSession()
    const attest = await runAttest(sessionId)
    const verify = await runVerify(attest, sessionId)
    const results = await getResult(verify)
    .then(() => {
        closeSession(sessionId)
    })
  } catch (error) {
      console.log('something went wrong running the script', error)
      closeSession()
  }
}

//TODO:  Open session , Get PID,
runStart()
