import React, {useState} from 'react';

// API_URL that we want to call
const API_URL = 'https://bounty-api-brandi.herokuapp.com/v1/bounties'

const BountyForm = props => {
    let [name, setName] = useState('')
    let [wantedFor, setWantedFor] = useState('')
    let [client, setClient] = useState('')
    let [reward, setReward] = useState(10000)
    let [ship, setShip] = useState('')
    let [hunters, setHunters] = useState('')

    const submit = e => {
        e.preventDefault()
        console.log("Submit!")
        fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify({
                name,
                client,
                hunters: hunters.split(',').map(h => h.trim()),
                reward,
                ship,
                wantedFor
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log('bounty was created')
            // refresh the bounties
            props.refresh()
            // clear the state variables
            setClient('')
            setName('')
            setHunters('')
            setShip('')
            setReward(10000)
            setWantedFor('')
        })
    }

    return (
        <div className="bounty-form"> 
            <h3>Add New Bounty</h3>
            <form onSubmit={submit}>
                <div>
                    <label>Name: </label>
                    <input name="name" value={name} 
                    onChange={e => setName(e.target.value)}></input>
                </div>
                <div>
                    <label>Wanted For: </label>
                    <input name="wantedFor" value={wantedFor} 
                    onChange={e => setWantedFor(e.target.value)}></input>
                </div>
                <div>
                    <label>Client: </label>
                    <input name="client" value={client} 
                    onChange={e => setClient(e.target.value)}></input>
                </div>
                <div>
                    <label>Ship: </label>
                    <input name="ship" value={ship} 
                    onChange={e => setShip(e.target.value)}></input>
                </div>
                <div>
                    <label>Reward: </label>
                    <input name="reward" type="number" value={reward} 
                    onChange={e => setReward(e.target.value)}></input>
                </div>
                <div>
                    <label>Hunters (comma separated list): </label>
                    <input name="hunters" value={hunters} 
                    onChange={e => setHunters(e.target.value)}></input>
                </div>
                <input type="submit" value="Make it a Bounty!"></input>
            </form>
        </div>
    )
}

export default BountyForm