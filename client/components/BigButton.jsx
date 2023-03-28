import React, { useState, useEffect } from "react";

function BigButton(props) {
	const addSession = (username) => {
		fetch("/api/update", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(
				{
					username,
					date: new Date().toDateString(),
					startTime,
					endTime: Date.now(),
					points: currentPoints
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

	useEffect(() => {
		if (isOutside) {
			const interval = setInterval(() => {
				const currentTime = Date.now();
				const elapsedMinutes = (currentTime - startTime) / 60000;
				const points = currentPoints + props.uv * elapsedMinutes;
				setCurrentPoints(points);
			}, 1000);
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
			<div id="progress-container">
				<div id="loading" style={{ width: `${currentPoints}%` }}></div>
			</div>
			<br />
			<button id="big-button" onClick={handleButtonClick}>
				{isOutside ? "YOU'RE OUTSIDE! GO INSIDE?" : "YOU'RE INSIDE! GO OUTSIDE?"}
			</button>
		</div>
	);
}

export default BigButton;
