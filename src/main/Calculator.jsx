import React, { Component, Fragment } from "react"
import "./Calculator.css"
import Button from "../components/Button"
import Display from "../components/Display"

const initialState = {
    displayValue: "0",
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    state = { ...initialState }

    clearMemory = () => {
        this.setState({ ...initialState })
    }

    setOperation = (operation) => {
        const { current } = this.state;

        if (current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true })
        } else {
            const equals = operation === "="

            const values = [...this.state.values]

            try {
                values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`)
            } catch (e) {
                values[0] = this.state.values[0]
            }
            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    addDigit = (d) => {
        const { current } = this.state

        if (d === "." && this.state.displayValue.includes("."))
            return

        const clearDisplay = this.state.displayValue === "0"
            || this.state.clearDisplay

        const currentValue = clearDisplay ? "" : this.state.displayValue
        const displayValue = currentValue + d

        if (d !== ".") {
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[current] = newValue

            this.setState({ values })
        }

        this.setState({ displayValue, clearDisplay: false })
    }

    render() {

        const {
            displayValue,
            clearDisplay,
            operation,
            values,
            current
        } = this.state

        return (
            <Fragment>
                <h1>Calculator</h1>
                <div className="calculator">
                    <Display value={displayValue} />
                    <Button label="AC" onClick={this.clearMemory} triple />
                    <Button label="/" onClick={this.setOperation} operation />
                    <Button label="7" onClick={this.addDigit} />
                    <Button label="8" onClick={this.addDigit} />
                    <Button label="9" onClick={this.addDigit} />
                    <Button label="*" onClick={this.setOperation} operation />
                    <Button label="4" onClick={this.addDigit} />
                    <Button label="5" onClick={this.addDigit} />
                    <Button label="6" onClick={this.addDigit} />
                    <Button label="-" onClick={this.setOperation} operation />
                    <Button label="1" onClick={this.addDigit} />
                    <Button label="2" onClick={this.addDigit} />
                    <Button label="3" onClick={this.addDigit} />
                    <Button label="+" onClick={this.setOperation} operation />
                    <Button label="0" onClick={this.addDigit} double />
                    <Button label="." onClick={this.addDigit} />
                    <Button label="=" onClick={this.setOperation} operation />
                </div>
            </Fragment>
        )
    }
}