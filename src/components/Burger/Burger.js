import React from 'react';
import BurgerIngredient from "./BurgerIngredients/BurgerIngredients";
import classes from "./Burger.css";

const burger = (props) => {
    let burgerToRender = Object.keys(props.ingredientsToRender).map(value => {
        return [...Array(props.ingredientsToRender[value][0])].map((_, index) =>{
            return <BurgerIngredient 
            type = {value} 
            key = {value + index}
            />
        });
    })
    burgerToRender = burgerToRender.reduce((arr, el) => {
        return arr.concat(el)
    }, []);
    if (burgerToRender.length === 0)
    {
        burgerToRender = <p>Please add things to the burger</p>
    }
    return (
        <div className = {classes.Burger} >
            <BurgerIngredient type = {"bread-top"} key = {"topBun"}/>
            {burgerToRender}
            <BurgerIngredient type = {"bread-bottom"} key = {"bottomBun"}/>

        </div>
    );
}

export default burger;