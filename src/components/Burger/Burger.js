import React from 'react';
import BurgerIngredient from "./BurgerIngredients/BurgerIngredients";
import classes from "./Burger.css";

const burger = (props) => {
    var filtered = props.ingredientsToRender.filter(function (el) {
        return el != null;
    });
    const burgerItems = filtered.map((value, index) => {
        return (
            <BurgerIngredient type = {value} key = {index}/>
        )
    })
    return (
        <div className = {classes.Burger} >
            {burgerItems}
            {/* <BurgerIngredient type="bread-top" />
            <BurgerIngredient type="cheese" />
            <BurgerIngredient type="meat" />
            <BurgerIngredient type = "bread-bottom" />                  */}
        </div>
    );
}

export default burger;