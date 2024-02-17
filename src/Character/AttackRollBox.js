import React, {useState, useEffect} from "react";


const AttackRollBox = ({attack})=>{

    const {name, attackDieRoll, attackRoll, dmgDiceList, damage, dmgType, altDmgDiceList, altDamage, altDmgType} = attack;

    const [hasDamage, setHasDamage] = useState(true)
    const [showDamage, setShowDamage] = useState(false);
    const [className, setClassName] = useState('');
    const [showRoll, setShowRoll] = useState(true);

    useEffect(()=>{
        if(dmgDiceList.length === 0){
            setHasDamage(false);
        }
        if(attackDieRoll === 20){
            setClassName('crit');
        }
        if(attackDieRoll === 1){
            setClassName('fail');
        };
        if(attackDieRoll === 0){
            setShowRoll(false);
            setShowDamage(true);
        }
    },[]);

    return(
        <div className="attack-roll-box">
            {showRoll ? 
                <div onClick={()=>{if(hasDamage){setShowDamage(true)}}}>
                    <h2 className={className}>{attackRoll}</h2>
                    <i>{attackDieRoll}</i>
                    <br/>
                </div>
            :<></>}
            <b>{name}</b>
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