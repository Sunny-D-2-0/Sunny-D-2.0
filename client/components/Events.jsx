import React from 'react';
import { useState } from 'react';
import '../styles/Events.css';

const Events = ({currentPoints, setCurrentPoints, uv, username, user}) => {
	const [activity, setActivity] = useState('')
	const [time, setTime] = useState('')
	const [list, setList] = useState(user.activities);

	const handleTimeChange = (e) => {
		setTime(e.target.value);
	};
	const handleActivityChange = (e) => {
		setActivity(e.target.value);
	};

	const List = () => (
		list?.length?.map(activity => (
			<div className='activity'>
			  <h6>{activity.name}: <span>{activity.time} mins</span></h6>
			</div>
		))
	)

	const handleClick = () => {
		const newList = [...list];
		newList.push({ name: activity, time: parseInt(time) });
		setList(newList);
		const points = currentPoints + parseInt(time) * (uv);
		console.log({currentPoints}, {points})
		setCurrentPoints(points);

		fetch("/api/update", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(
				{
					username,
					date: new Date().toDateString(),
					points: points,
					activity: {name: activity, time: parseInt(time)}
				}
			),
		})
			.then(res => res.json())
			.then(console.log)
			.catch(console.log)
	}

	return (
		<div className='events-container'>
			<div className='activities-form'>
			<label className='input-label' style={{marginRight: 5}} htmlFor="activity">Activity:</label>
			<input id='activity' style={{marginRight: 10}} value={activity} onChange={(e) => handleActivityChange(e)}></input>
			<label className='input-label' style={{marginRight: 5}} htmlFor="time">Duration:</label>
			<input id='time' value={time} onChange={(e) => handleTimeChange(e)}></input>
			</div>
			<button className='add-event-button' onClick={handleClick}>Add activity</button>
			<List />
		</div>
	);
}

export default Events;