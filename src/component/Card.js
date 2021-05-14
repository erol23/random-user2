import { useState, useEffect } from 'react';
import axios from 'axios';
import './Card.css';
import cw from '../assets/cw.svg';
import growingUpMan from '../assets/growing-up-man.svg';
import growingUpWoman from '../assets/growing-up-woman.svg';
import mail from '../assets/mail.svg';
import man from '../assets/man.svg';
import map from '../assets/map.svg';
import padlock from '../assets/padlock.svg';
import phone from '../assets/phone.svg';
import woman from '../assets/woman.svg';

const Cards = () => {
    const [userCard, setUserCard] = useState([]);
    const [visible, setVisible] = useState(false);
    const [table, setTable] = useState(
    <table className="table">
        <thead>
            <tr>
                <th>Firstname</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Age</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </tbody>
    </table>)

    const getData = () => {
        axios.get('https://randomuser.me/api/').then((response) => {
            setUserCard(response.data.results);
            console.log(response.data.results);
        })
    }

    const isVisible = () => {
        setVisible(true);
    }

    // const create = () => {
    //     setTable(()=>{
    //         {userCard.map((item) => (
    //         { item.name.fisrt in table ?
    //             console.log('not add user')
    //         :
    //             <tr>
    //                 <td>{item.name.first} {item.name.last}</td>
    //                 <td>{item.email}</td>
    //                 <td>{item.cell}</td>
    //                 <td>{item.dob.age}</td>
    //             </tr>
    //         }
    //     ))}
    // })}
    useEffect(()=> {
        getData();
    },[])

    return(
        <div className="container">
            <img src={cw} alt="claruswayLogo" className='logo'/>
            <div className="cardList">
                <div className="backgroundTwo"></div>
                <div className="userContainer">
                    {userCard.map((item, index) => (
                        <div className="user" key={index}>
                            <img src={item.picture.medium} alt={item.name.first} className='image' />
                            <p className="info"><span>My name is</span><br />{item.name.first} {item.name.last}</p>
                            <div className="icons">
                                <button className='iconBtn'>{item.gender === "female" ? <img src={woman} alt='woman' className='icon'/> : <img src={man} alt='man' className='icon'/>}</button>
                                <button className='iconBtn'><img src={mail} alt="mailIcon" className='icon'/></button>
                                <button className='iconBtn'>{item.gender === "female" ? <img src={growingUpWoman} alt='woman' className='icon'/> : <img src={growingUpMan} alt='man' className='icon'/>}</button>
                                <button className='iconBtn'><img src={map} alt="mapIcon" className='icon'/></button>
                                <button className='iconBtn'><img src={phone} alt="phoneIcon" className='icon'/></button>
                                <button className='iconBtn'><img src={padlock} alt="padlockIcon" className='icon'/></button>
                            </div>
                            <div className="btn">    
                                <button className='button' onClick={getData}>{item ?'NEW USER' : 'LOADİNG...'}</button>
                                <button className='button' onClick={isVisible}>ADD USER</button>
                            </div>
                            { visible ?  table : null}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Cards;