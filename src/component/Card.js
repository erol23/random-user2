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
  const [userInfo, setUserInfo] = useState('name');

  const getData = () => {
    setNewUser('LOADING...')
    axios.get("https://randomuser.me/api/").then((response) => {
      setUserCard(response.data.results[0]);
      console.log(response.data.results);
    }).then(() => setNewUser('NEW USER'));
  };

  const creatUser = () => {
    let i;
    for (i= 0; i < addList.length; i++){
      if(userCard?.email.includes(addList[i].email)){
        setAddList([...addList])
        console.log(userCard?.email.includes(addList[i].email));
      }else{
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
            <p className="info"> My {userInfo} is</p>
            <p>{userInfo === "name" && userCard?.name?.first} {userInfo === "name" && userCard?.name?.last}</p>
            <p>{userInfo === "email" && userCard?.email}</p>
            <p>{userInfo === "age" && userCard?.dob?.age}</p>
            <p>{userInfo === "location" && userCard?.location?.street?.number} {userInfo === "location" && userCard?.location?.street?.name}</p>
            <p>{userInfo === "phone" && userCard?.phone}</p>
            <p>{userInfo === "password" && userCard?.login?.password}</p>
            <div className="icons">
              <button className="iconBtn" onMouseEnter={() => setUserInfo('name')}>
                {userCard?.gender === "female" ? (
                  <img src={woman} alt="woman" className="icon" />
                ) : (
                  <img src={man} alt="man" className="icon" />
                )}
              </button>
              <button className="iconBtn" onMouseEnter={() => setUserInfo('email')}>
                <img src={mail} alt="mailIcon" className="icon"/>
              </button>
              <button className="iconBtn" onMouseEnter={() => setUserInfo('age')}>
                {userCard?.gender === "female" ? (
                  <img src={growingUpWoman} alt="woman" className="icon" />
                ) : (
                  <img src={growingUpMan} alt="man" className="icon" />
                )}
              </button>
              <button className="iconBtn" onMouseEnter={() => setUserInfo('location')}>
                <img src={map} alt="mapIcon" className="icon" />
              </button>
              <button className="iconBtn" onMouseEnter={() => setUserInfo('phone')}>
                <img src={phone} alt="phoneIcon" className="icon" />
              </button>
              <button className="iconBtn" onMouseEnter={() => setUserInfo('password')}>
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
