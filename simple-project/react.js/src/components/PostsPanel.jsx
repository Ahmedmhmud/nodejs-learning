import { useEffect, useState } from 'react'

const API_ROOT = '/api'

async function fetchJson(path, token) {
    const response = await fetch(`${API_ROOT}${path}`)
    const data = await response.json().catch(() => null)

    if (!response.ok) {
        throw new Error(data?.message || 'Failed to load posts')
    }

    return data
}

function PostsPanel({ token }) {
    const [limit, setLimit] = useState('3')
    const [posts, setPosts] = useState([])
    const [status, setStatus] = useState('')
    const [error, setError] = useState('')

    const loadPosts = async (currentLimit = limit) => {
        setStatus('Loading posts...')
        setError('')

        try {
            const query = currentLimit ? `?limit=${currentLimit}` : ''
            const data = await fetchJson(`/posts${query}`, token)
            setPosts(data)
            setStatus(`Showing ${data.length} post${data.length === 1 ? '' : 's'}`)
        } catch (err) {
            setPosts([])
            setStatus('')
            setError(err.message)
        }
    }

    useEffect(() => {
        if (token) {
            loadPosts()
        }
    }, [token])

    const handleSubmit = (event) => {
        event.preventDefault()
        loadPosts(limit.trim())
    }

    return (
        <section className="panel">
            <div className="panel-head">
                <div>
                    <h2 className="panel-title">Posts</h2>
                    <p className="panel-copy">Visible after login or registration.</p>
                </div>
            </div>

            <form className="controls" onSubmit={handleSubmit}>
                <input
                    className="input"
                    type="number"
                    min="1"
                    placeholder="Limit posts"
                    value={limit}
                    onChange={(event) => setLimit(event.target.value)}
                />
                <button className="button" type="submit">
                    Refresh
                </button>
            </form>

            <p className={`status ${error ? 'error' : ''}`}>{error || status}</p>

            <ul className="list">
                {posts.map((post) => (
                    <li className="list-item" key={post.id}>
                        <strong>{post.title}</strong>
                        <p>Post ID {post.id}</p>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default PostsPanel