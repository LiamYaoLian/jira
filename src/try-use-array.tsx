import {useArray, useMount} from "utils";
import React from "react";

export interface person {
    name : string,
    age : number
}



export const TsReactTest = () => {


    const persons: person[] = [
        {name: "jack", age: 25},
        {name: "ma", age: 22},

    ];
    const {value, clear, removeIndex, add} = useArray(persons);
    useMount(() => {
        // console.log(value.notExist)
        // add({ name: "david" });
        // removeIndex("123");
    })

    return (
        <div>
            <button onClick={() => add({name: "john", age: 22})}>add john</button>
            <button onClick={() => removeIndex(0)}>remove 0</button>
            <button style={{marginBottom: '50px'}} onClick = {() => clear()}>clear</button>
            {value.map((person, index) => (
                <div style={{marginBottom:'30px'}}>
                    <span>{index}</span>
                    <span>{person.name}</span>
                    <span>{person.age}</span>
                </div>
                ))}
        </div>
    )
}