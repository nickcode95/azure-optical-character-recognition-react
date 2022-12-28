import { React, useState } from 'react'
import Api from './Api';

export default function Homepage(props) {
    const [isClicked, setIsClicked] = useState(false)
    const [input, setInput] = useState('');
    const [text, setText] = useState('')

    function handleChange(e) {
        setInput(e.target.value)
    }

    function resetApp() {
        setIsClicked(false)
    }

    function handleClick() {
        setText(input)
        setIsClicked(true);

    }
    {
        if (isClicked == true) {
            return (
                <div>
                    <Api UserUrl={text} onClick={resetApp} />
                </div>
            )
        } else {
            return (
                <div>
                    <div className='title'>
                        <h1>Image to Text Converter</h1>
                        <div className="image-input">
                            <input type="text" placeholder='enter url you want to convert' onChange={handleChange} />
                        </div>
                        <button onClick={handleClick}>Submit</button>
                    </div>


                </div>
            )
        }
    }
}