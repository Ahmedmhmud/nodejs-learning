import { useState } from 'react'

const API_ROOT = '/api'

async function submitAuth(path, payload) {
    const response = await fetch(`${API_ROOT}${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })

    const data = await response.json().catch(() => null)

    if (!response.ok) {
        throw new Error(data?.message || 'Authentication failed')
    }

    return data
}

function AuthPanel({ onSuccess }) {
    const [mode, setMode] = useState('login')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState('Use the form to register or log in.')
    const [error, setError] = useState('')
    const [token, setToken] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError('')
        setStatus('Sending request...')

        try {
            const payload = mode === 'register' ? { name, email, password } : { email, password }
            const data = await submitAuth(mode === 'register' ? '/auth/register' : '/auth/login', payload)

            setToken(data.token)
            setStatus(`${mode === 'register' ? 'Registered' : 'Logged in'} successfully.`)
            setPassword('')
            if (mode === 'register') {
                setName('')
            }
            if (onSuccess) {
                onSuccess(data.token)
            }
        } catch (err) {
            setToken('')
            setStatus('')
            setError(err.message)
        }
    }

    return (
        <section className="panel">
            <div className="panel-head">
                <div>
                    <h2 className="panel-title">Account</h2>
                    <p className="panel-copy">Register or log in to continue.</p>
                </div>
            </div>

            <div className="button-row" role="tablist" aria-label="Authentication mode">
                <button
                    className={mode === 'login' ? 'button' : 'button-secondary'}
                    type="button"
                    onClick={() => setMode('login')}
                >
                    Login
                </button>
                <button
                    className={mode === 'register' ? 'button' : 'button-secondary'}
                    type="button"
                    onClick={() => setMode('register')}
                >
                    Register
                </button>
            </div>

            <form className="form-grid" onSubmit={handleSubmit}>
                {mode === 'register' ? (
                    <input
                        className="input"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                ) : null}

                <input
                    className="input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />

                <input
                    className="input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />

                <button className="button" type="submit">
                    {mode === 'register' ? 'Create account' : 'Log in'}
                </button>
            </form>

            <p className={`status ${error ? 'error' : 'success'}`}>{error || status}</p>

            {token ? (
                <div className="response-box">
                    <strong>Token</strong>
                    <p className="token">{token}</p>
                </div>
            ) : null}
        </section>
    )
}

export default AuthPanel