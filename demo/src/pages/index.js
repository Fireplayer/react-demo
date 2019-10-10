import React from "react";

function Square(props) {
    return (
        <button type="button" style={{
            width: 30, 
            height: 30,
            color: '#000000',
        }}>{props.val}</button>
    );
}

class Board extends React.Component {
    render() {
        let {x, y} = this.props;
        console.log("board========render ", x, y, x * y, this.props);
        let list = Array(x * y).fill(null);
        return (
            <div>
                {list.map((item, index)=> {
                    if ((index + 1) % x === 0) { 
                        return (
                            <Square key= {index} >{index}</Square>
                        );
                    } else {
                        return (<Square key= {index}>{index}</Square>);
                    }
                })}
            </div>
        );
    }
}  

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        }
    }    

    componentDidMount() {
        this.timeId = setInterval(()=>{
            this.setState({date: new Date()});
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timeId);
    }

    render() {
        return (
            <p>date: {this.state.date.toLocaleTimeString()}</p>
        );
    }
}

class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {status: false};
        this.handleClick = this.handleClick.bind(this);
    }    

    handleClick(e) {
        let {status} = this.state;
        console.log("toggle click==========", status);
        this.setState({status: !status});
    }

    render() {
        let {status} = this.state;
        let {close, open} = this.props;
        let text = status ? close : open; 
        return (
            <button type="button" onClick= {this.handleClick}>{text}</button>
        );
    }
}

class LoginAccount extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        let {target} = e;
        let {name, value} = target;
        console.log("=========submit", name, value);
    } 

    handleChange(e) {
        let {target} = e;
        let {name, value} = target;
        console.log("=========change", name, value);
    }

    render() {
        return (
            <div>
                <form action="action">
                    <p>account:  <input type="text" name= "account" onChange= {this.handleChange}  /></p>
                    <p>password: <input type="text" name= "password" onChange= {this.handleChange} /></p>
                    <input type="submit" value="submit" onSubmit= {this.handleSubmit} />
                </form>
            </div>
        );
    } 
} 

class BoilingVerdict extends React.Component {
    render() {
        let {celsius} = this.props;
        if (celsius >= 100) {
            return <p>water is hot!</p>;
        } else {
            return <p>water i cool</p>;
        }
    }
}

class CalculatorInput extends React.Component {
    render() {
        let {kind, temperature} = this.props; 
        return (
            <fieldset>
                <legend>input {kind}</legend>
                <input type="text" value={temperature} onChange={(e)=> {this.props.handleChange(e);}}/>
            </fieldset>
        );
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {temperature: 0};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({temperature: e.target.value});
    }
 
    render() {
        const temperature = this.state.temperature;
        return (
            <div>
                <CalculatorInput kind="11" temperature={temperature} handleChange={this.handleChange}/>
                <CalculatorInput kind="22" temperature={temperature} handleChange={this.handleChange}/>
                <BoilingVerdict celsius={temperature} />
            </div>
        );
    }
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isGuest: true};
        this.handleClickLogin = this.handleClickLogin.bind(this);
        this.handleClickLogout = this.handleClickLogout.bind(this);
    }

    handleClickLogin(e) {
        this.setState({isGuest: false});
    }

    handleClickLogout(e) {
        this.setState({isGuest: true});
    }

    render() {
        let {isGuest} = this.state;
        let greet = isGuest ? <p>hello guest</p> : null
        let button = isGuest ? <button type="button" onClick={this.handleClickLogin}>login</button> : <button type="button" onClick={this.handleClickLogout}>logout</button>;
        return (
            <div>
                {greet}
                {button}
                <LoginAccount />
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 10,
            y: 10,
        };
    }

    render() {
        console.log("game==========render", this.state, this.props);
        let {x, y} = this.state;
        return (
            <div style={{width: 30*x, height: 30*y, backgroundColor: "#000000"}} >
                <p>wuziqi</p>
                <Clock />
                {/* <Login /> */}
                {/* <Toggle open="open" close="close" /> */}
                {/* <Board x={x} y={y} ></Board> */}
                <Calculator/>
            </div>
        );
    }    
}
export default Game;
