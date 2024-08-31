import imgUrl from '../assets/imgs/gmail.svg'

export function Home() {
    
    return (
        <section className="home">
            <h1>Welcome to our Email App</h1>
            <img src={imgUrl} alt="" />
        </section>
    )
}
