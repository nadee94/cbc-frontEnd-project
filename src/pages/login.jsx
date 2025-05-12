export default function LoginPage() {
    return (
        <div>
            <h2>Login</h2>
            <form>
                <div>
                    <label>Email: </label>
                    <input type="email" placeholder="Email" />
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" placeholder="Password" />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
