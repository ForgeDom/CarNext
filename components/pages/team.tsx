const Team = () => {
    return (
        <>
            <div className="car-info"><div className="car">
                <img src="/photos/e28.jpg" alt="e28"/>
                    <div className="car-description">
                        <h3>BMW e28 520i</h3>
                        <p>Кузов E28 прийшов на зміну кузова Е 12. Новий автомобіль Е28 схожий на Е12, але має злегка змінені пропорції, за рахунок чого машина виглядає нижчою та стрімкою.</p>
                    </div>
            </div>

                <div className="car">
                    <img src="/photos/ford-probe.jpg" alt="ford-probe"/>
                        <div className="car-description">
                            <h3>Ford Probe 1993</h3>
                            <p>Ford Probe — спільна розробка Ford та Mazda, ідентичний автомобілю Mazda MX-6 за своєю конструкцією, випускалася з 1988 по 1997 роки.</p>
                        </div>
                </div>
            </div>
        </>
    );
}

export default Team;