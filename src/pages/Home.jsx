import { Link } from "react-router-dom";
import imgUrl from '../assets/imgs/gmail.svg'

export function Home() {
    
    return (
        <section className="home">
            <h1>Welcome to our Email App</h1>
            <img src={imgUrl} alt="" />
            <Link to="/mail/compose?to=help@gmail.com&subject=Help">Quick Send Help</Link>

        </section>
    )
}
