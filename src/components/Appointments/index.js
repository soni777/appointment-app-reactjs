import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {title: '', date: '', appointmentsList: [], starButtonClicked: false}

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onSubmitAppointment = event => {
    event.preventDefault()
    this.setState(prevState => {
      const newAppointment = {
        id: uuidv4(),
        title: prevState.title,
        date: format(new Date(prevState.date), 'dd MMMM yyyy, EEEE'),
        isStared: false,
      }
      return {
        appointmentsList: [...prevState.appointmentsList, newAppointment],
        title: '',
        date: '',
      }
    })
  }

  onClickIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, isStared: !eachItem.isStared}
        }
        return eachItem
      }),
    }))
  }

  getStarredAppointments = () => {
    this.setState(prevState => ({
      starButtonClicked: !prevState.starButtonClicked,
    }))
  }

  render() {
    const {title, date, starButtonClicked} = this.state
    let {appointmentsList} = this.state
    if (starButtonClicked) {
      appointmentsList = appointmentsList.filter(
        eachItem => eachItem.isStared === true,
      )
    }

    const filterClassName = starButtonClicked
      ? 'starred-btn-active btn'
      : 'starred-btn btn'
    return (
      <div className="app-container">
        <div className="card-container">
          <div className="top-container">
            <div>
              <h1 className="heading">Add Appointment</h1>
              <form
                className="form-container"
                onSubmit={this.onSubmitAppointment}
              >
                <label className="label" htmlFor="title">
                  TITLE
                </label>
                <input
                  className="input"
                  placeholder="Title"
                  value={title}
                  id="title"
                  type="text"
                  onChange={this.onChangeTitle}
                />
                <label className="label" htmlFor="date">
                  DATE
                </label>
                <input
                  className="input"
                  value={date}
                  id="date"
                  type="date"
                  onChange={this.onChangeDate}
                />
                <button className="add-btn" type="submit">
                  Add
                </button>
              </form>
            </div>

            <img
              className="image"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <div className="bottom-container">
            <hr className="line" />
            <div className="headline-button-container">
              <h1 className="heading">Appointments</h1>
              <button
                className={filterClassName}
                type="button"
                onClick={this.getStarredAppointments}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-container">
              {appointmentsList.map(eachItem => (
                <AppointmentItem
                  key={eachItem.id}
                  appointmentDetails={eachItem}
                  onClickIsStarred={this.onClickIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
