import {React, useState} from 'react'
import Api from './Api';

export default function Homepage(props){
    let isClicked = true;

    const [input, setInput] = useState();
    const [text, setText] = useState()

    function handleChange (e) {
        setInput(e.target.value)
    }

    function handleClick(){
        setText(input)
        isClicked = true;
    }
    
            {if (isClicked === true){
                return (
                    <div>
                         <Api/>
                    </div>
                   
                )
            } else {
                return (
                    <div className="image-input">
                        <input type="text" placeholder='enter url you want to convert' onChange={handleChange}/>
                        <button onClick={handleClick}>Submit</button>
                        </div>
                        )
            }
            }
        
    
}