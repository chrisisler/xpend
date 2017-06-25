import { h, render, Component } from 'preact'
import './normalize.css'

const fontColor = '#444'
const css = {
    App: {
        fontFamily: 'sans-serif',
        fontSize: 16,
        color: fontColor,
        letterSpacing: 1.2,
        maxWidth: 700,
        margin: '0 auto'
    },
    Header: {
        title: {
            fontWeight: 200,
            padding: '3vh',
            margin: 0
        },
        textAlign: 'center',
        color: fontColor,
        backgroundColor: '#eee'
    },
    XpenseInput: {
        wrapper: {
            margin: '0 auto',
            textAlign: 'center'
        },
        title: {
            marginTop: 28,
            fontWeight: 200
        },
        border: `1px solid ${fontColor}`,
        borderRadius: 2,
        padding: 4,
        margin: '-2px 8px',
        textAlign: 'center',
        width: '40%',
        maxWidth: 200
    },
    Down: {
        wrapper: {
            textAlign: 'center',
            paddingTop: 16
        }
    },
    Xpense: {
        wrapper: {
            textAlign: 'center',
            display: 'flex'
        },
        value: {
            padding: 0,
            display: 'inline',
            width: '50%',
            margin: '0.66em'
        }
    }
}

const Header = () => (
    <div style={css.Header}>
        <h1 style={css.Header.title}>Xpend</h1>
    </div>
)

class XpenseInput extends Component
{
    onNameChange = (e) => {
        this.setState({ name: e.target.value, cost: this.state.cost })
    }

    onCostChange = (e) => {
        const newXpense = { name: this.state.name, cost: e.target.value }

        this.setState(newXpense)

        if (e.key === 'Enter') {
            this.props.addXpense(newXpense)
        }
    }

    render = (_, { name, cost }) => (
        <div style={css.XpenseInput.wrapper}>
            <h3 style={css.XpenseInput.title}>New Xpense</h3>
            <input style={css.XpenseInput} type='text' placeholder='name' value={name} onKeyDown={this.onNameChange}/>
            <input style={css.XpenseInput} type='text' placeholder='cost' value={cost} onKeyDown={this.onCostChange}/>
        </div>
    )
}

const Down = () => (
    <div style={css.Down.wrapper}>
        <img alt='' width='50' height='50' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAABOklEQVRoQ+3Y4Q2CMBQE4GMDN1E30MnVCdRNHMG8BJJKQNrrO2jI84+KecXvDhJrh508up04EJDWmoxGohFRAnFpiYKll41G6OhEg9GIKFh62V038uxjuQL40BFpBg8Abv3S5/QUU428ABwB2HNLmAFxAvAAcFmC2MC9MUyKePeIn6tl7h5pCbOIsGb+3ewtYLIQSxD7fEtMNiIHshWmCJELWRtTjCiBrIWhEKUQNYZGMBAVpgrBQrwx1YgaiBfGBVELqcW4ITwgLMYV4QUpxbgjPCG5GAnCG7KEkSEUkDmMHbednW2KJvcT6SaJea3as49/Ndt3kyFUjQyBphg7JmliOJmqkTHG3tseW/ZnhhrCXO7UTECo2IRD0YgwXGrpaISKTTgUjQjDpZaORqjYhEPRiDBcaundNPIFKKR2M+80Pk4AAAAASUVORK5CYII='/>
    </div>
)

const Xpense = ({ name, cost }) => (
    <div style={css.Xpense.wrapper}>
        <p style={css.Xpense.value}>{name}</p>
        <p style={css.Xpense.value}>{cost}</p>
    </div>
)

class App extends Component
{
    state = { xpenses: [] }

    addXpense = (xpense) => { this.setState({ xpenses: this.state.xpenses.concat(xpense) }) }

    render = (_, { xpenses }) => (
        <div style={css.App}>
            <Header />
            <XpenseInput addXpense={this.addXpense}/>
            <Down />
            {xpenses.map(Xpense)}
        </div>
    )
}

render(<App />, document.body)
