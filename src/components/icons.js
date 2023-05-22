import React from "react";
import "../css/icons.css"
import Calendar from "../img/images/calendar.png"
import Keep from "../img/images/keep.png"
import Tasks from "../img/images/tasks.png"
import Contacts from "../img/images/contacts.png"
import Maps from "../img/images/maps.png"

export default function Icons(){
    const icons = [
        Calendar,
        Keep,
        Tasks,
        Contacts,
        Maps
    ]
    return(
        <>
            <section className="google__icons">

                {icons.map((icon) => {
                    return (
                        <img className="app__icon" src={icon} />
                    )
                })

                }

            </section>
        </>
    )
}