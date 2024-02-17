import React, {useState, useEffect} from "react";


const AttackRollBox = ({attack})=>{

    const {name, attackDieRoll, attackRoll, dmgDiceList, damage, dmgType, altDmgDiceList, altDamage, altDmgType} = attack;

    const [showDamage, setShowDamage] = useState(false);
    const [className, setClassName] = useState('');
    useEffect(()=>{
        if(attackDieRoll === 20){
            setClassName('crit');
        }
        if(attackDieRoll === 1){
            setClassName('fail');
        };
    },[]);

    return(
        <div className="attack-roll-box">
            <div onClick={()=>{setShowDamage(true)}}>
                <h2 className={className}>{attackRoll}</h2>
                <i>{attackDieRoll}</i>
                <br/>
                <b>{name}</b>
            </div>
            {showDamage ? 
            <div>
                <h3>{damage} {dmgType}</h3>
                <i>{dmgDiceList.join(', ')}</i>
                {altDmgDiceList.length !== 0 ? 
                <div>
                    <h3>{altDamage} {altDmgType}</h3>
                    <i>{altDmgDiceList.join(', ')}</i>
                </div>
                : <></>}
            </div>
            : <></>}
        </div>
    )

}

export default AttackRollBox