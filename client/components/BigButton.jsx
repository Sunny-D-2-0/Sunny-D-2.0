import React, { useState, useEffect } from "react";
import Events from "./Events.jsx";
import emptyBottle from '../images/SunnyDBottle_Empty4.png';
import fullBottle from '../images/SunnyDBottle_FULL4.png';
import overBottle from '../images/SunnyDBottle_OVER5.png';

function BigButton(props) {
	const addSession = (username) => {
		fetch("/api/update", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(
				{
					username,
					date: new Date().toDateString(),
					startTime,
					endTime: Date.now(),
					points: currentPoints,
				}
			),
		})
			.then(res => res.json())
			.then(console.log)
			.catch(console.log)
	};

	const [isOutside, setIsOutside] = useState(false);
	const [startTime, setStartTime] = useState(Date.now());
	const [currentPoints, setCurrentPoints] = useState(props.user.points);
	const [showWarning, setShowWarning] = useState(false);

	const Warning = () => {
		return (
			<div className="warning">{currentPoints < 200 ? 'Put on sunscreen before going back outside!' : 'For the love of God, please don\'t go back outside!'}</div>
		)
	}

	useEffect(() => {
		if (currentPoints >= 100) {
			setShowWarning(true);
		}
	}, [currentPoints]);

	useEffect(() => {
		if (isOutside) {
			const interval = setInterval(() => {
				const currentTime = Date.now();
				const elapsedMinutes = (currentTime - startTime) / 60000;
				const points = currentPoints + (props.uv/5);
				setCurrentPoints(points);
			}, 200);
			return () => clearInterval(interval);
		}
	}, [isOutside, startTime, currentPoints, props.uv]);

	const handleButtonClick = () => {
		if (isOutside) {
			addSession(props.username);
		} else {
			setStartTime(Date.now());
		}
		setIsOutside(!isOutside);
	};
	
	return (
		<div id="d-meter">
			<div>D-Meter: {currentPoints.toFixed(2)}%</div>
			{/* <div id="progress-container"> */}
				{/* <div id="loading" style={{ width: `${currentPoints}%` }}></div> */}
				<div style={{height: 170, width: 70, display: 'flex', justifyContent: 'center', alignItems: 'flex-end'}}>
				<img src={emptyBottle} alt="" style={{height: 150, width: 70, position: 'absolute', objectPosition: 'bottom center', objectFit: 'cover'}} />
				<img src={fullBottle} alt="" style={{height: currentPoints >= 100 ? 150 : (1.5 * currentPoints), width: 70, position:'absolute', objectFit: 'cover', objectPosition: 'bottom center'}} />
				{currentPoints > 100 && <img src={overBottle} alt="" style={{height: 190, width: 90, position:'absolute', objectFit: 'cover', objectPosition: 'bottom center'}} />}
				
			</div>
			{showWarning && <Warning />}
			<br />
			<button id="big-button" onClick={handleButtonClick}>
				{isOutside ? "YOU'RE OUTSIDE! GO INSIDE?" : "YOU'RE INSIDE! GO OUTSIDE?"}
			</button>
			<Events setCurrentPoints={setCurrentPoints} currentPoints={currentPoints} uv={props.uv} user={props.user} username={props.username} />
		</div>
	);
}

export default BigButton;
