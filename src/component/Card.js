import { useState, useEffect } from "react";
import axios from "axios";
import "./Card.css";
import cw from "../assets/cw.svg";
import growingUpMan from "../assets/growing-up-man.svg";
import growingUpWoman from "../assets/growing-up-woman.svg";
import mail from "../assets/mail.svg";
import man from "../assets/man.svg";
import map from "../assets/map.svg";
import padlock from "../assets/padlock.svg";
import phone from "../assets/phone.svg";
import woman from "../assets/woman.svg";

const Cards = () => {
  const [userCard, setUserCard] = useState([]);
  const [visible, setVisible] = useState(false);
  const [addList, setAddList] = useState([]);
  const [newUser, setNewUser] = useState('NEW USER');
  const [userInfo, setUserInfo] = useState('My name is');

  const getData = () => {
    setNewUser('LOADING...')
    axios.get("https://randomuser.me/api/").then((response) => {
      setUserCard(response.data.results[0]);
      console.log(response.data.results);
    }).then(() => setNewUser('NEW USER'));
    setUserInfo('My name is')
  };

  const creatUser = () => {
    let i;
    for (i= 0; i < addList.length; i++){
        var usr =(userCard?.email.includes(addList[i].email));
    }
    {usr ? 
        setUserInfo('Can not add this user again')
     :
        setAddList([
            ...addList,{
                name : userCard?.name?.first, 
                last : userCard?.name?.last,
                email : userCard?.email,
                phone : userCard?.phone,
                age : userCard?.dob?.age,
            }
        ])
    }
    setVisible(true);
  }
  useEffect(() => {
    getData();
  }, []);
  
  return (
    <div className="container">
      <img src={cw} alt="claruswayLogo" className="logo" />
      <div className="cardList">
        <div className="backgroundTwo"></div>
        <div className="userContainer">
          <div className="user">
            <img
              src={userCard?.picture?.medium}
              alt={userCard?.name?.first}
              className="image"
            />
            <p className="info">{userInfo}</p>
            <p>{userInfo === "My name is" && userCard?.name?.first} {userInfo === "My name is" && userCard?.name?.last}</p>
            <p>{userInfo === "My email is" && userCard?.email}</p>
            <p>{userInfo === "My age is" && userCard?.dob?.age}</p>
            <p>{userInfo === "My location is" && userCard?.location?.street?.number} {userInfo === "My location is" && userCard?.location?.street?.name}</p>
            <p>{userInfo === "My phone is" && userCard?.phone}</p>
            <p>{userInfo === "My password is" && userCard?.login?.password}</p>
            <div className="My icons is">
              <button className="My iconBtn is" onMouseEnter={() => setUserInfo('My name is')}>
                {userCard?.gender === "female" ? (
                  <img src={woman} alt="woman" className="icon" />
                ) : (
                  <img src={man} alt="man" className="icon" />
                )}
              </button>
              <button className="iconBtn" onMouseEnter={() => setUserInfo('My email is')}>
                <img src={mail} alt="mailIcon" className="icon"/>
              </button>
              <button className="iconBtn" onMouseEnter={() => setUserInfo('My age is')}>
                {userCard?.gender === "female" ? (
                  <img src={growingUpWoman} alt="woman" className="icon" />
                ) : (
                  <img src={growingUpMan} alt="man" className="icon" />
                )}
              </button>
              <button className="iconBtn" onMouseEnter={() => setUserInfo('My location is')}>
                <img src={map} alt="mapIcon" className="icon" />
              </button>
              <button className="iconBtn" onMouseEnter={() => setUserInfo('My phone is')}>
                <img src={phone} alt="phoneIcon" className="icon" />
              </button>
              <button className="iconBtn" onMouseEnter={() => setUserInfo('My password is')}>
                <img src={padlock} alt="padlockIcon" className="icon" />
              </button>
            </div>
            <div className="btn">
              <button className="button" onClick={getData}>
                {newUser}
              </button>
              <button className="button" onClick={creatUser}>
                ADD USER
              </button>
            </div>
            {visible ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Firstname</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Age</th>
                  </tr>
                </thead>
                {addList?.map((item) => (
                    <tbody>
                        <tr>
                            <td>{item.name} {item.last}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.age}</td>
                        </tr>
                    </tbody>
                ))}
              </table>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
