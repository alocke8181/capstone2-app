import React, {useContext, useEffect, useState} from "react";
import RollContext from "./RollContext";
import AttackRollBox from "./AttackRollBox";
import { v4 as uuidv4 } from "uuid";

const RollList = ()=>{

    const {rollList, setRollList} = useContext(RollContext);

    const [beenRolled, setBeenRolled] = useState([]);
    const [showIcon, setShowIcon] = useState(false);

    useEffect(()=>{
        if(rollList.length !== 0){
            setShowIcon(true)
            let newRoll = rollList.pop();
            setTimeout(()=>{
                setShowIcon(false);
                setBeenRolled([...beenRolled, newRoll])
            },1000);
        };
    }, [rollList])

    return(
        <div id="roll-cont">
            <h4>Roll Results:</h4>
            {beenRolled.map((attack)=>(
                <AttackRollBox attack={attack} key={uuidv4()}/>
            ))}
            {showIcon ? 
            <div className="attack-roll-box">
                <img src={require('../images/dice.png')}  className='dice-icon' width='64' height='64' alt="dice icon"/>
            </div>
            :<></>}
        </div>
    )

}

export default RollList;