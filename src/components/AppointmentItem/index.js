import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, onClickIsStarred} = props
  const {id, title, date, isStared} = appointmentDetails
  const starImage = isStared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const onClickStar = () => {
    onClickIsStarred(id)
  }

  return (
    <li className="list-container">
      <div className="title-star-container">
        <p className="title">{title}</p>
        <button className="button" type="button" onClick={onClickStar}>
          <img className="star" src={starImage} alt="star" />
        </button>
      </div>
      <p className="date">{date}</p>
    </li>
  )
}

export default AppointmentItem
