import React from 'react';
import { Link } from 'react-router-dom'

const Tag = (props) => {
    const template = <div
    style={{
        background: props.bak,
        fontSize: props.size,
        color: props.color,
        padding: '5px 10px',
        display: 'inline-block',
        fontFamily: 'Righteous',
        ...props.add
    }}
    >
        {props.children}
    </div>
   
    if(props.link){
        return(
            <Link to={props.linkto}>
                {template}
            </Link>
        )
    }else{
        return template
    }

};

export default Tag;

export const firebaseLooper = (snapshot) => {
    const data = []
    snapshot.forEach((childSnapshot)=> {
        data.push({
            ...childSnapshot.val(),
            id: childSnapshot.key
        })
    })
    return data
}

export const reverseArray = (actualArray) => {
    let reversedArray = []

    for(let i= actualArray.length-1; i>=0; i--){
        reversedArray.push(actualArray[i])
    }
    return reversedArray
}

export const valiDate = (element) => {
    let error = [true, '']

    if(element.validation.email){
        const valid = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(element.value)
        const message = `${!valid ? 'This field is required': ''}`
        error = !valid ? [valid, message] : error
    }

    if(element.validation.required){
        const valid = element.value.trim() !== ''
        const message = `${!valid ? 'This field is required': ''}`
        error = !valid ? [valid, message] : error
    }
    return error
}

