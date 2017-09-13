import React from 'react';
import ReactDOM from 'react-dom';
import firebase from './firebase';
import moment from 'moment';

const dbRef = firebase.database().ref('/items');

let lastWatered = moment();



const thirtyDaysLater = lastWatered.add(30, 'days');
const threeWeeksLater = lastWatered.add(21, 'days');
const twoWeeksLater = lastWatered.add(14, 'days');
const oneWeekLater = lastWatered.add(7, 'days');
const secondDay = lastWatered.add(2, 'days'); 

function getWaterDate(time) {
	if (time === "every month") {
		return 30

	} 
	else if (time === "every three weeks") {
		return 21

	} 
	else if (time === "every two weeks") {
		return 14 

	} 
	else if (time === "every week") {
	 	return 7
	}
	else {
		return 2
	}
};

class Form extends React.Component {
	render() {
		return (
			<section className="add-plants">	
				<form onSubmit={this.props.handleSubmit}>
					<div className="type">
						<div className="instruction">Select Plant Type</div>
						<div className="flex-container">
							<label htmlFor="cacti">Cactus</label> 
							<input type="radio" name="plantType" id="cacti" value="Cactus" checked={this.props.selectedOption === 'Cactus'} onChange={this.props.handleChange}/>
						</div>	
						<div className="flex-container">
							<label htmlFor="succulent">Succulent</label>
							<input type="radio" name="plantType" id="succulent" value="Succulent" checked={this.props.selectedOption === 'Succulent'} onChange={this.props.handleChange} />
						</div>
						<div className="flex-container">	
							<label htmlFor="house-plant">House Plant</label>
							<input type="radio" name="plantType" id="house-plant" value="House Plant" checked={this.props.selectedOption === 'House Plant'} onChange={this.props.handleChange}/>
						</div>	
					</div>
					<div className="dynamic-name">
						<div className="instruction">What's it's name?</div>
						<label htmlFor="plant-name">
							<input type="text" className="plant-name" name="dynamicName" placeholder='i.e. Pothos, Prayer Plant, "Ben"' onChange={this.props.handleChangeText} value={this.props.dynamicName}/>
						</label>
					</div>
					<div className="water-tracker">
						<div className="instruction">How often does you plant need to be watered?</div>
						<div className="flex-container">
							<label htmlFor="other-day">Every Other Day</label> 
							<input type="radio" name="waterTracker" id="other-day" value="every other day" checked={this.props.selectedTime === 'every other day'} onChange={this.props.handleOptionChange}/>
						</div>	
						<div className="flex-container">
							<label htmlFor="week">Every Week</label>
							<input type="radio" name="waterTracker" id="week" value="every week" checked={this.props.selectedTime === 'every week'} onChange={this.props.handleOptionChange}/>
						</div>
						<div className="flex-container">
							<label htmlFor="two-weeks">Every Two Weeks</label>
							<input type="radio" name="waterTracker" id="two-weeks" value="every two weeks" checked={this.props.selectedTime === 'every two weeks'} onChange={this.props.handleOptionChange}/>
						</div>
						<div className="flex-container">
							<label htmlFor="three-weeks">Every Three Weeks</label>
							<input type="radio" name="waterTracker" id="three-weeks" value="every three weeks" checked={this.props.selectedTime === 'every three weeks'} onChange={this.props.handleOptionChange}/>
						</div>	
						<div className="flex-container">
							<label htmlFor="month">Every Month</label>
							<input type="radio" name="waterTracker" id="month" value="every month" checked={this.props.selectedTime === 'every month'} onChange={this.props.handleOptionChange}/>
						</div>	
					</div>
					<div className="calendar">
						<div className="instruction">When was the last time you watered your plant?</div>
						<input id="date" type="date" name="selectedDate" onChange={this.props.updateDate} value={this.props.selectedDate}/>
					</div>
					<input type="submit" />
				</form>
			</section>
		)
	}
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			plantType: "",
			waterTracker: "",
			dynamicName: '',
			items: [],
			selectedOption: '',
			selectedTime: '',
			selectedDate: '',
		};
		// console.log(plantType)

		// this.handleInputChange = this.handleInputChange.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleOptionChange = this.handleOptionChange.bind(this);
		this.handleChangeText = this.handleChangeText.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.removeItem = this.removeItem.bind(this);
		this.updateDate = this.updateDate.bind(this);

	}

	removeItem(key) {
		const itemRef = firebase.database().ref(`/items/${key}`);
		itemRef.remove();
	}

	updateDate(e) {
		const date = moment(e.target.value);

		this.setState({
			selectedDate: date.format(),
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		const newItem = {
			plant: this.state.selectedOption,
			water: this.state.selectedTime,
			name: this.state.dynamicName,
			dateSubmitted: this.state.selectedDate
		};

		dbRef.push(newItem);
	}

	handleChange(event) {
		this.setState({
			selectedOption: event.target.value
		});
	}

	handleOptionChange(event) {
		this.setState ({
			selectedTime: event.target.value,
			otherDay: 8640000000,
			week: 604800000000,
			twoWeeks: 121000000000,
			threeWeeks: 1814000000000,
			month: 7884000000000
		});
	}

	handleChangeText(event) {
		this.setState ({
			dynamicName: event.target.value
		});
	}

	handleChangeDate(event) {
		this.setState ({
			selectedDate: event.target.value
		});
	}

	componentDidMount() {
		dbRef.on('value', (snapshot) => {
			const newItemsArray = [];
			const firebaseItems = snapshot.val();
			for (let key in firebaseItems) {

				const firebaseItem = firebaseItems[key];
				firebaseItem.id = key;

				newItemsArray.push(firebaseItem);
			}
			console.log(newItemsArray);

			this.setState({
				items: newItemsArray
			});
		});
	}

	render() {
		return (
			<div className='app'>
				<header>
					<img src="../dev/assets/h2growWhite.svg" />
				</header>
				<div className="container">
					<div className="formWrap">
						<Form 
							handleChange={this.handleChange}
							handleOptionChange={this.handleOptionChange}
							handleChangeText={this.handleChangeText}
							handleSubmit={this.handleSubmit}
							updateDate={this.updateDate}
							otherDay={this.state.otherDay}
							selectedOption={this.state.selectedOption}
							selectedTime={this.state.selectedTime}
							dynamicName={this.state.dynamicName}
						/>
					</div>
					<section className="plant-cards">
						<div className="wrapper">
							<div className="plant-card">
								<ul>
									{this.state.items.map((item, i) => {
										let lastWatered = moment(item.dateSubmitted);
										const waterTime = lastWatered.add(getWaterDate(item.water), 'days');
										const whenToWater = moment().to(waterTime);

										 return (
										<li key={i} >
											<p className="today">{moment().format('LLLL')}</p>
											<p className="plantType__user-input"><span>Plant Type:</span> {item.plant}</p>
											<p className="name__user-input"><span>Name:</span> {item.name}</p>
											<p className="water-me">Water me {item.water}</p>
											<p className="display-when">Water me {whenToWater}<img src="./dev/assets/branch.png" /></p>
											<button onClick={() => this.removeItem(item.id)}>Remove Item</button>
										</li>
										);
									})}
								</ul>
							</div>
						</div>
					</section>
				</div>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));