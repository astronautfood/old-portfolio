import React from 'react';
import ReactDOM from 'react-dom';
import firebase from './firebase';

const dbRef = firebase.database().ref('/items');

class Form extends React.Component {
	render() {
		return (
			<section className="add-plants">	
				<form onSubmit={this.props.handleSubmit}> 
					<label className="plantType">
						<input 
						type="radio" 
						name={this.props.name} 
						value={this.props.value} 
						checked={this.props.checked}
						onChange={this.props.onChange}
						{this.props.label} />
					</label>
					<label className="dynamicName">
						<input type="text" 
						className="plant-name" 
						name="nameInput" 
						placeholder='Example: pothos, prayer plant, "Ben"' 
						onChange={this.props.handleChange} 
						value={this.props.nameInput}/>
					</label>	
					<label className="waterTracker">
						<input type="radio" 
						name={this.props.name} 
						value={this.props.value} 
						checked={this.props.checked}
						onChange={this.props.handleInputChange}
						{this.props.label}/>
					</label>
					<button onClick={() => this.removeItem(item.id)}>Add Plant</button>
				</form>
			</section>
		)
	}
}

class RadioButtonGroupOne extends react.Component {
	static propTypes = {
		name: React.PropTypes.string.isRequired,
		value: React.PropTypes.any.isrequired,
		choices: React.Proptypes.any.isrequired,
		choiceValueKey: React.Proptypes.string,
		choiceLabelKey: React.PropTypes.string,
		onChange: React.Proptypes.func.isRequired
	}
}

static defaultProps = {
	value: null,
	choiceValueKey: 'value',
	choiceLabelKey: 'label'
}

handleChange = (e) => {

}

if (item.water === "every month") {
	waterNext = moment().to(thirstyDayLater);

	} else if (item.water === "every three weeks") {
		waterNext = moment().to(threeWeeksLater);

	} else if (item.water === "every two weeks") {
		waterNext = moment().to(twoWeeksLater); {

	} else if (item.water === "every week") {
		waterNext = moment().to(oneWeekLater); {

	} else (item.water === "other day")  {
		waterNext = moment().to(secondDay);
	}
	
}

<p>When to water: {whenToWater}</p> 